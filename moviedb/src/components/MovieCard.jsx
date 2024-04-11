import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MovieCard = ({ searchQuery }) => {
  // Accept searchQuery prop
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState({});

  // Fetch movies based on searchQuery
  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://movies-tv-shows-database.p.rapidapi.com/?s=${searchQuery}&page=1`; // Include search query in URL
      const options = {
        method: "GET",
        headers: {
          Type: "get-trending-movies",
          "X-RapidAPI-Key":
            "97ea01d342msh33c57ede8e2b362p1d4097jsn0fdbb96ba120",
          "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.movie_results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  // Fetch images for movies
  useEffect(() => {
    const fetchImagesForMovie = async (imdbID) => {
      const url = `https://movies-tv-shows-database.p.rapidapi.com/?movieid=${imdbID}`;
      const options = {
        method: "GET",
        headers: {
          Type: "get-movies-images-by-imdb",
          "X-RapidAPI-Key":
            "97ea01d342msh33c57ede8e2b362p1d4097jsn0fdbb96ba120",
          "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.status === "OK") {
          setImages((prevImages) => ({
            ...prevImages,
            [imdbID]: result.poster,
          }));
        } else {
          console.error("Error fetching image:", result.status_message);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    movies.forEach((movie) => {
      fetchImagesForMovie(movie.imdb_id);
    });
  }, [movies]);

  return (
    <>
      <main>
        <p className="font-bold text-xl text-white mx-4 pt-4">
          Upcoming movies
        </p>
        <div className="flex pt-4 overflow-x-scroll hiddenbar snap-x snap-mandatory h-[350px] overflow-y-hidden">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.imdb_id}`}
              key={movie.imdb_id}
              style={{ textDecoration: "none" }}
            >
              <motion.div whileTap={{ scale: 0.8 }}>
                <article className="flex-shrink-0 w-[340px] h-[300px] mx-4 relative">
                  <figure className="relative rounded-2xl h-full">
                    <img
                      src={images[movie.imdb_id]}
                      alt={`Poster of ${movie.title}`}
                      className="w-full h-full object-cover rounded-b-[48px] rounded-t-[48px]"
                    />
                    <figcaption className="absolute bottom-0 w-[85%] truncate overflow-hidden p-6 h-[96px] left-6 bg-[#41403E] top-[80%] text-white text-sm rounded-b-[48px] rounded-t-[48px]">
                      <p className="truncate">{movie.title}</p>
                      <p className="truncate">{movie.year}</p>
                    </figcaption>
                  </figure>
                </article>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default MovieCard;
