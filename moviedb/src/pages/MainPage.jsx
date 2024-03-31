import Nav from "../components/Nav";
import MovieCard from "../components/MovieCard";
const MainPage = () => {
  return (
    <>
      <main className="bg-[#333333] h-screen">
        <MovieCard />
        <footer>
          <Nav />
        </footer>
      </main>
    </>
  );
};

export default MainPage;
