import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MoviesCard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const moviesUrl =
        "https://movies-tv-shows-database.p.rapidapi.com/?page=3";
      const options = {
        method: "GET",
        headers: {
          Type: "get-upcoming-movies",
          "X-RapidAPI-Key":
            "97ea01d342msh33c57ede8e2b362p1d4097jsn0fdbb96ba120",
          "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(moviesUrl, options);
        const result = await response.json(); // Assuming the endpoint returns JSON
        const moviesData = result.movie_results;

        // Fetch movie images in parallel
        const imageFetchPromises = moviesData.map((movie) =>
          fetch(
            `https://movies-tv-shows-database.p.rapidapi.com/?movieid=${movie.imdb_id}`,
            {
              ...options,
              headers: {
                ...options.headers,
                Type: "get-movies-images-by-imdb",
              },
            }
          ).then((response) => response.json())
        );

        const imagesData = await Promise.all(imageFetchPromises);

        // Combine movies data with their images
        const combinedMoviesData = moviesData.map((movie, index) => ({
          ...movie,
          image: imagesData[index].poster, // Assuming that the 'poster' field contains the URL to the image
        }));

        setMovies(combinedMoviesData);
      } catch (error) {
        console.error("Failed to fetch upcoming movies or images", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <main>
      <div className="flex mx-4 gap-20 text-white mt-10">
        <p className="font-bold text-xl">Recommended movies</p>
        <a className="text-red-500">See All</a>
      </div>
      <div className="flex pt-4 hiddenbar overflow-x-scroll h-[350px] overflow-y-hidden">
        {movies.map((movie) => (
          <motion.div whileTap={{ scale: 0.8 }} key={movie.imdb_id}>
            <article className="flex-shrink-0 w-[200px] h-[300px] mx-4 relative">
              <figure className="relative rounded-2xl h-full">
                <img
                  src={movie.image}
                  alt={`Poster of ${movie.title}`}
                  className="w-full h-full object-cover rounded-b-[48px] rounded-t-[48px]"
                />
                <p className="truncate text-white text-center">{movie.title}</p>
              </figure>
            </article>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default MoviesCard;
