// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// // export default function MyListingsPage() {

// //   const [pets, setPets] = useState([]);

// //   useEffect(() => {

// //     fetch("http://localhost:8000/pets")
// //       .then((res) => res.json())
// //       .then((data) => setPets(data));

// //   }, []);

// //   return (

// //     <div className="w-full">

// //       {/* Title */}
// //       <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
// //         My Listings
// //       </h1>

// //       {/* Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// //         {pets.map((pet) => (

// //           <div
// //             key={pet._id}
// //             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
// //           >

// //             {/* Image */}
// //             <img
// //               src={pet.image}
// //               alt={pet.name}
// //               className="w-full h-48 sm:h-52 md:h-56 object-cover"
// //             />

// //             {/* Content */}
// //             <div className="p-5">

// //               {/* Name */}
// //               <h2 className="text-xl md:text-2xl font-bold text-gray-800">
// //                 {pet.name}
// //               </h2>

// //               {/* Breed */}
// //               <p className="text-gray-500 text-sm md:text-base mt-1">
// //                 {pet.breed}
// //               </p>

// //               {/* Fee */}
// //               <p className="text-green-600 font-bold mt-2 text-base md:text-lg">
// //                 ${pet.adoptionFee}
// //               </p>

// //              {/* Buttons */}
// // <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:gap-3">

// //   {/* View */}
// //   <Link href={`/pets/${pet._id}`} className="w-full sm:flex-1">
// //     <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-xl font-medium hover:bg-emerald-600 transition">
// //       <FaEye /> View
// //     </button>
// //   </Link>

// //   {/* Edit */}
// //   <Link href={`/update-pet/${pet._id}`} className="w-full sm:flex-1 ">
// //     <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white py-2 rounded-xl font-medium hover:bg-indigo-600 transition">
// //       <FaEdit /> Edit
// //     </button>
// //   </Link>

// //   {/* Delete */}
// //   <button className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-rose-500 text-white py-2 rounded-xl font-medium hover:bg-rose-600 transition">
// //     <FaTrash /> Delete
// //   </button>

// // </div>

// //             </div>

// //           </div>

// //         ))}

// //       </div>

// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// export default function MyListingsPage() {

//   const [pets, setPets] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/pets")
//       .then((res) => res.json())
//       .then((data) => setPets(data));
//   }, []);

//   return (

//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

//       {/* Title */}
//       <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
//         My Listings
//       </h1>

//       {/* Grid */}
//    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

//         {pets.map((pet) => (

//           <div
//             key={pet._id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full"
//           >

//             {/* Image */}
//             <img
//               src={pet.image}
//               alt={pet.name}
//              className="w-full h-48 sm:h-52 md:h-56 object-cover"
//             />

//             {/* Content */}
//             <div className="p-4 flex flex-col flex-1">

//               {/* Name */}
//               <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                 {pet.name}
//               </h2>

//               {/* Breed */}
//               <p className="text-gray-500 text-sm mt-1">
//                 {pet.breed}
//               </p>

//               {/* Fee */}
//               <p className="text-green-600 font-bold mt-2">
//                 ${pet.adoptionFee}
//               </p>

//               {/* Buttons */}
//               <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-2">

//                 {/* View */}
//                 <Link href={`/pets/${pet._id}`} className="w-full">
//                   <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-xl text-sm hover:bg-emerald-600 transition">
//                     <FaEye /> View
//                   </button>
//                 </Link>

//                 {/* Edit */}
//                 <Link href={`/update-pet/${pet._id}`} className="w-full">
//                   <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white py-2 rounded-xl text-sm hover:bg-indigo-600 transition">
//                     <FaEdit /> Edit
//                   </button>
//                 </Link>

//                 {/* Delete */}
//                 <button className="w-full flex items-center justify-center gap-2 bg-rose-500 text-white py-2 rounded-xl text-sm hover:bg-rose-600 transition">
//                   <FaTrash /> Delete
//                 </button>

//               </div>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function MyListingsPage() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/pets")
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        My Listings
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {pets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full"
          >

            {/* Image */}
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 sm:h-52 md:h-56 object-cover"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">

              {/* Name */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {pet.name}
              </h2>

              {/* Breed */}
              <p className="text-gray-500 text-sm mt-1">
                {pet.breed}
              </p>

              {/* Fee */}
              <p className="text-green-600 font-bold mt-2">
                ${pet.adoptionFee}
              </p>

              {/* Buttons */}
              <div className="mt-auto pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">

                {/* View */}
                <Link href={`/pets/${pet._id}`} className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-xl text-sm hover:bg-emerald-600 transition">
                    <FaEye /> View
                  </button>
                </Link>

                {/* Edit */}
                <Link href={`/update-pet/${pet._id}`} className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white py-2 rounded-xl text-sm hover:bg-indigo-600 transition">
                    <FaEdit /> Edit
                  </button>
                </Link>

                {/* Delete */}
                <button className="w-full flex items-center justify-center gap-2 bg-rose-500 text-white py-2 rounded-xl text-sm hover:bg-rose-600 transition">
                  <FaTrash /> Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}