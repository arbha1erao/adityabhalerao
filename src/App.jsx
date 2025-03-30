import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from "./context/ThemeContext";

import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tech from "./components/Tech";
import Archive from "./components/Archive";
import Experience from "./components/Experience";
import TedTalksList from "./components/TedTalksList";
import Papershelf from "./components/Papershelf";
import Stats from "./components/Stats";
import OSS from "./components/OSS";
import ParticlesBackground from "./components/ParticlesBackground";


export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="fixed -z-20 min-h-screen w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-black dark:via-[#0a0a23] dark:to-[#111132]"></div>
        <ParticlesBackground />

        <Navbar />
        <Analytics />
        <Routes>
          <Route
            path="/"
            element={
              <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
                <Hero />
                <Tech />
                <Experience />
                <OSS />
                <Archive />
                <Stats />
                <Contact />
              </main>
            }
          />
          <Route
            path="/archive/papershelf"
            element={
              <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
                <Papershelf />
              </main>
            }
          />
          <Route
            path="/archive/tedtalks"
            element={
              <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
                <TedTalksList />
              </main>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
