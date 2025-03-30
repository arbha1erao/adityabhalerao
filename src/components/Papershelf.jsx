import React from 'react';
import { motion } from 'framer-motion';
import papers from '../data/papershelfData';
import { useTheme } from '../context/ThemeContext';

const Papershelf = () => {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <h1 className="section-title">
        Papershelf
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {papers.map((paper, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100/80 dark:bg-black/80 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-full"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{paper.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{paper.summary}</p>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline mt-4 inline-block"
            >
              Read Paper
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Papershelf;
