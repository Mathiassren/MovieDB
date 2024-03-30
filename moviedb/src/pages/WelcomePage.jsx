import LogoAnimation from "../components/StartAnimation";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <>
      <main className="bg-[#EB2F3D] h-screen flex flex-col justify-between text-center">
        <section className="flex flex-col justify-center items-center flex-grow">
          <LogoAnimation />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn", delay: 2 }}
            className="text-white font-bold text-4xl"
          >
            Data Base
          </motion.p>
        </section>{" "}
        <motion.button
          className="font-bold bg-[#41403E] text-2xl text-white rounded-full p-2 w-3/4 self-center mb-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link to="/mainpage">
            <button>ENTER</button>
          </Link>
        </motion.button>
      </main>
    </>
  );
};

export default WelcomePage;
