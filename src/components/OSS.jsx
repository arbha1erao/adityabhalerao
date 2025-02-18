import React from 'react';
import { motion } from 'framer-motion';

const contributions = [
  {
    title: "redis/rueidis",
    link: "https://github.com/redis/rueidis",
    summary: "A fast Golang Redis client that supports Client Side Caching, Auto Pipelining, Generics OM, RedisJSON, RedisBloom, RediSearch, etc.",
    prs: [
      { kind: "[PR]", title: "Implemented LCS (Longest Common Substring) Command", link: "https://github.com/redis/rueidis/pull/767" },
    ],
  },
  {
    title: "DiceDB/dice",
    link: "https://github.com/DiceDB/dice",
    summary: "DiceDB is an open-source in-memory database with query subscriptions.",
    prs: [
      { kind: "[PR]", title: "Add APPEND Command to DiceDB with Redis-like Behavior, Tests, and Benchmarking", link: "https://github.com/DiceDB/dice/pull/759" },
      { kind: "[Issue]", title: "Reported Inconsistent MSET Command Behavior", link: "https://github.com/DiceDB/dice/issues/516" },
    ],
  },
];

const OSS = () => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div id="oss" className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <motion.h1
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="text-4xl font-light text-white md:text-6xl mb-12">
        OSS Contributions
      </motion.h1>

      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="text-lg text-gray-300 text-center mb-12">
        Browse the <b>PRs</b> and <b>Issues</b> I've created in various open-source projects.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {contributions.map((contribution, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.4 }}
            className="bg-black/80 p-6 rounded-lg shadow-lg border border-gray-800 w-full"
          >
            <h2 className="text-xl font-semibold">
              <a
                href={contribution.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {contribution.title}
              </a>
            </h2>

            <p className="text-gray-400 mt-2 min-h-[48px]">
              {contribution.summary}
            </p>

            <ul className="mt-4 space-y-2">
              {contribution.prs.map((pr, prIndex) => (
                <li key={prIndex}>
                  <a
                    href={pr.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    ➜ <span className="text-gray-400">{pr.kind}</span> {pr.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OSS;
