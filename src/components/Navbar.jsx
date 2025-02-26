import { useState, useEffect } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { useNavigateAndScroll } from "../hooks/useNavigateAndScroll";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const navigateAndScroll = useNavigateAndScroll();

    const menuOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path, section) => {
        navigateAndScroll(path, section);
        setActiveSection(section);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'tech', 'experience', 'oss', 'archive', 'stats', 'contact'];

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getNavItemClass = (section) => {
        const baseClasses = "cursor-pointer transition-all duration-300 flex items-center";

        if (section === activeSection) {
            return `${baseClasses} text-white opacity-100 font-medium transform scale-110`;
        }

        return `${baseClasses} opacity-70 hover:opacity-100`;
    };

    return (
        <nav className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-b-gray-700 bg-black/70 px-16 py-6 text-white backdrop-blur-md md:justify-evenly">
            <div onClick={() => handleNavigation("/", "hero")} className="cursor-pointer">
                <img src="/aditya.svg" alt="Aditya Logo" className="h-10 w-10" />
            </div>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-10 items-center">
                <li onClick={() => handleNavigation("/", "hero")} className={getNavItemClass("hero")}>Home</li>
                <li onClick={() => handleNavigation("/", "tech")} className={getNavItemClass("tech")}>Tech</li>
                <li onClick={() => handleNavigation("/", "experience")} className={getNavItemClass("experience")}>Experience</li>
                <li onClick={() => handleNavigation("/", "oss")} className={getNavItemClass("oss")}>OSS</li>
                <li onClick={() => handleNavigation("/", "archive")} className={getNavItemClass("archive")}>Archive</li>
                <li onClick={() => handleNavigation("/", "stats")} className={getNavItemClass("stats")}>Stats</li>
                <li onClick={() => handleNavigation("/", "contact")} className={getNavItemClass("contact")}>Contact</li>
            </ul>

            {/* Social Links */}
            <ul className="hidden md:flex gap-5">
                <li className="cursor-pointer text-xl opacity-70 transition-all duration-300 hover:text-orange-500 hover:opacity-100">
                    <a href="https://github.com/arbha1erao" target="_blank" rel="noopener noreferrer">
                        <BsGithub />
                    </a>
                </li>
                <li className="cursor-pointer text-xl opacity-70 transition-all duration-300 hover:text-blue-500 hover:opacity-100">
                    <a href="https://www.linkedin.com/in/bhalerao-aditya/" target="_blank" rel="noopener noreferrer">
                        <BsLinkedin />
                    </a>
                </li>
            </ul>

            {/* Mobile Menu Icon */}
            {isOpen ? (
                <BiX className="block md:hidden text-4xl" onClick={menuOpen} />
            ) : (
                <BiMenu className="block md:hidden text-4xl" onClick={menuOpen} />
            )}

            {/* Mobile Nav */}
            {isOpen && (
                <div className="fixed right-0 top-[84px] flex h-screen w-1/2 flex-col items-start justify-start gap-10 border-l border-gray-800 bg-black/90 p-12">
                    <ul className="flex flex-col gap-8">
                        <li onClick={() => { menuOpen(); handleNavigation("/", "hero"); }} className={getNavItemClass("hero")}>Home</li>
                        <li onClick={() => { menuOpen(); handleNavigation("/", "tech"); }} className={getNavItemClass("tech")}>Tech</li>
                        <li onClick={() => { menuOpen(); handleNavigation("/", "experience"); }} className={getNavItemClass("experience")}>Experience</li>
                        <li onClick={() => { menuOpen(); handleNavigation("/", "oss"); }} className={getNavItemClass("oss")}>OSS</li>
                        <li onClick={() => { menuOpen(); handleNavigation("/", "archive"); }} className={getNavItemClass("archive")}>Archive</li>
                        <li onClick={() => { menuOpen(); handleNavigation("/", "stats"); }} className={getNavItemClass("stats")}>Stats</li>
                        <li onClick={() => { menuOpen(); handleNavigation("/", "contact"); }} className={getNavItemClass("contact")}>Contact</li>
                    </ul>
                    <ul className="flex flex-wrap gap-5">
                        <li className="cursor-pointer text-xl opacity-70 transition-all duration-300 hover:text-orange-500 hover:opacity-100">
                            <a href="https://github.com/arbha1erao" target="_blank" rel="noopener noreferrer">
                                <BsGithub />
                            </a>
                        </li>
                        <li className="cursor-pointer text-xl opacity-70 transition-all duration-300 hover:text-blue-500 hover:opacity-100">
                            <a href="https://www.linkedin.com/in/bhalerao-aditya/" target="_blank" rel="noopener noreferrer">
                                <BsLinkedin />
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
