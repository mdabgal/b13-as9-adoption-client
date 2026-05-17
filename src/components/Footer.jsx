import Link from "next/link";
import { FaPaw } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16 mt-10">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="flex gap-2 items-center text-2xl font-bold text-green-500">
          <FaPaw/>  <span>Pet Adoption</span> 
          </h2>
          <p className="text-gray-400 mt-3">
            Helping pets find loving homes and families.
          </p>


          

          

      </div>





     

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>

          <div className="flex flex-col gap-2 text-gray-400">
            <Link className="hover:text-green-400" href="/">Home</Link>
            <Link className="hover:text-green-400" href="/pets">All Pets</Link>
            <Link className="hover:text-green-400" href="/dashboard">Dashboard</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>

          <p className="text-gray-400">Email: support@petadopt.com</p>
          <p className="text-gray-400">Phone: +880 123 456</p>
          <p className="text-gray-400">Bangladesh</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} PetAdopt. All rights reserved.
      </div>

    </footer>
  );
}