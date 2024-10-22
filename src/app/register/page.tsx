"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-[url('https://img.freepik.com/free-photo/ingredients-cabbage-carrot-pie-cabbage-carrots-eggs-flour-milk-butter-spices-white-background_127032-2866.jpg?w=1800&t=st=1729571560~exp=1729572160~hmac=a8446e659c27ecf598ec93ece324c8e78cce3d945f34e195d207b1273e279fbd')] bg-cover bg-no-repeat min-h-screen flex items-center justify-center">
      <div className="bg-primary p-8 rounded-lg shadow-lg w-full max-w-md">
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
