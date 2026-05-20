

"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Edit, Trash2, Users, Check, X, PawPrint, BadgeDollarSign } from "lucide-react";
import DeleteModal from "@/components/DeleteModal";

export default function MyListingsPage() {
  const { data: session } = useSession();
 const [pets, setPets] = useState([]);
 const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });
  const [loading, setLoading] = useState(true);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
 const [currentPetRequests, setCurrentPetRequests] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
     const [selectedPetId, setSelectedPetId] = useState(null);

  const token = typeof window !== "undefined" ? document.cookie.includes("token") : false;


  useEffect(() => {
    const fetchOwnerData = async () => {
      const email = session?.user?.email;
      if (!email) return;

      try {
       
        const statsRes = await fetch(`http://localhost:8000/owner-stats?email=${email}`, {
          credentials: "include" 
     });
        const statsData = await statsRes.json();
        
        if (statsData.success) {
            setStats(statsData.stats);
        } else {
           console.log("Stats error message:", statsData.message);
        }

        const petsRes = await fetch(`http://localhost:8000/pets?ownerEmail=${email}`);
        const petsData = await petsRes.json();
        setPets(petsData);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        toast.error("Failed to load dashboard data!");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchOwnerData();
    }
  }, [session]);

 
  const openRequestsModal = async (petId) => {
    try {
     
      const res = await fetch(`http://localhost:8000/owner-requests?email=${session?.user?.email}`);
      const allRequests = await res.json();
      const petRequests = allRequests.filter((req) => req.petId === petId);
      
      setCurrentPetRequests(petRequests);
      setIsRequestModalOpen(true);
    } catch (error) {
      toast.error("Failed to load adoption requests!");
    }
  };

 
  const handleRequestStatus = async (requestId, petId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8000/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, petId: petId }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`Request ${newStatus} successfully!`);
        
     
        setCurrentPetRequests(prev =>
          prev.map(req => {
            if (req._id === requestId) return { ...req, status: newStatus };
            if (newStatus === "approved" && req.status === "pending") return { ...req, status: "rejected" };
            return req;
          })
        );

       
        window.location.reload(); 
      }
    } catch (error) {
      toast.error("Action failed!");
    }
  };

  
  const openDeleteModal = (id) => {
    setSelectedPetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeletePet = async () => {
    if (!selectedPetId) return;
    try {
      const res = await fetch(`http://localhost:8000/pets/${selectedPetId || selectedPetId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Pet listing deleted successfully!");
        setPets(pets.filter((pet) => pet._id !== selectedPetId));
        setStats(prev => ({ ...prev, total: prev.total - 1 }));
      }
    } catch (error) {
      toast.error("Failed to delete pet!");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedPetId(null);
    }
  };

  if (loading) return <p className="text-center py-20 text-lg animate-pulse">Loading dashboard...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Listings Dashboard</h1>
        <p className="text-gray-500">Manage your listed pets and adoption requests.</p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Listings</p>
            <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><PawPrint size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>     <p className="text-sm text-gray-500 font-medium">Available</p>
            <h3 className="text-3xl font-bold text-green-600">{stats.available}</h3>
         </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Check size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
           <p className="text-sm text-gray-500 font-medium">Adopted</p>
            <h3 className="text-3xl font-bold text-amber-600">{stats.adopted}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Users size={24} /></div>
        </div>
      </div>

    
      {pets.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-2xl bg-gray-50">
          <p className="text-gray-500">You haven't listed any pets for adoption yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
               <div className="relative h-48 w-full bg-gray-100">
                  <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    pet.status === "adopted" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                  }`}>{pet.status}</span>
                </div>
               <div className="p-5 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                  <p className="text-gray-600 flex items-center gap-1 text-sm font-semibold">
                    <BadgeDollarSign size={16} className="text-gray-400" /> Price: ${pet.adoptionFee || 0}
                  </p>
                </div>
              </div>

             
              <div className="p-5 border-t border-gray-50 grid grid-cols-2 gap-2 bg-gray-50/50">
              <button onClick={() => openRequestsModal(pet._id)} className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-xl text-xs font-semibold transition">
                  <Users size={14} /> Requests
                </button>
              
              
<Link href={`/dashboard/my-listings/upadate/${pet._id}`} className="flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 rounded-xl text-xs font-semibold transition">
  <Edit size={14} /> Edit
</Link>
                <Link href={`/pets/${pet._id}`} className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl text-xs font-semibold transition">
                  <Eye size={14} /> View
                </Link>
                <button onClick={() => openDeleteModal(pet._id)} className="flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-xl text-xs font-semibold transition">
                  <Trash2 size={14} /> Delete
               </button>
              </div>
            </div>
          ))}
        </div>
      )}

     
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">Adoption Requests</h2>
              <button onClick={() => setIsRequestModalOpen(false)} className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-500"><X size={18} /></button>
            </div>

            {currentPetRequests.length === 0 ? (
              <p className="text-center py-6 text-gray-500 text-sm">No requests received for this pet yet.</p>
            ) : (
              <div className="space-y-4 divide-y divide-gray-100">
                {currentPetRequests.map((req, index) => (
                  <div key={req._id} className={`pt-4 ${index === 0 ? "pt-0" : ""} flex flex-col sm:flex-row justify-between sm:items-center gap-4`}>
                    <div className="space-y-1">
                      <p className="font-bold text-gray-800">{req.userEmail === "demo@gmail.com" ? "Demo User" : req.userEmail.split('@')[0]}</p>
                    <p className="text-xs text-gray-500">Email: {req.userEmail}</p>
                      <p className="text-xs text-gray-600 font-medium">Pickup Date: {req.pickupDate}</p>
                    {req.message && <p className="text-xs text-gray-500 italic">"{req.message}"</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      {req.status !== "pending" ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                       req.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>{req.status}</span>
                      ) : (
                        <>
                        <button onClick={() => handleRequestStatus(req._id, req.petId, "approved")} className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition shadow-sm"><Check size={14} /> Approve</button>
                      <button onClick={() => handleRequestStatus(req._id, req.petId, "rejected")} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition shadow-sm"><X size={14} /> Reject</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

  
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDeletePet} />
    </div>
  );
}