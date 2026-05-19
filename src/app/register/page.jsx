"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    // PASSWORD VALIDATION
    if (password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    if (!/[A-Z]/.test(password)) {
      return toast.error(
        "Password needs one uppercase letter"
      );
    }

    if (!/[a-z]/.test(password)) {
      return toast.error(
        "Password needs one lowercase letter"
      );
    }

    if (password !== confirmPassword) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {

      await signUp.email({
        email,
        password,
        name,
        image: photo,
      });

      toast.success("Registration successful");

      router.push("/login");

    } catch (error) {

      toast.error("Registration failed");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          {/* NAME */}
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-xl"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* PHOTO URL */}
          <input
            type="text"
            placeholder="Photo URL"
            className="w-full border p-3 rounded-xl"
            value={photo}
            onChange={(e) =>
              setPhoto(e.target.value)
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-xl"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}