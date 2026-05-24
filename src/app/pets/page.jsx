
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
  
  const [species, setSpecies] = useState("");
    const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setLoading(true);
   
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets?search=${search}&species=${species}`)
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, species]); 

  return (
   <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6">
        
       
        <div className="text-center mb-10">
         <h1 className="text-5xl font-bold text-gray-800 dark:text-white"></h1>
          <p  className="text-gray-500 dark:text-gray-300 mt-3">Find your perfect companion</p>
        </div>

       
        <div className="flex flex-col md:flex-row gap-4 mb-10">
         
          <input
            type="text"
            placeholder="Search by pet name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
           className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
/>
         
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            <option value="">All Species</option>
            <option value="Dog">dog</option>
            <option value="Cat">cat</option>
            <option value="Rabbit">rabbit</option>
            <option value="Bird">bird</option>
          </select>
        </div>

        
        {loading ? (
          <p className="text-center py-20 text-xl font-medium text-gray-600 animate-pulse">
            Loading pets...
          </p>
        ) : pets.length === 0 ? (
          <div className="text-center bg-white  dark:bg-gray-800 rounded-2xl py-20 border shadow-md">
            <p className="text-gray-800  dark:text-gray text-lg font-medium">No available pets found matching your search.</p>
          </div>
        ) : (
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <motion.div
  key={pet._id}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  whileHover={{ scale: 1.03 }}
  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
>
               
                <div className="relative">
                  <img
                    src={pet.image || pet.imageUrl}
                    alt={pet.petName || pet.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${
                        pet.status === "adopted" ? "bg-red-500" : "bg-green-600"
                      }`}
                    >
                      {pet.status === "adopted" ? "Adopted" : "Available"}
                    </span>
                  </div>
                </div>

           
            <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {pet.petName || pet.name}
                  </h2>
                  <p className="text-gray-500 mt-1">{pet.breed}</p>

            <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-gray-600 ">Species</p>
                  <p className="font-semibold text-gray-500 dark:text-gray-600">{pet.species}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-gray-500">Age</p>
                      <p className="font-semibold text-gray-500 dark:text-gray-600">{pet.age} yrs</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link
                      href={`/pets/${pet._id}`}
                      className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPetsPage;

