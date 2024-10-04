import React, { useState } from "react";

export default function HeartButton() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleClick = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleClick}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
          liked ? "bg-red-500" : "text-gray-400"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </button>
      <span className="ml-2 text-gray-700">{likes}</span>
    </div>
  );
}
