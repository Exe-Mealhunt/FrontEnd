"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { User } from "../../../constants/types/next-auth";
import { getRequest } from "../../../helpers/api-requests";
import Loading from "@/app/loading";

export default function UserProfile() {
  const { data: session } = useSession();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session?.user?.id) {
      const userId = parseInt(session.user.id, 10);
      getRequest("/users/by-id", {
        id: userId,
      })
        .then((response) => {
          setUser(response);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return loading ? (
    <div className="flex w-full h-screen justify-center items-center bg-primary">
      <Loading />
    </div>
  ) : (
    <div className="bg-gray-50 w-full min-h-screen flex justify-center">
      <form className="w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          User Profile
        </h1>
        <div className="">
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-100 text-gray-700">
            <span className="font-medium text-gray-600">Full Name:</span>{" "}
            {user?.fullName}
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-gray-100 text-gray-700">
            <span className="font-medium text-gray-600">Email:</span>{" "}
            {user?.email}
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-gray-100 text-gray-700">
            <span className="font-medium text-gray-600">Role:</span>{" "}
            {user?.role}
          </div>
        </div>
      </form>
    </div>
  );
}
