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
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', 
      body: JSON.stringify(petData),
    });

    const data = await res.json();

    if (res.ok) { 
      setSuccess("Pet added successfully!");
      form.reset();
    } else {
      console.error("Server Error:", data);
      alert(data.message || "Failed to add pet");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Something went wrong!");
  }
};

  return (

    <div className="bg-gray-100 dark:bg-black min-h-screen py-12">

      <div className="max-w-4xl mx-auto dark:bg-gray-900 bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center dark:text-white text-gray-800 mb-8">
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
      
     <input
            type="text"
         name="name"
            placeholder="Pet Name"
         required
            className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          />
        <input
            type="text"
           name="species"
          placeholder="Species"
            required
            // className="border p-3 rounded-xl"
            className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          />
          <input
            type="text"
           name="breed"
           placeholder="Breed"
            required
           className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          />
        <input
            type="number"
            name="age"
               placeholder="Age"
            required
           className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          />

              
          <select
            name="gender"
           className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          >
            <option>Male</option>
            <option>Female</option>
          </select>
          
           <input
            type="text"
            name="image"
         placeholder="Image URL"
            required
           className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          />
          <input
          type="text"
            name="health"
          placeholder="Health Status"
          required
           className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          />
          <input
            type="text"
          name="vaccination"
            placeholder="Vaccination Status"
           required
            className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          />

       <input
            type="text"
         name="location"
            placeholder="Location"
            required
          className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          />

          <input
            type="number"
            name="fee"
        placeholder="Adoption Fee"
            required
           className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          />
          <input
      type="email"
            name="email"
            placeholder="Owner Email"
            required
           
            className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
         />

      
     <textarea
           name="description"
           placeholder="Pet Description"
            rows="5"
           required
          
           className="border p-3 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
          ></textarea>

         
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