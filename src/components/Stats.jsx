import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import stats from "../data/statsData.js";

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const hours = payload[0].value;
    const hoursInt = Math.floor(hours);
    const minutes = Math.round((hours - hoursInt) * 60);

    if (hoursInt === 0 && minutes === 0) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p className="text-gray-300 font-medium">{label}</p>
          <p className="text-sky-400">no activity</p>
        </div>
      );
    }

    return (
      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
        <p className="text-gray-300 font-medium">{label}</p>
        <p className="text-sky-400">
          {hoursInt > 0 ? `${hoursInt} hrs` : null} {minutes > 0 ? `${minutes} mins` : null}
        </p>
      </div>
    );
  }

  return null;
};

// Stats component
const Stats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  useEffect(() => {
    const fetchWakaTimeStats = async () => {
      try {
        const response = await fetch(stats.codingActivityURL);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        const formattedData = result.data.map((entry) => ({
          date: new Date(entry.range.start).toLocaleString('en', { weekday: 'short' }),
          hours: (entry.grand_total.total_seconds / 3600).toFixed(2),
        }));

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        formattedData.push({
          date: tomorrow.toLocaleString('en', { weekday: 'short' }),
          hours: null,
        });

        setData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWakaTimeStats();
  }, []);

  if (loading) return <p className="text-gray-400 text-center">Loading stats...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div id="stats" className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <motion.h1
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="text-4xl font-light text-white md:text-6xl mb-12">
        Stats
        {/* <SuperscriptHelpIcon /> */}
      </motion.h1>

      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="text-lg text-gray-300 text-center mb-12">
        The stats displayed here are pulled directly from <a href="https://wakatime.com/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline"><b>WakaTime</b></a>, a tool that tracks your programming activity. These stats refresh every 24 hours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
        transition={{ duration: 0.4 }}
        className="bg-black/80 p-6 rounded-lg shadow-lg border border-gray-800 w-full max-w-4xl"
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          Coding Activity <span className="text-sm text-gray-400">(Last 7 Days)</span>
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9ca3af" }}
              tickMargin={12}
            />
            <YAxis
              tick={{ fill: "#9ca3af" }}
              domain={[0, 12]}
              tickMargin={12}
              label={{
                value: "hours",
                fill: "#9ca3af",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
                offset: 15
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="hours" stroke="#38bdf8" strokeWidth={2} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Stats;
