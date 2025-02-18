import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { useNavigateAndScroll } from "../hooks/useNavigateAndScroll";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigateAndScroll = useNavigateAndScroll();

    const menuOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-b-gray-700 bg-black/70 px-16 py-6 text-white backdrop-blur-md md:justify-evenly">
            <div onClick={() => navigateAndScroll("/", "hero")} className="cursor-pointer">
                <img src="/aditya.svg" alt="Aditya Logo" className="h-10 w-10" />
            </div>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-10">
                <li onClick={() => navigateAndScroll("/", "hero")} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Home</li>
                <li onClick={() => navigateAndScroll("/", "tech")} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Tech</li>
                <li onClick={() => navigateAndScroll("/", "experience")} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Experience</li>
                <li onClick={() => navigateAndScroll("/", "oss")} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">OSS</li>
                <li onClick={() => navigateAndScroll("/", "archive")} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Archive</li>
                <li onClick={() => navigateAndScroll("/", "stats")} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Stats</li>
                <li onClick={() => navigateAndScroll("/", "contact")} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Contact</li>
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
                        <li onClick={() => { menuOpen(); navigateAndScroll("/", "hero"); }} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Home</li>
                        <li onClick={() => { menuOpen(); navigateAndScroll("/", "tech"); }} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Tech</li>
                        <li onClick={() => { menuOpen(); navigateAndScroll("/", "experience"); }} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Experience</li>
                        <li onClick={() => { menuOpen(); navigateAndScroll("/", "oss"); }} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">OSS</li>
                        <li onClick={() => { menuOpen(); navigateAndScroll("/", "archive"); }} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Archive</li>
                        <li onClick={() => { menuOpen(); navigateAndScroll("/", "stats"); }} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Stats</li>
                        <li onClick={() => { menuOpen(); navigateAndScroll("/", "contact"); }} className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">Contact</li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
