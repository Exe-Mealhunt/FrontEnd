"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { PostPreview } from "@/components/post";
import { getRequest } from "../../../helpers/api-requests";
import Loading from "../loading";

import { Blog } from "../../../constants/types/blog.type";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  const [blogs, setBlog] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRequest("/blog/all", {})
      .then((response) => {
        setBlog(response.posts);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (session?.user?.subscription == null) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-5 bg-white">
        <section className="flex-col md:flex-row flex items-center md:justify-between pt-16 pb-16 md:mb-12">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-black md:pr-8">
            Blog.
          </h1>
          <h4 className="text-center text-black md:text-left text-lg mt-5 md:pl-8">
            Discover delicious recipes and cooking tips on our blog, tailored
            just for food lovers!
          </h4>
        </section>
        {session && (
          <div className="flex justify-end mb-8">
            <Link href={"/create_post"}>
              <button className="btn bg-[#46500c] rounded-none border-none hover:bg-secondary text-white">
                Up Post
              </button>
            </Link>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 bg-white md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 pb-32 mt-4">
            {blogs.map((blog) => (
              <PostPreview
                key={blog.id}
                id={blog.id}
                title={blog.title}
                imgUrl={blog.imgUrl}
                createdAt={blog.createdAt}
                author={blog.author}
                rating={blog.rating}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
