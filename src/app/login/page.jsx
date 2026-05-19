"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { authClient, signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
   const res =   await signIn.email({
        email,
        password,
      });
      console.log(res)


    if (!res?.error) {
      toast.success("Login successful");
      router.push("/");
    } else {
      toast.error("place Register");
    }

     
     } catch (error) {
 
 toast.error("Invalid email or password");
} finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin= async() => {
    await authClient.signIn.social({
        provider: "google"
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          User Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="text-center my-2 text-gray-400">OR</div>

<button
  type="button"
  onClick={handleGoogleSignin}
  className="w-full flex items-center justify-center gap-2 border border-gray-200 shadow-2xl  py-3 rounded-xl mt-3 hover:bg-gray-100 transition"
>
  <FcGoogle size={22} />
  Continue with Google
</button>


        {/* REGISTER LINK */}
        <p className="text-center mt-5 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>


       



      </div>
    </div>
  );
}




