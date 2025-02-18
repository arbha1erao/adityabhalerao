import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { FiHelpCircle } from "react-icons/fi";

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

const WakaTimeStats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchWakaTimeStats = async () => {
      try {
        const response = await fetch(
          "https://wakatime.com/share/@a4d66bd6-2941-42ae-8ac6-d23ccbe7cd5c/5202b3f7-1334-4fec-aa2f-6d0bc6f33f3e.json"
        );

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".help-tooltip")) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showTooltip]);

  if (loading) return <p className="text-gray-400 text-center">Loading WakaTime stats...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <h1 className="text-4xl font-light text-white md:text-6xl mb-12">
        WakaTime Stats
      </h1>

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

      {/* Help Icon and Tooltip */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowTooltip((prev) => !prev)}
          className="cursor-pointer text-white help-tooltip"
        >
          <FiHelpCircle size={28} />
        </motion.div>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 right-0 w-64 bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-xl help-tooltip"
          >
            <p className="text-gray-300 text-sm mb-2">
              The stats displayed here are pulled directly from WakaTime, a tool that tracks your programming activity.
            </p>
            <p className="text-gray-300 text-sm">
              These stats refresh every 24 hours.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WakaTimeStats;
