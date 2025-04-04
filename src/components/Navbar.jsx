import { useState, useEffect } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { useNavigateAndScroll } from "../hooks/useNavigateAndScroll";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const navigateAndScroll = useNavigateAndScroll();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark') ||
                (localStorage.getItem('theme') === 'dark');
            setIsDarkMode(isDark);
        };

        setMounted(true);
        checkDarkMode();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

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
            let largestVisibleSection = null;
            let maxVisibleHeight = 0;

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

                    if (visibleHeight > maxVisibleHeight) {
                        maxVisibleHeight = visibleHeight;
                        largestVisibleSection = section;
                    }
                }
            });

            if (largestVisibleSection && largestVisibleSection !== activeSection) {
                setActiveSection(largestVisibleSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);


    const getNavItemClass = (section) => {
        const baseClasses = "cursor-pointer transition-all duration-300 flex items-center";

        if (section === activeSection) {
            return `${baseClasses} text-gray-900 dark:text-white opacity-100 font-medium transform scale-125`;
        }

        return `${baseClasses} text-gray-700 dark:text-white opacity-70 hover:opacity-100`;
    };

    const logoSrc = isDarkMode ? "/aditya-logo-light.svg" : "/aditya-logo-dark.svg";

    return (
        <nav className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-gray-300 dark:border-gray-700 bg-gray-100/70 dark:bg-black/70 px-16 py-6 text-gray-900 dark:text-white backdrop-blur-md md:justify-evenly">
            <div onClick={() => handleNavigation("/", "hero")} className="cursor-pointer">
                {mounted && (
                    <img src={logoSrc} alt="Aditya Logo" className="h-10 w-10" />
                )}
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

            {/* Social Links and Theme Toggle */}
            <ul className="hidden md:flex gap-5 items-center">
                <li className="cursor-pointer opacity-70 transition-all duration-300 hover:text-orange-500 hover:opacity-100">
                    <a href="https://github.com/arbha1erao" target="_blank" rel="noopener noreferrer">
                        <BsGithub className="text-xl text-gray-800 dark:text-white" />
                    </a>
                </li>
                <li className="cursor-pointer opacity-70 transition-all duration-300 hover:text-blue-500 hover:opacity-100">
                    <a href="https://www.linkedin.com/in/bhalerao-aditya/" target="_blank" rel="noopener noreferrer">
                        <BsLinkedin className="text-xl text-gray-800 dark:text-white" />
                    </a>
                </li>
                <li>
                    <ThemeToggle />
                </li>
            </ul>

            {/* Mobile Menu Icon */}
            {isOpen ? (
                <div className="flex items-center md:hidden">
                    <ThemeToggle />
                    <BiX className="block md:hidden text-4xl text-gray-800 dark:text-white" onClick={menuOpen} />
                </div>
            ) : (
                <div className="flex items-center md:hidden">
                    <ThemeToggle />
                    <BiMenu className="block md:hidden text-4xl text-gray-800 dark:text-white" onClick={menuOpen} />
                </div>
            )}

            {/* Mobile Nav */}
            {isOpen && (
                <div className="fixed right-0 top-[84px] flex h-screen w-1/2 flex-col items-start justify-start gap-10 border-l border-gray-300 dark:border-gray-800 bg-gray-100/90 dark:bg-black/90 p-12">
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
                                <BsGithub className="text-gray-800 dark:text-white" />
                            </a>
                        </li>
                        <li className="cursor-pointer text-xl opacity-70 transition-all duration-300 hover:text-blue-500 hover:opacity-100">
                            <a href="https://www.linkedin.com/in/bhalerao-aditya/" target="_blank" rel="noopener noreferrer">
                                <BsLinkedin className="text-gray-800 dark:text-white" />
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
