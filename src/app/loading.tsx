import React from "react";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-12 h-12 rounded-full animate-spin border-t-transparent border-solid border-black border-y-4 shadow-md" />
    </div>
  );
}
