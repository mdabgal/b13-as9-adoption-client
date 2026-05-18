"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const AllPetsPage = () => {

  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");

  useEffect(() => {

    fetch("http://localhost:8000/pets")
      .then((res) => res.json())
      .then((data) => setPets(data));

  }, []);

  // Filter Logic
  const filteredPets = pets.filter((pet) => {

    const matchesSearch = pet.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSpecies = species
      ? pet.species === species
      : true;

    return matchesSearch && matchesSpecies;
  });

  return (

    <div className="bg-gray-100 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-gray-800">
            All Pets
          </h1>

          <p className="text-gray-500 mt-3">
            Find your perfect companion
          </p>

        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          {/* Search */}
          <input
            type="text"
            placeholder="Search by pet name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Filter */}
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
          </select>

        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredPets.map((pet) => (

            <div
              key={pet._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >

              {/* Image */}
              <div className="relative">

                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-64 object-cover"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4">

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${
                      pet.adopted
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {pet.adopted ? "Adopted" : "Available"}
                  </span>

                </div>

              </div>

            
              <div className="p-6">

                <h2 className="text-2xl font-bold text-gray-800">
                  {pet.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  {pet.breed}
                </p>

                {/* <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {pet.description.slice(0, 80)}...
                </p> */}

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mt-5 text-sm">

                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-500">Species</p>
                    <p className="font-semibold">{pet.species}</p>
                  </div>

                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-500">Age</p>
                    <p className="font-semibold">{pet.age} yrs</p>
                  </div>

                  {/* <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-500">Location</p>
                    <p className="font-semibold">{pet.location}</p>
                  </div> */}

                  {/* <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-gray-500">Fee</p>
                    <p className="font-bold text-green-600">
                      ${pet.adoptionFee}
                    </p>
                  </div> */}

                </div>

                <div className="flex gap-3 mt-6">

  {/* View Details */}
  <Link href={`/pets/${pet._id}`} className="flex-1">

    <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
      View Details
    </button>

  </Link>

 

</div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default AllPetsPage;