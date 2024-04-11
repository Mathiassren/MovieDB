import Nav from "../components/Nav";
import MovieCard from "../components/MovieCard";
import UpComingMovies from "../components/UpComingMovies";
import Login from "../components/Login";
const MainPage = () => {
  return (
    <>
      <main className="bg-black pb-24">
        <header>
          <Login />
        </header>
        <MovieCard />
        <UpComingMovies />
        <section></section>
        <footer>
          <Nav />
        </footer>
      </main>
    </>
  );
};

export default MainPage;
