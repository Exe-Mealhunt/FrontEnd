"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { User } from "../../../constants/types/next-auth";
import { getRequest } from "../../../helpers/api-requests";
import Loading from "@/app/loading";

export default function UserProfile() {
  const { data: session } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Added error handling

  useEffect(() => {
    if (session?.user?.id) {
      const userId = parseInt(session.user.id, 10);
      setLoading(true); // Ensure loading starts
      getRequest("/users/by-id", { id: userId })
        .then((response) => {
          setUser(response);
          setError(null); // Reset error state on success
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
          setError("Failed to load user profile. Please try again later.");
        })
        .finally(() => setLoading(false));
    }
  }, [session]); // Added session dependency

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-primary">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 w-full min-h-screen flex justify-center items-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-gray-50 w-full min-h-screen flex justify-center items-center">
        <p className="text-gray-500">No user data found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full min-h-screen flex justify-center">
      <form className="w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          User Profile
        </h1>
        <div className="p-4 text-gray-700">
          <span className="font-medium text-gray-600">Full Name:</span>{" "}
          {user.fullName}
        </div>
        <div className="p-4 text-gray-700">
          <span className="font-medium text-gray-600">Email:</span> {user.email}
        </div>
        <div className="p-4 text-gray-700">
          <span className="font-medium text-gray-600">Role:</span> {user.role}
        </div>
      </form>
    </div>
  );
}
