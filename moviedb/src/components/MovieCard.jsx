import { useState, useEffect } from "react";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const url =
        "https://movies-tv-shows-database.p.rapidapi.com/?movieid=tt1375666";
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
        // Assuming the API returns a single movie object. If it's an array, adjust accordingly.
        setMovies([result]); // Wrap result in an array
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <main>
        <div className="px-8">
          {movies.map((movie) => (
            <article
              key={movie.imdb_id}
              className="flex-shrink-0 w-full h-[279px] relative mb-8"
            >
              <figure className="relative rounded-2xl h-full">
                <img
                  src={movie.poster}
                  alt={`Poster of ${movie.title}`}
                  className="w-full h-full object-cover rounded-b-[48px] rounded-t-[48px]"
                />
                <figcaption className="absolute bottom-0 w-[90%] p-6 h-[96px] left-4 bg-[#41403E] top-[75%] text-white text-sm rounded-b-[48px] rounded-t-[48px]">
                  <p>{movie.title}</p>
                  <p>{movie.year}</p>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

export default MovieCard;
