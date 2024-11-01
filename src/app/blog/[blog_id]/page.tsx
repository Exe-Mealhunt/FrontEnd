"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import Avatar from "@/components/cover_image/avatar";
import DateFormatter from "@/components/formatter/date-formatter";
import CommentCard from "@/components/card/comment";
import { getRequest, postRequest } from "../../../../helpers/api-requests";
import CommentBar from "@/components/input/comment_input";
import Loading from "@/app/loading";

import { Blog } from "../../../../constants/types/blog.type";
import { Comment } from "../../../../constants/types/comment.type";

export default function BlogDetail({
  params,
}: {
  params: { blog_id: string };
}) {
  const { data: session } = useSession();
  const blogId = parseInt(params.blog_id, 10);

  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setLoading(true);
    getRequest(`/blog/${blogId}`, {})
      .then((response) => {
        setBlog(response);
        setComments(response.comments);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const groupCommentsByReplyToId = (
    comments: Comment[],
  ): Record<number, Comment[]> => {
    const map: Record<number, Comment[]> = {};
    comments.forEach((comment) => {
      const parentId = comment.replyToId || 0;
      if (!map[parentId]) {
        map[parentId] = [];
      }
      map[parentId].push(comment);
    });
    return map;
  };

  const commentsGroupedByReplyToId = groupCommentsByReplyToId(comments);

  const handleNewComment = async (content: string) => {
    if (!session) {
      toast.error("You need to login to comment");
      return;
    }

    try {
      const newComment = await postRequest("/comments", {
        userId: session?.user.id,
        postId: blogId,
        replyToId: null,
        content,
      });
      if (newComment.content) {
        setComments((prevComments) => [...prevComments, newComment]);
        toast.success("Comment successfully");
      }
    } catch (error) {
      console.error("Error posting new comment:", error);
    }
  };

  return (
    <div className="bg-white px-5">
      <div className="container mx-auto px-5 bg-white">
        <h2 className="text-2xl text-black md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight pb-20 pt-8 flex items-center">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          .
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            {" "}
            <h1 className="text-5xl text-black md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none pb-12 text-center md:text-left">
              {blog?.title}
            </h1>
            <div className="hidden md:block md:mb-12">
              <Avatar name={blog?.author.userName} />
            </div>
            <div className="mb-8 md:mb-16 sm:mx-0">
              {blog?.imgUrl && (
                <Image
                  src={blog.imgUrl}
                  alt={`Cover Image for ${blog?.title}`}
                  className="shadow-sm w-full"
                  width={1300}
                  height={630}
                />
              )}
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="block md:hidden mb-6">
                <Avatar name={blog?.author.userName} />
              </div>
              <div className="pb-6 text-lg">
                {blog?.createdAt && (
                  <DateFormatter dateString={blog.createdAt} />
                )}
              </div>
              <div
                className="pb-6 text-lg text-black"
                dangerouslySetInnerHTML={{
                  __html: blog?.content ?? "",
                }}
              />
            </div>
          </>
        )}

        <hr className="border-gray-300 my-8" />

        <h1 className="text-black text-4xl font-bold ">Comments</h1>

        <CommentBar onCommentSubmit={handleNewComment} />

        <div className="bg-white px-5">
          <div className="py-4">
            {commentsGroupedByReplyToId[0]?.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                replies={commentsGroupedByReplyToId[comment.id!] || []}
                postId={blogId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
