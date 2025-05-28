"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthForm({ type }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${type} form submitted`, form);
    // Handle auth logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          {type === "login" ? "Login to your account" : "Create an account"}
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          required
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          required
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {type === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-sm">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
