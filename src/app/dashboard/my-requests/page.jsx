

"use client";

import { useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Trash2, Calendar, PawPrint } from "lucide-react";
import DeleteModal from "@/components/DeleteModal";
import Link from "next/link";

export default function MyRequestsPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/requests?userEmail=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load requests");
          setLoading(false);
        });
    }
  }, [session?.user?.email]);

  

const handleDelete = async () => {
  try {

  const token = await authClient.token()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.data.token}` 
        },
      }
    );

    if (res.ok) {
      toast.success("Request cancelled successfully");
      setRequests((prev) => prev.filter((req) => req._id !== deleteId));
    } else {
      toast.error("Delete failed");
    }
  } catch (error) {
    toast.error("Could not delete request");
  }
  setIsOpen(false);
};

  if (loading) return <p className="text-center py-20 animate-pulse text-lg">Loading your requests...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <PawPrint className="text-green-600 w-8 h-8" />
        <h1 className="text-3xl font-bold text-gray-800">My Adoption Requests</h1>
      </div>

      {requests.length === 0 ? (
        <div className="text-center bg-gray-50 rounded-2xl py-20 border-2 border-dashed">
          <p className="text-gray-500 text-lg">You haven't applied to adopt any pets yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div 
              key={req._id} 
              className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  {req.petName}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
         <Calendar size={14} /> Pickup: {req.pickupDate}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">ID: {req.petId?.slice(-6)}</span>
                </div>
                {req.message && (
            <p className="text-gray-600 text-sm italic mt-2 border-l-4 border-green-200 pl-3">
                    "{req.message}"
                  </p>
                )}
          </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
           req.status === 'approved' ? 'bg-green-100 text-green-700' : 
                  req.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {req.status || 'pending'}
                </span>


                  <Link href={`/pets/${req.petId}`}>
    <button className="bg-green-400 text-white px-4 py-2 rounded-xl hover:bg-green-600 text-sm">
      View
    </button>
  </Link>


                
                {req.status === "pending" && (
                <button
  onClick={() => {
    setDeleteId(req._id);
    setIsOpen(true);
  }}
  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
  title="Cancel Request"
>
  <Trash2 size={20} />
</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
/>
    </div>



  );
}
