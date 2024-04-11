import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { movieId } = useParams(); // Retrieve the movie ID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://movies-tv-shows-database.p.rapidapi.com/?movieid=${movieId}`;
      const options = {
        method: "GET",
        headers: {
          Type: "get-movie-details",
          "X-RapidAPI-Key":
            "97ea01d342msh33c57ede8e2b362p1d4097jsn0fdbb96ba120",
          "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Failed to fetch movie details.");
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]); // Rerun the effect if the movieId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Display movie details */}
      <h1>{movieDetails.title}</h1>
      {/* Example details: you might want to check your API response structure to adjust these */}
      <p>Year: {movieDetails.year}</p>
      <p>Genre: {movieDetails.genre}</p>
      <img src={movieDetails.poster} alt={`Poster of ${movieDetails.title}`} />
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieDetails;
