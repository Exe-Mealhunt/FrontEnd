"use client";
import Link from "next/link";

import Avatar from "../cover_image/avatar";
import CoverImage from "../cover_image/blog_cover_image";
import DateFormatter from "../formatter/date-formatter";
import HeartButton from "../button/heart_button";

export type Author = {
  name: string;
  picture: string;
};

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  id: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  id,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage id={id} title={title} src={coverImage} />
      </div>

      <HeartButton />

      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/blog/${id}`} className="hover:underline text-black">
          {title}
        </Link>
      </h3>
      <div className="text-lg text-black mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg text-black leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}
