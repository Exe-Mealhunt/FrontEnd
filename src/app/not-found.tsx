import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="bg-gradient-to-r from-[#eda86b] to-[#fd5904] h-screen">
      <div className="w-9/12 m-auto py-16 flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-[#fd5904]">404</h1>
            <h1 className="text-6xl font-medium py-8 text-black">
              oops! Page not found
            </h1>
            <p className="text-2xl pb-8 px-12 font-medium text-black">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>
            <Link href={"/"}>
              <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                HOME
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
