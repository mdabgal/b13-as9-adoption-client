"use client";

import { useEffect, useState } from "react";

export default function MyRequestsPage() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        My Requests
      </h1>

      {/* Empty State */}
      {requests.length === 0 && (
        <p className="text-gray-500">No requests found</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {requests.map((req) => (

          <div
            key={req._id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col"
          >

            {/* Pet Name */}
            <h2 className="text-xl font-bold text-gray-800">
              {req.petName}
            </h2>

            {/* Email */}
            <p className="text-gray-500 text-sm">
              {req.userEmail}
            </p>

            {/* Pickup Date */}
            <p className="mt-2 text-gray-600">
              📅 {req.pickupDate}
            </p>

            {/* Message */}
            <p className="mt-2 text-gray-600">
              {req.message}
            </p>

            {/* Status */}
            <span className={`mt-3 px-3 py-1 rounded-full text-sm w-fit ${
              req.status === "approved"
                ? "bg-green-100 text-green-600"
                : req.status === "rejected"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}>
              {req.status || "pending"}
            </span>

          </div>

        ))}

      </div>
    </div>
  );
}