import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function PetCareTips() {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <div>
          <h2 className="text-4xl font-bold  mb-4">
            Pet Care Tips
          </h2>

          <p className="text-gray-400 mb-6">
            Taking care of pets is a responsibility. Follow these basic tips to keep them healthy and happy.
          </p>

          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Learn More
          </button>
        </div>

        {/* Right Side */}
        <div className="space-y-5">

          <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-xl shadow">
            <FaCheckCircle className="text-green-500" />
            <p>Regular Vaccination</p>
          </div>

          <div className="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-xl shadow">
            <FaCheckCircle className="text-green-500" />
            <p>Daily Exercise</p>
          </div>

          <div className="flex items-center text-gray-700 gap-3 bg-white p-4 rounded-xl shadow">
            <FaCheckCircle className="text-green-500" />
            <p>Healthy Food</p>
          </div>

        </div>

      </div>
    </section>
  );
}