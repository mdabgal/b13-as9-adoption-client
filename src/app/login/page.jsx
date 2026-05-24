"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (!res?.error) {
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signIn.social({
        provider: "google",
      });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
     <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          User Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
           className="w-full border p-3 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
          className="w-full border p-3 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

       <div className="text-center my-3 text-gray-400 dark:text-gray-500">OR</div>

        <button
          type="button"
          onClick={handleGoogleSignin}
         className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

      <p className="text-center mt-5 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link href="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}