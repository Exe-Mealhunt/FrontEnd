"use client";
import Link from "next/link";
import Image from "next/image";

import Avatar from "../cover_image/avatar";
import DateFormatter from "../formatter/date-formatter";
import { RatingComponent } from "../button/heart_button";

import { Blog } from "../../../constants/types/blog.type";

export function PostPreview({
  id,
  title,
  imgUrl,
  createdAt,
  author,
  rating,
}: Blog) {
  return (
    <div>
      <div className="mb-5">
        <Link href={`/blog/${id}`} className="hover:underline text-black">
          <Image
            src={imgUrl}
            alt={`Cover Image for ${title}`}
            className={`shadow-sm w-full`}
            width={1300}
            height={630}
          />
        </Link>
      </div>

      <RatingComponent rating={rating} name={`rating-${id}`} />

      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/blog/${id}`} className="hover:underline text-black">
          {title}
        </Link>
      </h3>
      <div className="text-lg text-black mb-4">
        <DateFormatter dateString={createdAt} />
      </div>
      {/* <p className="text-lg text-black leading-relaxed mb-4">{excerpt}</p> */}
      <Avatar
        name={author?.userName}
        //  picture={posted_by.picture}
      />
    </div>
  );
}
