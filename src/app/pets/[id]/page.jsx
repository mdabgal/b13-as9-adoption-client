

"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";


export default function PetDetails({ params }) {
  const { id } = use(params); 

 
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

  const handleAdopt = async () => {
    const request = {
      petId: pet._id,
      petName: pet.name,
      userEmail: pet.email,
      pickupDate:  pickupDate,
      message: message,
      status: "pending",
    };




 const res = await fetch("http://localhost:8000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (res.ok) {
    toast.success("Adoption request sent!");
  } else {
    toast.error("Something went wrong!");
  }
}

  if (!pet) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

     
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-2">

       
        <div className="w-full h-[400px] md:h-[600px]">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
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

          {/* FEE */}
          <div className="bg-green-100 p-4 rounded-xl mt-4">
             <p className="text-sm text-gray-600">Adoption Fee</p>
            <p className="text-2xl font-bold text-green-700">
              ${pet.adoptionFee}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-6">

            <Link href="/pets" className="flex-1">
              <button className="w-full bg-gray-600 text-white py-3 rounded-xl">
                Back
              </button>
            </Link>

            <button
              onClick={handleAdopt}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl"
            >
              Adopt Now
            </button>

          </div>

        </div>
      </div>




<div className="max-w-3xl mx-auto mt-10 border border-gray-100 shadow-2xl p-6 rounded-2xl bg-gray-50">

  <h2 className="text-2xl font-bold mb-4">
    Adoption Form
  </h2>
  <input
    value={pet.name}
    readOnly
    className="w-full p-2 border rounded-lg mb-3"
  />
  <input
    value="Demo User"
     readOnly
      className="w-full p-2 border rounded-lg mb-3"
  />

  <input
    value={pet.ownerEmail || ""}
     readOnly
    className="w-full p-2 border rounded-lg mb-3"
  />

  <input
    type="date"
     value={pickupDate}
    onChange={(e) => setPickupDate(e.target.value)}
    className="w-full p-2 border rounded-lg mb-3"
  />

  <textarea
    value={message}
      onChange={(e) => setMessage(e.target.value)}
    className="w-full p-2 border rounded-lg mb-3"
    placeholder="Message..."
  />

  <button
    onClick={handleAdopt}
     disabled={!pickupDate || !message}
    className="w-full bg-green-600 text-white py-3 rounded-xl"
  >
    Adopt Now
  </button>

</div>









    </div>






  );
}

