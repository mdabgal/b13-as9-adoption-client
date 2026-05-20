

"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client"; 

export default function PetDetails({ params }) {
  const { id } = use(params);
  const { data: session } = useSession(); 

  const [pet, setPet] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      const res = await fetch(`http://localhost:8000/pets/${id}`);
      const data = await res.json();
      setPet(data);
    };

    fetchPet();
  }, [id]);

  
  const loggedInUserEmail = session?.user?.email;
  const petOwnerEmail = pet?.ownerEmail || pet?.email;
  
  
  const isOwner = loggedInUserEmail && petOwnerEmail && loggedInUserEmail === petOwnerEmail;
 
  const isAdopted = pet?.adopted === true;

  const handleAdopt = async () => {
   
    if (isOwner) {
      toast.error("You cannot submit an adoption request for your own pet!");
      return;
    }
    if (isAdopted) {
      toast.error("This pet is already adopted!");
      return;
    }

    const requesterEmail = loggedInUserEmail || "demo@gmail.com";

    const request = {
      petId: pet._id,
      petName: pet.name,
      ownerEmail: petOwnerEmail, 
      userEmail: requesterEmail,              
      pickupDate: pickupDate,
      message: message,
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:8000/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success("Adoption request sent successfully!");
        setPickupDate("");
        setMessage("");
      } else {
        toast.error(resData.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Server connection failed!");
    }
  };

  if (!pet) {
    return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-2">

       
        <div className="w-full h-[400px] md:h-[600px] relative">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
         
          {isAdopted && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
              Already Adopted
            </div>
          )}
        </div>

       
        <div className="p-6 md:p-10 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            {pet.name}
          </h1>
          <p className="text-gray-500 text-lg">
            {pet.breed}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {pet.description}
          </p>

        
      <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 p-3 rounded-lg">
     <p className="text-sm text-gray-500">Species</p>
              <p className="font-semibold">{pet.species}</p>
        </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Age</p>
          <p className="font-semibold">{pet.age} years</p>
            </div>
       <div className="bg-gray-100 p-3 rounded-lg">
             <p className="text-sm text-gray-500">Gender</p>
     <p className="font-semibold">{pet.gender}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{pet.location}</p>
            </div>
        <div className="bg-gray-100 p-3 rounded-lg">
           <p className="text-sm text-gray-500">Health</p>
              <p className="font-semibold">{pet.healthStatus}</p>
            </div>
     <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Vaccination</p>
            <p className="font-semibold">{pet.vaccinationStatus}</p>
            </div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-xl mt-4">
            <p className="text-sm text-gray-600">Adoption Fee</p>
         <p className="text-2xl font-bold text-green-700">
              ${pet.adoptionFee}
            </p>
          </div>

         
          <div className="flex gap-3 mt-6">
            <Link href="/pets" className="flex-1">
              <button className="w-full bg-gray-600 text-white py-3 rounded-xl hover:bg-gray-700 transition">
                Back
              </button>
            </Link>

            <button
              onClick={handleAdopt}
              disabled={isOwner || isAdopted}
              className={`flex-1 py-3 rounded-xl text-white font-semibold transition ${
                isOwner || isAdopted 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isAdopted ? "Adopted" : isOwner ? "Your Pet" : "Adopt Now"}
            </button>
          </div>

          {isOwner && (
            <p className="text-sm text-amber-600 font-medium bg-amber-50 border border-amber-200 p-3 rounded-xl text-center">
               You cannot list an adoption request for your own listed pet.
            </p>
          )}
        </div>
      </div>

     
      <div className="max-w-3xl mx-auto mt-10 border border-gray-100 shadow-2xl p-6 rounded-2xl bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Adoption Form</h2>
        
        <input
         value={pet.name}
          readOnly
          className="w-full p-2 border rounded-lg mb-3 bg-gray-100"
        />
        <input
          value={session?.user?.name || "Demo User"}
      readOnly
          className="w-full p-2 border rounded-lg mb-3 bg-gray-100"
        />
        <input
          value={petOwnerEmail || ""}
        readOnly
          className="w-full p-2 border rounded-lg mb-3 bg-gray-100"
        />
        <input
          type="date"
        value={pickupDate}
    disabled={isOwner || isAdopted}
        onChange={(e) => setPickupDate(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
        />

       <textarea
          value={message}
          disabled={isOwner || isAdopted}
        onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          placeholder={isAdopted ? "This pet is already adopted." : isOwner ? "You cannot request your own pet." : "Message..."}
        />

        <button
          onClick={handleAdopt}
          disabled={!pickupDate || !message || isOwner || isAdopted}
          className={`w-full py-3 rounded-xl text-white font-semibold transition ${
            !pickupDate || !message || isOwner || isAdopted
         ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isAdopted ? "Already Adopted" : isOwner ? "Disabled for Owner" : "Submit Request"}
        </button>
      </div>

    </div>
  );
}