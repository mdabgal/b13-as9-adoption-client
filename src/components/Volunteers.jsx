import Image from "next/image";
import React from "react";
import man from "@/assets/images/parsone1.jpg";
import man2 from "@/assets/images/parsone2.jpg";
import man3 from "@/assets/images/parsone3.jpg";
import { FaHandsHelping } from "react-icons/fa";

export default function Volunteers() {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6 ">

        
        <div className="text-center mb-12">
          <FaHandsHelping className="text-4xl text-green-600 mx-auto mb-4" />

          <h2 className="text-4xl font-bold ">
            Our Volunteers
          </h2>

          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Meet the passionate people who help rescue, care, and find loving homes for pets.
          </p>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      
          <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl shadow hover:shadow-lg transition">
            <Image
              src={man}
              alt="volunteer"
              height={50}
              width={50}
              className="w-16 h-16 rounded-full object-cover"
            />

            <div>
              <h3 className="font-semibold text-gray-800">Ayesha</h3>
              <p className="text-sm text-gray-500">Pet Rescuer</p>
            </div>
          </div>

          
          <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl shadow hover:shadow-lg transition">
            <Image
              src={man2}
              alt="volunteer"
              height={50}
              width={50}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Tanvir</h3>
              <p className="text-sm text-gray-500">Adoption Helper</p>
            </div>
          </div>

          
          <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl shadow hover:shadow-lg transition">
           <Image
              src={man3}
              alt="volunteer"
              height={50}
              width={50}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Nadia</h3>
              <p className="text-sm text-gray-500">Community Support</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}