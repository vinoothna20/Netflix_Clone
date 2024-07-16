import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { onAuthStateChanged } from "firebase/auth";
import SelectGenres from "../components/SelectGenres";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movies" }));
  }, [genresLoaded, dispatch]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });

  return (
    <div>
      <div>
        <Navbar isScrolled={isScrolled} movies={movies} />
      </div>
      <div className="mt-24 md:mt-32">
        <SelectGenres genres={genres} type="movie" />
        {movies.length ? (
          <div className="pb-14">
            <Slider movies={movies} />
          </div>
        ) : (
          <NotAvailable />
        )}
      </div>
    </div>
  );
}
