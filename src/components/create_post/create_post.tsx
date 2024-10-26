"use client";
import React, { useState } from "react";
import { isValidImageURL } from "../../../helpers/valid-image-url";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { postRequest } from "../../../helpers/api-requests";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/input/tutorial_input"), {
  ssr: false,
});
export default function CreatePost() {
  const { data: session } = useSession();
  const router = useRouter();

  const [imgUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidImageURL(imgUrl)) {
      toast.error("Image URL must be a valid Image link");
      return;
    }

    const blogData = {
      userId: session?.user?.id,
      title: title,
      imgUrl,
      content,
    };

    try {
      const response = await postRequest("/blog", blogData);
      if (response.title) {
        toast.success("Blog posted successfully!");
        router.push("/blog");
      }
    } catch (error) {
      alert("An error occurred while posting the blog. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          New Post
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="blogTitle">
                  Title: <span className="text-red-500">*</span>
                </label>
                <input
                  id="blogTitle"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input w-full text-gray-900 bg-white rounded-md border border-gray-300 p-3 focus:border-indigo-500"
                  placeholder="Enter Title"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="videoUrl">
                  Image URL: <span className="text-red-500">*</span>
                </label>
                <input
                  id="ImageUrl"
                  type="url"
                  value={imgUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="input w-full text-gray-900 bg-white rounded-md border border-gray-300 p-3 focus:border-indigo-500"
                  placeholder="Enter image URL"
                  required
                />
              </div>

              {/* Blog Content */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="videoUrl">
                  Tutorial: <span className="text-red-500">*</span>
                </label>
                <TextEditor text={content} setText={setContent} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 w-full md:w-auto rounded-md hover:bg-green-500 transition-all"
            >
              Post Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
