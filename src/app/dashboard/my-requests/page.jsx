"use client";

import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch(() => toast.error("Failed to load requests"));
  }, []);

  // APPROVE
  const handleApprove = async (id) => {
    const res = await fetch(`http://localhost:8000/requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "approved" }),
    });

    if (res.ok) {
      toast.success("Request Approved");

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "approved" } : r
        )
      );
    } else {
      toast.error("Failed to approve");
    }
  };

  // REJECT
  const handleReject = async (id) => {
    const res = await fetch(`http://localhost:8000/requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "rejected" }),
    });

    if (res.ok) {
      toast.success("Request Rejected");

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "rejected" } : r
        )
      );
    } else {
      toast.error("Failed to reject");
    }
  };

  return (
    <div className="max-w-7xl  mx-auto px-4 border border border-gray-50 shadow py-6">

      <h1 className="text-3xl font-bold mb-6">
        My Requests
      </h1>

      {requests.length === 0 && (
        <p className="text-gray-500">No requests found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-10 border border-gray-100 shadow-2xl ">

        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white border border-gray-100 shadow-2xl rounded-xl  p-4"
          > 

          
            <h2 className="text-xl font-bold text-gray-800">
              {req.petName}
            </h2>

          
            <p className="text-gray-600">
              {req.userEmail}
            </p>

            <p className="flex items-center gap-2 mt-2 text-gray-600">
              <FaCalendarAlt />
              {req.pickupDate}
            </p>

            <p className="mt-2 text-gray-700">
              {req.message}
            </p>

        
            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                req.status === "approved"
                  ? "bg-green-100 text-green-600"
                  : req.status === "rejected"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {req.status || "pending"}
            </span>

         
            {req.status === "pending" && (
              <div className="flex gap-2 mt-4">

                <button
                  onClick={() => handleApprove(req._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(req._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Reject
                </button>

              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}