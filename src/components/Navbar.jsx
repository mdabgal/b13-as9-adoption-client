"use client";

import Link from "next/link";
import { useState } from "react";
import { FaPaw } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white teshadow-lg border border-b  border-gray-300  ">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center text-2xl font-bold text-green-500">
           <FaPaw/>  <span>PetAdopt</span> 
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-300">
          <Link href="/" className="hover:text-green-400">Home</Link>
          <Link href="/pets" className="hover:text-green-400">All Pets</Link>
          <Link href="/dashboard" className="hover:text-green-400">Dashboard</Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-3">
          <Link href="/login">
            <button className="px-4 py-1 border border-gray-600 rounded hover:bg-gray-800">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-4 py-1 bg-green-600 rounded hover:bg-green-700">
              Register
            </button>
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-gray-300">
          <Link href="/">Home</Link>
          <Link href="/pets">All Pets</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}

    </nav>
  );
}