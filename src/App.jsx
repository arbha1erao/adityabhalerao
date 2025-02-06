import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tech from "./components/Tech";
import Archive from "./components/Archive";
import Experience from "./components/Experience";
import TedTalksList from "./components/TedTalksList";
import Papershelf from "./components/Papershelf";
import WakaTimeStats from "./components/WakaTimeStats";

export default function App() {
  return (
    <Router>
      <div className="fixed -z-10 min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
              <Hero />
              <Tech />
              <Experience />
              <Archive />
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
        <Route
          path="/wakatime"
          element={
            <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
              <WakaTimeStats />
            </main>
          }
        />
      </Routes>
    </Router>
  );
}
