import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

export default function SuccessStories() {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

       
        <h2 className="text-4xl font-bold  mb-4">
          Success Stories
        </h2>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Real people. Real pets. Real happiness.
        </p>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        
          <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition text-left">
            <FaQuoteLeft className="text-3xl text-gray-300 mb-4" />

            <p className="text-gray-600 italic">
              Bruno came into my life when I needed him the most. Now he is family.
            </p>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-800">Rahim</h4>
              <span className="text-sm text-gray-500">Dog Owner</span>
            </div>
          </div>

        
          <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition text-left">
            <FaQuoteLeft className="text-3xl text-gray-300 mb-4" />

            <p className="text-gray-600 italic">
              Luna makes our home peaceful and full of joy every single day.
            </p>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-800">Sara</h4>
              <span className="text-sm text-gray-500">Cat Owner</span>
            </div>
          </div>

         
          <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition text-left">
            <FaQuoteLeft className="text-3xl text-gray-300 mb-4" />

            <p className="text-gray-600 italic">
              Adoption changed my life. I can’t imagine my home without my pet.
            </p>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-800">Hasan</h4>
              <span className="text-sm text-gray-500">Happy Adopter</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}