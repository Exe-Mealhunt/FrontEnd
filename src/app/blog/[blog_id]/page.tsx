import React from "react";
import Link from "next/link";

import Avatar from "@/components/cover_image/avatar";
import CoverImage from "@/components/cover_image/blog_cover_image";
import DateFormatter from "@/components/formatter/date-formatter";
import CommentCard from "@/components/card/comment";

import { MockBlog } from "@/app/mock_data";

export default function BlogDetail({}: { params: { blog_id: number } }) {
  return (
    <div className="bg-white px-5">
      <div className="container mx-auto px-5 bg-white">
        <h2 className="text-2xl text-black md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight pb-20 pt-8 flex items-center">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          .
        </h2>

        <h1 className="text-5xl text-black md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none pb-12 text-center md:text-left">
          Learn How to Pre-render Pages Using Static Generation with Next.js
        </h1>
        <div className="hidden md:block md:mb-12">
          <Avatar
            name={MockBlog[0].author.name}
            picture={MockBlog[0].author.picture}
          />
        </div>
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={MockBlog[0].title} src={MockBlog[0].coverImage} />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="block md:hidden mb-6">
            <Avatar
              name={MockBlog[0].author.name}
              picture={MockBlog[0].author.picture}
            />
          </div>
          <div className="pb-6 text-lg">
            <DateFormatter dateString={MockBlog[0].date} />
          </div>
          <div className="pb-6 text-lg text-black">
            {MockBlog[0].description}
          </div>
        </div>

        <hr className="border-gray-300 my-8" />

        <h1 className="text-black text-4xl font-bold ">Comment</h1>

        <div className="py-4">
          <CommentCard />
        </div>
      </div>
    </div>
  );
}
