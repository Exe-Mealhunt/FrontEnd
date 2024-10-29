import React, { useState } from "react";

type CommentBarProps = {
  onCommentSubmit: (content: string) => void;
};

const CommentBar: React.FC<CommentBarProps> = ({ onCommentSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCommentSubmit(content);
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-4 p-4 border rounded-md shadow-sm"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-2 border border-gray-300 rounded mr-2 text-black placeholder-gray-500 focus:text-black"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Post
      </button>
    </form>
  );
};

export default CommentBar;
