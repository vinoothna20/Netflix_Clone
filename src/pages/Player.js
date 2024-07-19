import React from "react";
import { BsArrowLeft } from "react-icons/bs";
// import video from "../assets/stranger_things_video.mp4";
import { useLocation, useNavigate } from "react-router-dom";

export default function Player() {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieData } = location.state || {};

  return (
    <div>
      <div className="w-screen h-screen">
        <div className="absolute top-0 left-0 p-4 md:p-8 z-[1]">
          <BsArrowLeft
            className="cursor-pointer text-2xl md:text-5xl"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          {movieData.videoUrl ? (
            <iframe
              className="h-full w-full object-cover"
              src={movieData.videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No video available for this movie.</p>
          )}
        </div>
      </div>
    </div>
  );
}
