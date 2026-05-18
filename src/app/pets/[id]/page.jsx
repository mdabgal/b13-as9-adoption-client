import Link from "next/link";
import { use } from "react";

async function getPet(id) {
  const res = await fetch(`http://localhost:8000/pets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default function PetDetails({ params }) {
  const { id } = use(params);

  const pet = use(getPet(id));

  
  if (!pet) {
    return (
      <div className="text-center py-20 text-red-500">
        
      </div>
    );
  }

  
  return (
    <div className="max-w-6xl border  border-gray-50  rounded-2xl mt-10  mx-auto px-6 py-12">

   
      <div className="grid md:grid-cols-2 gap-10 border-gray-100 shadow-2xl bg-white shadow-2xl rounded-2xl overflow-hidden border">

        {/* Image Section */}
        <div className="relative">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover md:h-[500px]"
          />

          <div className="absolute top-4 left-4">
            <span
              className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${
                pet.adopted ? "bg-red-500" : "bg-green-600"
              }`}
            >
              {pet.adopted ? "Adopted" : "Available"}
            </span>
          </div>
        </div>

       
        <div className="p-8">

          <h1 className="text-4xl font-bold text-gray-800">
            {pet.name}
          </h1>

          <p className="text-gray-500 mt-1 text-lg">
            {pet.breed}
          </p>

          <p className="mt-5 text-gray-600 leading-relaxed text-justify">
            {pet.description}
          </p>

         
          <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700">

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Species</p>
              <p className="font-semibold">{pet.species}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-semibold">{pet.age} years</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-semibold">{pet.gender}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{pet.location}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Health</p>
              <p className="font-semibold">{pet.healthStatus}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Vaccination</p>
              <p className="font-semibold">{pet.vaccinationStatus}</p>
            </div>

            <div className="bg-green-50 p-3 rounded-lg col-span-2">
              <p className="text-sm text-gray-500">Adoption Fee</p>
              <p className="font-bold text-green-600 text-lg">
                ${pet.adoptionFee}
              </p>
            </div>

          </div>

         {/* Buttons Section */}
<div className="mt-10 space-y-4">

  {/* Top Row */}
  <div className="flex gap-4">

    {/* Back */}
    <Link href="/pets" className="flex-1">
      <button className="w-full bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition">
        Back to Pets
      </button>
    </Link>

    {/* Edit */}
    <Link href={`/update-pet/${pet._id}`}>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
        Edit
      </button>
    </Link>

  </div>

  {/* Adopt Button */}
  <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
    Adopt Now
  </button>

</div>

 
          

       </div>
      </div>
    </div>
    
  );
}