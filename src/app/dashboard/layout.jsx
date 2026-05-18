"use client";

import Link from "next/link";

export default function DashboardLayout({ children }) {

  return (

    <div className="min-h-screen flex">


      <div className="w-64 bg-gray-900 text-white p-6">

        <h1 className="text-3xl font-bold mb-10 text-green-400">
          Dashboard
        </h1>

        <div className="flex flex-col gap-4">

          <Link href="/dashboard/my-listings">
            <button className="w-full bg-gray-800 py-3 rounded-lg">
              My Listings
            </button>
          </Link>

          <Link href="/dashboard/my-requests">
            <button className="w-full bg-gray-800 py-3 rounded-lg">
              My Requests
            </button>
          </Link>

          <Link href="/dashboard/add-pet">
            <button className="w-full bg-green-600 py-3 rounded-lg">
              Add Pet
            </button>
          </Link>

        </div>

      </div>

    
      <div className="flex-1 p-8 bg-gray-100">

        {children}

      </div>

    </div>
  );
}