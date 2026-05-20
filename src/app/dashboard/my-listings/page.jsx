


// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // import DeleteModal from "@/components/DeleteModal";
// // import toast from "react-hot-toast";
// // import { useSession } from "@/lib/auth-client";

// // export default function MyListingsPage() {
// //     const { data: session } = useSession();
// //   const [pets, setPets] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //    const [isOpen, setIsOpen] = useState(false);
// //   const [deleteId, setDeleteId] = useState(null);

// //   useEffect(() => {
// //      if (!session?.user?.email) return;
// //       setLoading(true);
// //     fetch(`http://localhost:8000/pets?ownerEmail=${session.user.email}`)
// //       .then((res) => res.json())
// //       .then((data) => setPets(data));
// //   },[session?.user?.email]);

// // const handleDelete = async () => {
// //   try {
// //     const res = await fetch(`http://localhost:8000/pets/${deleteId}`, {
// //       method: "DELETE",
// //     });

// //     const data = await res.json();

// //     console.log("DELETE RESPONSE:", data);

// //     if (res.ok && data.success) {
// //       toast.success("Deleted successfully!");

// //       setPets((prev) =>
// //         prev.filter((p) => p._id !== deleteId)
// //       );
// //     } else {
// //       toast.error(data.message || "Delete failed!");
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     toast.error("Server error!");
// //   }

// //   setIsOpen(false);
// // };

// //   return (
// //     <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-6">

   
// //       <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
// //         My Listings
// //       </h1>

     
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">

// //         {pets.map((pet) => (
// //           <div
// //             key={pet._id}
// //             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full"
// //           >

         
// //             <img
// //               src={pet.image}
// //               alt={pet.name}
// //               className="w-full h-48 sm:h-52 md:h-56 object-cover"
// //             />

          
// //             <div className="p-4 flex flex-col flex-1">

            
// //               <h2 className="text-lg sm:text-xl font-bold text-gray-800">
// //                 {pet.name}
// //               </h2>

           
// //               <p className="text-gray-500 text-sm mt-1">
// //                 {pet.breed}
// //               </p>

            
// //               <p className="text-green-600 font-bold mt-2">
// //                 ${pet.adoptionFee}
// //               </p>

             
// //               <div className="mt-auto pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">

               
// //                 <Link href={`/pets/${pet._id}`} className="w-full">
// //                   <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-xl text-sm hover:bg-emerald-600 transition">
// //                     <FaEye /> View
// //                   </button>
// //                 </Link>

              
// //                 <Link href={`/update-pet/${pet._id}`} className="w-full">
// //                   <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white py-2 rounded-xl text-sm hover:bg-indigo-600 transition">
// //                     <FaEdit /> Edit
// //                   </button>
// //                 </Link>

// //                <button
// //   onClick={() => {
// //     setDeleteId(pet._id);
// //     setIsOpen(true);
// //   }}
// //   className="bg-red-600 text-white px-3 py-2 rounded-lg"
// // >
// //   Delete
// // </button>
                
// //               </div>

// //             </div>

// //           </div>
// //         ))}

// //       </div>

// //      <DeleteModal
// //   isOpen={isOpen}
// //   onClose={() => setIsOpen(false)}
// //   onConfirm={handleDelete}
// // />
// //     </div>
// //   );
// // }






// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import DeleteModal from "@/components/DeleteModal";
// import toast from "react-hot-toast";
// import { useSession } from "@/lib/auth-client";

// export default function MyListingsPage() {
//   const { data: session } = useSession();
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

  
//   const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });

//   useEffect(() => {
//     if (!session?.user?.email) return;
//     setLoading(true);

   
//     fetch(`http://localhost:8000/pets?ownerEmail=${session.user.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setPets(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));

//     // ২. পরিসংখ্যান (Stats) ফেচ করা (নতুন ব্যাকএন্ড API থেকে)
//     fetch(`http://localhost:8000/owner-stats?email=${session.user.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setStats(data.stats);
//         }
//       })
//       .catch((err) => console.log("Stats fetch error:", err));
//   }, [session?.user?.email]);

