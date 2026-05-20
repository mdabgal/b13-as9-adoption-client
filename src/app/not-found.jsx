import Link from "next/link";
import { FaPaw } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-100 px-4">

      <div className="bg-white/80 backdrop-blur-xl shadow-2xl border border-white rounded-3xl px-10 py-12 flex flex-col items-center text-center max-w-md w-full">

       
        <div className="text-red-500 text-6xl animate-bounce mb-4">
          <FaPaw/>
        </div>

       
        <h1 className="text-6xl font-extrabold text-gray-800">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-bold text-gray-700">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 text-sm">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

       
        <Link href="/">
          <button className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md transition">
            Go Home
          </button>
        </Link>

       
        <div className="flex gap-2 mt-6">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>

      </div>
    </div>
  );
}