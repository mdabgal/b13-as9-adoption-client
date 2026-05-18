



"use client";

import Link from "next/link";
import { useState } from "react";
import { FaPaw } from "react-icons/fa";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (

    <nav className="bg-gray-900 text-white shadow-md">

      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-green-400">
          <FaPaw />
          PetAdopt
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-300">

          <Link href="/" className="hover:text-green-400">Home</Link>

          <Link href="/pets" className="hover:text-green-400">All Pets</Link>

          <Link href="/dashboard/my-listings" className="hover:text-green-400">
            Dashboard
          </Link>

          <Link href="/dashboard/add-pet" className="hover:text-green-400">
            Add Pet
          </Link>

        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex gap-3">

          <Link href="/login">
            <button className="px-4 py-1 rounded-lg border border-gray-600 hover:bg-gray-800">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-4 py-1 rounded-lg bg-green-600 hover:bg-green-700">
              Register
            </button>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (

        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-gray-900 border-t border-gray-800">

          <Link href="/" onClick={() => setOpen(false)}>Home</Link>

          <Link href="/pets" onClick={() => setOpen(false)}>All Pets</Link>

          <Link href="/dashboard/my-listings" onClick={() => setOpen(false)}>
            Dashboard
          </Link>

          <Link href="/dashboard/add-pet" onClick={() => setOpen(false)}>
            Add Pet
          </Link>

          <hr className="border-gray-700" />

          <Link href="/login" onClick={() => setOpen(false)}>Login</Link>

          <Link href="/register" onClick={() => setOpen(false)}>Register</Link>

        </div>

      )}

    </nav>
  );
}
