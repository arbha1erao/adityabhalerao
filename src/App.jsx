import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tech from "./components/Tech";
import Archive from "./components/Archive";
import Experience from "./components/Experience";
import ResearchPaperList from "./components/ResearchPaperList";
import TedTalksList from "./components/TedTalksList";

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
          path="/archive/research-papers"
          element={
            <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
              <ResearchPaperList />
            </main>
          }
        />
        <Route
          path="/archive/ted-talks"
          element={
            <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
              <TedTalksList />
            </main>
          }
        />
      </Routes>
    </Router>
  );
}
