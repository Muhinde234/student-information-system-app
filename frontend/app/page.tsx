"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9ec3c3] to-[#6da9a4] flex items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center p-10 rounded-2xl bg-white backdrop-blur-md shadow-2xl"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl text-black font-bold mb-4"
        >
          Welcome to the Portal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-6 text-lg text-black"
        >
          Your journey starts here.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <Link
            href="/login"
            className="inline-block px-6 py-3 border border-[#6da9a4] text-[#6da9a4] font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            Login to continue
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
