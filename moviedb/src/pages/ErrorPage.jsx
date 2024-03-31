import LogoAnimation from "../assets/ErrorAnimation";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <main className="bg-[#121011] h-screen flex flex-col justify-between text-center">
        <section className="flex flex-col justify-center items-center flex-grow">
          <LogoAnimation />
          <p className="text-white w-3/4 font-bold text-4xl">
            {" "}
            Woops..
            <br /> No movies to be seen here!
          </p>
          <motion.button
            className="font-bold bg-[#41403E] text-2xl mt-4 text-white rounded-full p-2 w-3/4 self-center mb-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button onClick={goBack}>Get back here</button>
          </motion.button>
        </section>
      </main>
    </>
  );
};

export default ErrorPage;
