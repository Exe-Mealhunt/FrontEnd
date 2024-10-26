"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { postRequest } from "../../../helpers/api-requests";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await postRequest("/auth/register", {
        fullName,
        email,
        password,
      });
      if (response.fullName) {
        toast.success("Successfully registered account");
      }
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[url('https://img.freepik.com/free-photo/ingredients-cabbage-carrot-pie-cabbage-carrots-eggs-flour-milk-butter-spices-white-background_127032-2866.jpg?w=1800&t=st=1729571560~exp=1729572160~hmac=a8446e659c27ecf598ec93ece324c8e78cce3d945f34e195d207b1273e279fbd')] bg-cover bg-no-repeat min-h-screen flex items-center justify-center">
      <div className="bg-primary p-8 rounded-lg shadow-lg w-full max-w-md">
        <form
          className="w-full max-w-md bg-primary p-10"
          onSubmit={handleRegister}
        >
          <h1 className="text-3xl font-medium text-center mb-6 text-black">
            Sign up
          </h1>

          <div className="flex justify-center mb-6">
            <span className="font-medium text-sm text-black">
              Already have an account?
            </span>
            <Link
              href="/login"
              className="ml-1 font-medium text-sm text-blue-500 hover:text-blue-800"
            >
              Login
            </Link>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              FullName
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              placeholder="FullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="confirm_password"
            >
              Confirm password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm_password"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
