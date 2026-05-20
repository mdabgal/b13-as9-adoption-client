import { FaPaw } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4">

      <div className="bg-white/80 backdrop-blur-xl shadow-2xl border border-white rounded-3xl px-10 py-12 flex flex-col items-center max-w-sm w-full">

       
        <div className="text-green-600 text-6xl mb-4 animate-bounce">
          <FaPaw />
        </div>

     
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-green-200"></div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
        </div>

     
        <h2 className="mt-6 text-xl font-bold text-gray-800">
          Loading Pets...
        </h2>

        <p className="mt-2 text-sm text-gray-500 text-center">
          Finding the perfect companion for you
        </p>

       
        <div className="flex gap-2 mt-5">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>

      </div>
    </div>
  );
}