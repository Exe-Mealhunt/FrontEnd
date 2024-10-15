import React from "react";
import { VideoEmbedProps } from "../constants/types/video_embed.type";

export default function VideoEmbed({ url }: VideoEmbedProps) {
  let embedUrl = "";
  let type = "";

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    type = "youtube";
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop(); // Lấy video ID
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("tiktok.com")) {
    type = "tiktok";
    const videoId = url.split("/video/")[1]?.split("?")[0]; // Lấy video ID
    embedUrl = `https://www.tiktok.com/embed/${videoId}`;
  }

  return embedUrl ? (
    <div className="flex justify-center">
      {type === "youtube" ? (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={embedUrl}
            className=" top-0 left-0 w-full h-full"
            title={`${type} Video Embed`}
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>
      ) : (
        <div className="h-screen w-full">
          <iframe
            src={embedUrl}
            className="top-0 left-0 h-full w-full p-3 bg-white"
            title={`${type} Video Embed`}
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}
