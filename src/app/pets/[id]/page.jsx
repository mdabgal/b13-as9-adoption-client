

"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function PetDetails({ params }) {
  const { id } = use(params);
  const { data: session } = useSession();

  const [pet, setPet] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`
      );
      const data = await res.json();
      setPet(data);
    };

    fetchPet();
  }, [id]);

  const loggedInUserEmail = session?.user?.email;
  const petOwnerEmail = pet?.ownerEmail || pet?.email;

  const isOwner =
    loggedInUserEmail &&
    petOwnerEmail &&
    loggedInUserEmail.toLowerCase().trim() ===
      petOwnerEmail.toLowerCase().trim();

  const isAdopted = pet?.status === "adopted";

  const handleAdopt = async () => {
    const token = await authClient.token();

    if (isOwner) {
      toast.error("You cannot adopt your own pet!");
      return;
    }

    if (isAdopted) {
      toast.error("Already adopted!");
      return;
    }

    const request = {
      petId: pet._id,
      petName: pet.name,
      ownerEmail: petOwnerEmail,
      userEmail: loggedInUserEmail,
      pickupDate,
      message,
      status: "pending",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.data.token}`,
        },
        body: JSON.stringify(request),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Request sent!");
      setPickupDate("");
      setMessage("");
    } else {
      toast.error(data.message || "Failed");
    }
  };

  if (!pet) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-900 dark:text-white">

      
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-2">

     
        <div className="h-[400px] md:h-[600px]">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>

      
        <div className="p-6 md:p-10 space-y-4">

          <h1 className="text-4xl font-bold">
            {pet.name}
          </h1>

          <p className="text-gray-500 dark:text-gray-300">
            {pet.breed}
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            {pet.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              Species: {pet.species}
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              Age: {pet.age}
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              Gender: {pet.gender}
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              Location: {pet.location}
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              Health: {pet.healthStatus}
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              Vaccine: {pet.vaccinationStatus}
            </div>

          </div>

        
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-xl mt-4">
            <p className="text-sm">Adoption Fee</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              ${pet.adoptionFee}
            </p>
          </div>

          <div className="flex gap-3 mt-6">

            <Link href="/pets" className="flex-1">
              <button className="w-full bg-gray-600 text-white py-3 rounded-xl">
                Back
              </button>
            </Link>

            <button
              disabled={isOwner || isAdopted}
              className={`flex-1 py-3 rounded-xl text-white font-semibold ${
                isOwner || isAdopted
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isAdopted
                ? "Adopted"
                : isOwner
                ? "Your Pet"
                : "Adopt Now"}
            </button>

          </div>
        </div>
      </div>

      <div className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Adoption Form
        </h2>

        <input
          value={pet.name}
          readOnly
          className="w-full p-2 border rounded mb-3 bg-gray-100 dark:bg-gray-800"
        />

        <input
          value={session?.user?.name || ""}
          readOnly
          className="w-full p-2 border rounded mb-3 bg-gray-100 dark:bg-gray-800"
        />

        <input
          value={session?.user?.email || ""}
          readOnly
          className="w-full p-2 border rounded mb-3 bg-gray-100 dark:bg-gray-800"
        />

        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          disabled={isOwner || isAdopted}
          className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isOwner || isAdopted}
          placeholder="Message..."
          className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        <button
          onClick={handleAdopt}
          disabled={!pickupDate || !message || isOwner || isAdopted}
          className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold"
        >
          Submit Request
        </button>

      </div>
    </div>
  );
}