//   const handleDelete = async () => {
//     try {
//       const res = await fetch(`http://localhost:8000/pets/${deleteId}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       // মঙ্গোডিবির ডিফল্ট রেসপন্সে অনেক সময় সরাসরি data.success থাকে না, তাই res.ok ও চেক করা নিরাপদ
//       if (res.ok) {
//         toast.success("Deleted successfully!");

//         setPets((prev) => prev.filter((p) => p._id !== deleteId));
        
//         // ডিলিট হলে স্ট্যাটস আপডেট করা (টোটাল ও অ্যাভেইলেবল ১টি করে কমবে)
//         setStats(prev => ({
//           ...prev,
//           total: Math.max(0, prev.total - 1),
//           available: Math.max(0, prev.available - 1)
//         }));
//       } else {
//         toast.error(data.message || "Delete failed!");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Server error!");
//     }

//     setIsOpen(false);
//   };

//   if (loading) return <p className="text-center py-20 text-lg animate-pulse">Loading your listings...</p>;

//   return (
//     <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
      
//       <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
//         My Listings
//       </h1>

//       {/* ==========================================
//           📊 STATS SECTION (অ্যাসাইনমেন্টের মেইন রিকোয়ারমেন্ট)
//           ========================================== */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//         <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center shadow-sm">
//           <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Total Listings</p>
//           <p className="text-3xl font-black text-blue-800 mt-1">{stats.total}</p>
//         </div>
//         <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center shadow-sm">
//           <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Available</p>
//           <p className="text-3xl font-black text-emerald-800 mt-1">{stats.available}</p>
//         </div>
//         <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 text-center shadow-sm">
//           <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Adopted</p>
//           <p className="text-3xl font-black text-purple-800 mt-1">{stats.adopted}</p>
//         </div>
//       </div>

//       {/* ==========================================
//           🐾 PETS GRID LIST
//           ========================================== */}
//       {pets.length === 0 ? (
//         <div className="text-center py-20 bg-gray-50 border-2 border-dashed rounded-2xl">
//           <p className="text-gray-500 text-lg">You haven't listed any pets yet.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pets.map((pet) => (
//             <div
//               key={pet._id}
//               className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full"
//             >
//               {/* Image & Status Badge */}
//               <div className="relative">
//                 <img
//                   src={pet.image}
//                   alt={pet.name}
//                   className="w-full h-48 sm:h-52 md:h-56 object-cover"
//                 />
//                 {/* রিকোয়ারমেন্টে থাকা পেটের বর্তমান অবস্থা বোঝার জন্য একটি ছোট ব্যাজ */}
//                 <div className="absolute top-3 right-3">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow ${
//                     pet.status === "adopted" ? "bg-purple-600" : "bg-emerald-600"
//                   }`}>
//                     {pet.status === "adopted" ? "Adopted" : "Available"}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-4 flex flex-col flex-1">
//                 <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                   {pet.name}
//                 </h2>

//                 <p className="text-gray-500 text-sm mt-1">
//                   {pet.breed}
//                 </p>

//                 <p className="text-emerald-600 font-bold mt-2">
//                   ${pet.adoptionFee}
//                 </p>

//                 {/* 🛠️ Action Buttons */}
//                 <div className="mt-auto pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
//                   <Link href={`/pets/${pet._id}`} className="w-full">
//                     <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-xl text-sm hover:bg-emerald-600 transition">
//                       <FaEye /> View
//                     </button>
//                   </Link>

//                   <Link href={`/update-pet/${pet._id}`} className="w-full">
//                     <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white py-2 rounded-xl text-sm hover:bg-indigo-600 transition">
//                       <FaEdit /> Edit
//                     </button>
//                   </Link>

