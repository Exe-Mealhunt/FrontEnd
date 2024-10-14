"use client";
import React from "react";
import Image from "next/image";
import logoImg from "../../assets/login_image.jpg";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen bg-primary relative">
      <Image src={logoImg} alt="register" fill className="object-cover" />
      <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
        <form className="w-full max-w-md bg-primary p-10">
          <h1 className="text-3xl font-medium text-center mb-6 text-black">
            Sign up
          </h1>

          <div className="flex justify-center mb-6">
            <span className=" font-medium text-sm text-black">
              Already have an account?
            </span>
            <Link
              href="/login"
              className=" font-medium text-sm text-blue-500 hover:text-blue-800"
            >
              Login
            </Link>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Confirm password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm_password"
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-secondary hover:bg-[#4CAF50] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
