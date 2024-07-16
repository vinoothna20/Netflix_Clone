import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // console.log(movies);
  return (
    <div className="container bg-black">
      <Navbar isScrolled={isScrolled} movies={movies} />
      <div className="relative">
        <img
          src={backgroundImage}
          alt="background"
          className="brightness-50 h-screen w-full object-cover"
        />
        <div className="absolute bottom-28 xl:bottom-36 left-5 md:left-20 flex flex-col items-start gap-4 md:gap-8">
          <img src={MovieLogo} alt="Movie Logo" className="w-3/4 md:w-auto" />
          <div className="flex gap-4 md:gap-8">
            <button
              className="flex justify-center items-center text-base md:text-2xl gap-2 md:gap-4 rounded-sm p-2 md:pl-8 md:pr-10 cursor-pointer transition duration-75 ease-in-out hover:opacity-80 bg-white text-black"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className="flex justify-center items-center text-base md:text-2xl gap-2 md:gap-4 rounded-sm p-2 md:pl-8 md:pr-10 cursor-pointer transition duration-75 ease-in-out hover:opacity-80 bg-[#6d6d6eb3] text-white">
              <AiOutlineInfoCircle className="text-lg md:text-3xl" /> More Info
            </button>
          </div>
        </div>
      </div>
      <div className="pb-14">
        <Slider movies={movies} />
      </div>
    </div>
  );
}
