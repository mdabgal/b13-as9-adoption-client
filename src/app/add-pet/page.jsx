"use client";

import { useState } from "react";

export default function AddPetPage() {

  const [success, setSuccess] = useState("");

  const handleAddPet = async (e) => {
    e.preventDefault();

    const form = e.target;

    const petData = {
      name: form.name.value,
      species: form.species.value,
      breed: form.breed.value,
      age: form.age.value,
      gender: form.gender.value,
      image: form.image.value,
      healthStatus: form.health.value,
      vaccinationStatus: form.vaccination.value,
      location: form.location.value,
      adoptionFee: form.fee.value,
      description: form.description.value,
      ownerEmail: form.email.value,
      adopted: false,
    };

    try {

      const res = await fetch("http://localhost:8000/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      const data = await res.json();

      if (data.insertedId) {
        setSuccess("✅ Pet added successfully!");
        form.reset();
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-gray-100 min-h-screen py-12">

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Add New Pet
        </h1>

        {
          success &&
          <p className="text-green-600 text-center mb-4">
            {success}
          </p>
        }

        <form
          onSubmit={handleAddPet}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* Pet Name */}
          <input
            type="text"
            name="name"
            placeholder="Pet Name"
            required
            className="border p-3 rounded-xl"
          />

          {/* Species */}
          <input
            type="text"
            name="species"
            placeholder="Species"
            required
            className="border p-3 rounded-xl"
          />

          {/* Breed */}
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            required
            className="border p-3 rounded-xl"
          />

          {/* Age */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            className="border p-3 rounded-xl"
          />

          {/* Gender */}
          <select
            name="gender"
            className="border p-3 rounded-xl"
          >
            <option>Male</option>
            <option>Female</option>
          </select>

          {/* Image */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            required
            className="border p-3 rounded-xl"
          />

          {/* Health */}
          <input
            type="text"
            name="health"
            placeholder="Health Status"
            required
            className="border p-3 rounded-xl"
          />

          {/* Vaccination */}
          <input
            type="text"
            name="vaccination"
            placeholder="Vaccination Status"
            required
            className="border p-3 rounded-xl"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            className="border p-3 rounded-xl"
          />

          {/* Fee */}
          <input
            type="number"
            name="fee"
            placeholder="Adoption Fee"
            required
            className="border p-3 rounded-xl"
          />

          {/* Owner Email */}
          <input
            type="email"
            name="email"
            placeholder="Owner Email"
            required
            className="border p-3 rounded-xl md:col-span-2"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Pet Description"
            rows="5"
            required
            className="border p-3 rounded-xl md:col-span-2"
          ></textarea>

          {/* Button */}
          <button
            type="submit"
            className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Add Pet
          </button>

        </form>

      </div>

    </div>
  );
}