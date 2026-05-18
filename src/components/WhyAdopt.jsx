import React from "react";
import { FaHeart, FaSmileBeam } from "react-icons/fa";
import { GiPawHeart } from "react-icons/gi";

export default function WhyAdopt() {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Title */}
        <h2 className="text-4xl font-bold mb-6">
          Why Adopt Pets?
        </h2>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Adopting a pet is not just about bringing home an animal — it’s about saving a life and gaining a loyal friend forever.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Save Lives
            </h3>
            <p className="text-gray-500">
              Every adopted pet means one less animal suffering in shelters.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <FaSmileBeam className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Reduce Stress
            </h3>
            <p className="text-gray-500">
              Pets help reduce anxiety and bring emotional comfort.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <GiPawHeart className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Best Companion
            </h3>
            <p className="text-gray-500">
              They become your loyal friend for life, always by your side.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}