//                   <button
//                     onClick={() => {
//                       setDeleteId(pet._id);
//                       setIsOpen(true);
//                     }}
//                     className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-xl text-sm hover:bg-red-700 transition"
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <DeleteModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         onConfirm={handleDelete}
//       />
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "@/components/DeleteModal";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function MyListingsPage() {
  const { data: session } = useSession();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // পরিসংখ্যান (Stats) স্টেট
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });

  useEffect(() => {
    if (!session?.user?.email) return;
    setLoading(true);

    // ১. পেটের লিস্ট নিয়ে আসা (কুকি চাবিসহ)
    fetch(`http://localhost:8000/pets?ownerEmail=${session.user.email}`, {
      credentials: "include" // 🔥 কুকি ব্যাকঅ্যান্ডে পাঠানোর জন্য এটি বাধ্যতামূলক
    })
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // ২. পরিসংখ্যান (Stats) ফেচ করা (কুকি চাবিসহ)
    fetch(`http://localhost:8000/owner-stats?email=${session.user.email}`, {
      credentials: "include" // 🔥 কুকি ব্যাকঅ্যান্ডে পাঠানোর জন্য এটি বাধ্যতামূলক
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch((err) => console.log("Stats fetch error:", err));
  }, [session?.user?.email]);

  const handleDelete = async () => {
    try {
      // ৩. ডিলিট রিকোয়েস্ট (কুকি চাবিসহ)
      const res = await fetch(`http://localhost:8000/pets/${deleteId}`, {
        method: "DELETE",
        credentials: "include" // 🔥 ব্যাকঅ্যান্ড ভেরিফিকেশনের জন্য কুকি পাঠানো হলো
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Deleted successfully!");

        // স্টেট থেকে ডিলিট হওয়া পেটটি বাদ দেওয়া
        setPets((prev) => prev.filter((p) => p._id !== deleteId));
        
        // রিয়েল-টাইমে ওপরের কাউন্ট ডাইনামিকালি কমানো
        setStats(prev => ({
          ...prev,
          total: Math.max(0, prev.total - 1),
          available: Math.max(0, prev.available - 1)
        }));
      } else {
        toast.error(data.message || "Delete failed!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error!");
    }

    setIsOpen(false);
  };

  if (loading) return <p className="text-center py-20 text-lg animate-pulse">Loading your listings...</p>;

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        My Listings
      </h1>

      {/* ==========================================
          📊 STATS SECTION
          ========================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center shadow-sm">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Total Listings</p>
          <p className="text-3xl font-black text-blue-800 mt-1">{stats.total}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center shadow-sm">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Available</p>
          <p className="text-3xl font-black text-emerald-800 mt-1">{stats.available}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 text-center shadow-sm">
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Adopted</p>
          <p className="text-3xl font-black text-purple-800 mt-1">{stats.adopted}</p>
        </div>
      </div>

      {/* ==========================================
          🐾 PETS GRID LIST
          ========================================== */}
      {pets.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 border-2 border-dashed rounded-2xl">
          <p className="text-gray-500 text-lg">You haven't listed any pets yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full"
            >
              {/* Image & Status Badge */}
              <div className="relative">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-48 sm:h-52 md:h-56 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow ${
                    pet.status === "adopted" ? "bg-purple-600" : "bg-emerald-600"
                  }`}>
                    {pet.status === "adopted" ? "Adopted" : "Available"}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  {pet.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {pet.breed}
                </p>

                <p className="text-emerald-600 font-bold mt-2">
                  ${pet.adoptionFee}
                </p>

                {/* Action Buttons */}
                <div className="mt-auto pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Link href={`/pets/${pet._id}`} className="w-full">
                    <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-xl text-sm hover:bg-emerald-600 transition">
                      <FaEye /> View
                    </button>
                  </Link>

                  <Link href={`/update-pet/${pet._id}`} className="w-full">
                    <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white py-2 rounded-xl text-sm hover:bg-indigo-600 transition">
                      <FaEdit /> Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      setDeleteId(pet._id);
                      setIsOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-xl text-sm hover:bg-red-700 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}






