import Nav from "../components/Nav";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaAngleLeft, FaSearch } from "react-icons/fa";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState({}); // State to store images
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery) return; // Don't fetch if searchQuery is empty
      setIsLoading(true);
      const url = `https://movies-tv-shows-database.p.rapidapi.com/?s=${searchQuery}&page=1`; // Adjusted URL to include search
      const options = {
        method: "GET",
        headers: {
          Type: "get-trending-movies", // Make sure this header is correct for searching
          "X-RapidAPI-Key":
            "97ea01d342msh33c57ede8e2b362p1d4097jsn0fdbb96ba120",
          "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.movie_results || []); // Fallback to empty array if undefined
        setError(""); // Clear previous errors
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies");
      }
      setIsLoading(false);
    };

    fetchMovies();
  }, [searchQuery]);

  useEffect(() => {
    const fetchImagesForMovies = async () => {
      await Promise.all(
        movies.map(async (movie) => {
          try {
            const url = `https://movies-tv-shows-database.p.rapidapi.com/?movieid=${movie.imdb_id}`;
            const options = {
              method: "GET",
              headers: {
                Type: "get-movies-images-by-imdb", // Ensure this header is correct
                "X-RapidAPI-Key":
                  "97ea01d342msh33c57ede8e2b362p1d4097jsn0fdbb96ba120",
                "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
              },
            };
            const response = await fetch(url, options);
            const result = await response.json();
            if (result.status === "OK") {
              setImages((prevImages) => ({
                ...prevImages,
                [movie.imdb_id]: result.poster,
              }));
            } else {
              console.error("Error fetching image:", result.status_message);
            }
          } catch (error) {
            console.error(
              "Error fetching image for movie ID:",
              movie.imdb_id,
              error
            );
          }
        })
      );
    };

    if (movies.length > 0) {
      fetchImagesForMovies();
    }
  }, [movies]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <main className=" text-white bg-black h-screen pb-24">
        <div className="flex mx-4 pt-4 items-center">
          <div className="bg-[#41403E] mr-4 rounded-full p-2">
            <FaAngleLeft onClick={goBack} />
          </div>

          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-white" />
            </div>
            <input
              className="pl-12 pr-3 w-full rounded-full bg-[#41403E] py-2"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        {searchQuery && (
          <div className="bg-black">
            {isLoading ? (
              <p>Loading movies...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="flex pt-4 overflow-x-scroll snap-x h-[700px] snap-mandatory overflow-y-hidden">
                {filteredMovies.map((movie) => (
                  <motion.div whileTap={{ scale: 0.8 }} key={movie.imdb_id}>
                    <article className="flex-shrink-0 w-[380px] mx-4 relative">
                      <figure className="relative rounded-2xl">
                        <img
                          src={images[movie.imdb_id]}
                          alt={`Poster of ${movie.title}`}
                          className=" rounded-b-[48px] rounded-t-[48px]"
                        />
                        <figcaption className="absolute bottom-0 w-[90%] p-6 h-[96px] left-5 bg-[#41403E] top-[90%] text-white text-sm rounded-b-[48px] rounded-t-[48px]">
                          <p className="truncate">{movie.title}</p>
                          <p className="truncate">{movie.year}</p>
                        </figcaption>
                      </figure>
                    </article>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Nav />
    </>
  );
};

export default Search;
