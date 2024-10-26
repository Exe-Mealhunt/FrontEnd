"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Avatar from "@/components/cover_image/avatar";
import DateFormatter from "@/components/formatter/date-formatter";
import CommentCard from "@/components/card/comment";

import { Blog } from "../../../../constants/types/blog.type";
import { getRequest } from "../../../../helpers/api-requests";

export default function BlogDetail({
  params,
}: {
  params: { blog_id: string };
}) {
  const blogId = parseInt(params.blog_id, 10);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    getRequest(`/blog/${blogId}`, {})
      .then((response) => {
        setBlog(response);
      })
      .catch(() => {});
  }, []);

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
          {blog?.title}
        </h1>
        <div className="hidden md:block md:mb-12">
          <Avatar
            name={blog?.author.userName}
            // picture={MockBlog[0].author.picture}
          />
        </div>
        <div className="mb-8 md:mb-16 sm:mx-0">
          {blog?.imgUrl && (
            <Image
              src={blog.imgUrl}
              alt={`Cover Image for ${blog?.title}`}
              className={`shadow-sm w-full`}
              width={1300}
              height={630}
            />
          )}
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="block md:hidden mb-6">
            <Avatar
              name={blog?.author.userName}
              // picture={MockBlog[0].author.picture}
            />
          </div>
          <div className="pb-6 text-lg">
            {blog?.createdAt && <DateFormatter dateString={blog.createdAt} />}
          </div>
          <div
            className="pb-6 text-lg text-black"
            dangerouslySetInnerHTML={{
              __html: blog?.content ?? "",
            }}
          />
        </div>

        <hr className="border-gray-300 my-8" />

        <h1 className="text-black text-4xl font-bold ">Comment</h1>

        <div className="py-4">
          {blog?.comments?.map((comment: any) => (
            <CommentCard
              key={comment.id}
              id={comment.id}
              userId={comment.userId}
              replyToId={comment.replyToId}
              postId={comment.postId}
              content={comment.content}
              rating={comment.rating}
              createdAt={comment.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
