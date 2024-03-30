import LogoAnimation from "../components/StartAnimation";
import { motion } from "framer-motion";

const ErrorPage = () => {
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
            Woops.. No movies to be seen here!
          </motion.p>
        </section>
      </main>
    </>
  );
};

export default ErrorPage;
