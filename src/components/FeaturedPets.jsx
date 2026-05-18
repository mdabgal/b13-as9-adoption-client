"use client";

import { useEffect, useState } from "react";

export default function FeaturedPets() {

  const [pets, setPets] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8000/pets")
      .then((res) => res.json())
      .then((data) => setPets(data));

  }, []);

  return (

    <section className="bg-gray-800 text-white py-20">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Pets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {pets.slice(0, 6).map((pet) => (

            <div
              key={pet._id}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
            >

              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">

                <h3 className="text-2xl font-bold">
                  {pet.name}
                </h3>

                <p className="text-gray-400 mt-2">
                  {pet.breed}
                </p>

                <button className="mt-5 bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700 transition">
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}