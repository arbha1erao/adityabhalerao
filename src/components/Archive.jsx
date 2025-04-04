import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function Archive() {
  const { theme } = useTheme();
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div id="archive" className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <div className="title-container">
        <motion.h1
          variants={variants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          className="section-title">
          Archive
        </motion.h1>
      </div>

      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
        Browse through resources that have inspired and expanded my understanding.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <Link to="/archive/papershelf">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100/80 dark:bg-black/80 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-full"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">Papershelf</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
              Explore the collection of papers I've read.
            </p>
          </motion.div>
        </Link>

        <Link to="/archive/tedtalks">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100/80 dark:bg-black/80 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-full"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">TED Talks</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
              Check out some of my favorite TED talks.
            </p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default Archive;
