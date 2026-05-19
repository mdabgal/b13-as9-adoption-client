


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "@/components/DeleteModal";
import toast from "react-hot-toast";

export default function MyListingsPage() {
  const [pets, setPets] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/pets")
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);

const handleDelete = async () => {
  try {
    const res = await fetch(`http://localhost:8000/pets/${deleteId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    console.log("DELETE RESPONSE:", data);

    if (res.ok && data.success) {
      toast.success("Deleted successfully!");

      setPets((prev) =>
        prev.filter((p) => p._id !== deleteId)
      );
    } else {
      toast.error(data.message || "Delete failed!");
    }
  } catch (error) {
    console.log(error);
    toast.error("Server error!");
  }

  setIsOpen(false);
};

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-6">

   
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        My Listings
      </h1>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {pets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full"
          >

         
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 sm:h-52 md:h-56 object-cover"
            />

          
            <div className="p-4 flex flex-col flex-1">

            
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {pet.name}
              </h2>

           
              <p className="text-gray-500 text-sm mt-1">
                {pet.breed}
              </p>

            
              <p className="text-green-600 font-bold mt-2">
                ${pet.adoptionFee}
              </p>

             
              <div className="mt-auto pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">

               
                <Link href={`/pets/${pet._id}`} className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-xl text-sm hover:bg-emerald-600 transition">
                    <FaEye /> View
                  </button>
                </Link>

              
                <Link href={`/update-pet/${pet._id}`} className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white py-2 rounded-xl text-sm hover:bg-indigo-600 transition">
                    <FaEdit /> Edit
                  </button>
                </Link>

               <button
  onClick={() => {
    setDeleteId(pet._id);
    setIsOpen(true);
  }}
  className="bg-red-600 text-white px-3 py-2 rounded-lg"
>
  Delete
</button>
                
              </div>

            </div>

          </div>
        ))}

      </div>

     <DeleteModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
/>
    </div>
  );
}