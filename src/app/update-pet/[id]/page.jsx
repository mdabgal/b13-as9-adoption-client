"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdatePetPage() {

  const { id } = useParams();

  const router = useRouter();

  const [pet, setPet] = useState(null);

 
  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`)
      .then((res) => res.json())
      .then((data) => setPet(data));

  }, [id]);

 
  const handleUpdate = async (e) => {

    e.preventDefault();

    const form = e.target;

    const updatedPet = {
      name: form.name.value,
      breed: form.breed.value,
      species: form.species.value,
      image: form.image.value,
      description: form.description.value,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPet),
    });

    const data = await res.json();
if (data.modifiedCount > 0) {

  toast.success("Pet updated successfully!");

  router.push("/pets");
}
    
  };

  if (!pet) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (

    <div className="max-w-3xl mx-auto py-12 px-6">

      <div className="bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Update Pet
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            defaultValue={pet.name}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="breed"
            defaultValue={pet.breed}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="species"
            defaultValue={pet.species}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="image"
            defaultValue={pet.image}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="description"
            defaultValue={pet.description}
            rows="5"
            className="w-full border p-3 rounded-xl"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
          >
            Update Pet
          </button>

        </form>

      </div>

    </div>
  );
}