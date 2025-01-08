import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Tech from "./components/Tech";
import Corpus from "./components/Corpus";

export default function App() {
  return <>
    {/* Note(aditya): change background colour here */}
    <div class="fixed -z-10 min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#cbd5e1_100%)]"></div>

    <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
      <Navbar />
      <Hero />
      <Tech />
      <Projects />
      <Corpus />
      <Contact />
    </main>
  </>
}
