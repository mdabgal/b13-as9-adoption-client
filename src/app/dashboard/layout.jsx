"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (

    <div className="min-h-screen flex">

     
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50">

        <h1 className="text-xl font-bold text-green-400">
          Dashboard
        </h1>

        <button onClick={() => setOpen(true)} className="text-2xl">
          ☰
        </button>

      </div>

     
      <div className={`
        fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-50
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}>

       
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        <h1 className="text-2xl font-bold text-green-400 mb-8">
          Dashboard
        </h1>

        <div className="flex flex-col gap-3">

          <Link href="/dashboard/my-listings">
            <button className={`w-full py-2 rounded-lg ${
              pathname === "/dashboard/my-listings"
                ? "bg-green-600"
                : "bg-gray-800"
            }`}>
              My Listings
            </button>
          </Link>

          <Link href="/dashboard/my-requests">
            <button className={`w-full py-2 rounded-lg ${
              pathname === "/dashboard/my-requests"
                ? "bg-green-600"
                : "bg-gray-800"
            }`}>
              My Requests
            </button>
          </Link>

          <Link href="/dashboard/add-pet">
            <button className={`w-full py-2 rounded-lg ${
              pathname === "/dashboard/add-pet"
                ? "bg-green-600"
                : "bg-gray-800"
            }`}>
              Add Pet
            </button>
          </Link>

        </div>

      </div>

     
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}

      {/* Content */}
      <div className="flex-1 bg-gray-100 p-4 md:p-8 md:ml-14 mt-14 md:mt-0">

        {children}

      </div>

    </div>
  );
}