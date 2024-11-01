"use client";
import React, { useState } from "react";
import { Comment } from "../../../constants/types/comment.type"; // Import Comment type
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { postRequest } from "../../../helpers/api-requests";

type CommentCardProps = {
  comment: Comment;
  replies: Comment[];
  postId: number;
};

export default function CommentCard({
  comment,
  replies,
  postId,
}: CommentCardProps) {
  const { data: session } = useSession();
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyList, setReplyList] = useState<Comment[]>(replies);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) {
      toast.error("Reply content cannot be empty.");
      return;
    }

    if (!session) {
      toast.error("You need to login to reply this comment");
      return;
    }

    const newReply = {
      userId: session?.user.id,
      postId,
      replyToId: comment.id,
      content: replyContent,
    };

    try {
      const response = await postRequest("/comments", newReply);
      if (response.content) {
        toast.success("Successfully reply this comment");
        setReplyList([...replyList, response]);
        setReplyContent("");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to post reply.");
    }
  };

  return (
    <div className="max-w-screen mx-auto border px-6 py-4 rounded-lg mb-4">
      <div className="flex items-center mb-4">
        <img
          src="https://randomuser.me/api/portraits/men/97.jpg"
          alt="User Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <div className="text-lg font-medium text-gray-800">
            User {comment.userId}
          </div>
          <div className="text-gray-500 text-sm">
            Posted on {new Date(comment.createdAt!).toLocaleString()}
          </div>
        </div>
      </div>

      <p className="text-lg text-black leading-relaxed mb-4">
        {comment.content}
      </p>

      {/* Like and Reply buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies ? "Hide Replies" : `View Replies (${replyList.length})`}
        </button>
      </div>

      {/* Reply Input */}
      {showReplies && (
        <div className="ml-8 mt-4">
          {replyList.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              replies={[]}
              postId={postId}
            />
          ))}
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="w-full p-2 border border-gray-300 rounded mr-2 text-black placeholder-gray-500 focus:text-black"
            />
            <button
              onClick={handleReplySubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
