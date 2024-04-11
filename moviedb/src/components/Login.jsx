import { FiHome, FiSearch, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <>
      <main className="flex justify-between items-center w-full">
        <div className="flex flex-col mx-4 pt-4">
          <p className="text-white font-bold">Hey, Mathias</p>
          <p className="text-red-500">List of movies</p>
        </div>
        <div className="flex space-x-4 mr-4">
          <motion.div whileTap={{ scale: 0.8 }}>
            {" "}
            <div className="bg-[#41403E] items-center flex justify-center w-[40px] h-[40px] rounded-full text-white">
              <FiSearch />
            </div>
          </motion.div>

          <motion.div whileTap={{ scale: 0.8 }}>
            {" "}
            <div className="bg-[#41403E] items-center flex justify-center w-[40px] h-[40px] rounded-full text-white">
              <FiHome />
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Login;
