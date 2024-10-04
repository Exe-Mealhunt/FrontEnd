import React from "react";

import { PostPreview } from "@/components/post";
import { MockBlog } from "../mock_data";

export default function Blog() {
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

        <div className="grid grid-cols-1 bg-white md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 pb-32 ">
          {MockBlog.map((blogs: any) => (
            <PostPreview
              key={blogs.slug}
              title={blogs.title}
              coverImage={blogs.coverImage}
              date={blogs.date}
              author={blogs.author}
              id={blogs.id}
              excerpt={blogs.excerpt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
