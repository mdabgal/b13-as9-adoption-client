"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdatePetPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [petData, setPetData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "Male",
    location: "",
    healthStatus: "",
    vaccinationStatus: "",
    adoptionFee: "",
    image: "",
    description: ""
  });
  
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ১. ডাটাবেস থেকে ডাটা আনা
  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPetData(data);
        setOriginalData(data); // আসল ডাটা জমা রাখা হলো
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load pet data!");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  // ২. ফর্ম সাবমিট ও ভ্যালিডেশন লজিক
  const handleUpdate = async (e) => {
    e.preventDefault();

    // পরিবর্তন হয়েছে কি না যাচাই
    const isChanged = JSON.stringify(petData) !== JSON.stringify(originalData);
    if (!isChanged) {
      toast.error("You haven't made any changes yet!");
      return;
    }

    // ফিল্ড খালি কি না যাচাই
    if (!petData.name || !petData.species || !petData.adoptionFee) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const { _id, ...updatedFields } = petData;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        toast.success("Pet profile updated successfully!");
        setTimeout(() => {
          router.push("/dashboard/my-listings");
          router.refresh();
        }, 1000);
      } else {
        toast.error("Failed to update pet profile.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <p className="text-center py-20 text-lg animate-pulse">Loading pet profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl my-10 border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Pet Profile</h1>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Pet Name</label>
          <input type="text" name="name" value={petData.name || ""} onChange={handleChange} required className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Species</label>
          <input type="text" name="species" value={petData.species || ""} onChange={handleChange} required className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Breed</label>
          <input type="text" name="breed" value={petData.breed || ""} onChange={handleChange} className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Age (Years)</label>
          <input type="number" name="age" value={petData.age || ""} onChange={handleChange} required className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
          <select name="gender" value={petData.gender || "Male"} onChange={handleChange} className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
          <input type="text" name="location" value={petData.location || ""} onChange={handleChange} required className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Health Status</label>
          <input type="text" name="healthStatus" value={petData.healthStatus || ""} onChange={handleChange} className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Vaccination Status</label>
          <input type="text" name="vaccinationStatus" value={petData.vaccinationStatus || ""} onChange={handleChange} className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Adoption Fee ($)</label>
          <input type="number" name="adoptionFee" value={petData.adoptionFee || ""} onChange={handleChange} required className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
          <input type="text" name="image" value={petData.image || ""} onChange={handleChange} required className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea name="description" value={petData.description || ""} onChange={handleChange} rows="4" required className="w-full p-2.5 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
        </div>
        <div className="md:col-span-2 flex gap-3 mt-4">
          <button type="button" onClick={() => router.push("/dashboard/my-listings")} className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="submit" className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}