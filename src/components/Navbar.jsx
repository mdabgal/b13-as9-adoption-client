
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaMoon, FaPaw, FaSun } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
 
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: session, isLoading } = useSession();

  const handleLogout = async () => {
    try {
   
      await signOut();
      setOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
     <nav className="bg-gray-900 text-white shadow-md">
    
      
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-green-400">
          <FaPaw />
          PetAdopt
        </Link>

        
        <div className="hidden md:flex items-center gap-6 text-gray-300">
          <Link href="/" className="hover:text-green-400">Home</Link>
          <Link href="/pets" className="hover:text-green-400">All Pets</Link>

          {!isLoading && session && (
            <>
              <Link href="/dashboard/my-requests" className="hover:text-green-400">
                My Requests
              </Link>
              <Link href="/dashboard/add-pet" className="hover:text-green-400">
                Add Pet
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">


      <ThemeToggle></ThemeToggle>


       
          {!isLoading && !session && (
            <>
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
            </>
          )}

       
          {!isLoading && session && (
            <div className="relative group flex items-center gap-3">

              <Image
                src={session.user?.image && session.user.image.trim() !== "" ? session.user.image : "https://images.unsplash.com/photo-1544005313-94ddf0286df2"}
                alt="user"
                width={35}
                height={35}
                className="rounded-full border cursor-pointer hover:scale-105 transition"
              />

              <span className="text-gray-300">
                {session.user?.name}
              </span>

            
              <div className="absolute right-0 top-10 hidden group-hover:block bg-white text-black rounded shadow-md p-2 w-32 z-50">
                <Link
                  href="/dashboard"
                  className="block px-2 py-1 hover:bg-gray-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1 hover:bg-gray-200 text-red-600"
                >
                  Logout
                </button>
              </div>

            </div>
          )}

        </div>

    
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

     
      {open && (
        
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-gray-900 border-t border-gray-800">
     <ThemeToggle></ThemeToggle>
     
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/pets" onClick={() => setOpen(false)}>All Pets</Link>

          {!isLoading && session && (
            <>
              <Link href="/dashboard/my-requests" onClick={() => setOpen(false)}>
                My Requests
              </Link>
              <Link href="/dashboard/add-pet" onClick={() => setOpen(false)}>
                Add Pet
              </Link>
            </>
          )}

          <hr className="border-gray-700" />

          {!isLoading && !session ? (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link href="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 text-left"
            >
              Logout
            </button>
          )}

        </div>
      )}

    </nav>
  );
}