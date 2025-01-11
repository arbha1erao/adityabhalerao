import { useState } from "react"
import { BiMenu, BiX } from "react-icons/bi";
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { Link } from "react-router-dom";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const menuOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-b-gray-700 bg-black/70 px-16 py-6 text-white backdrop-blur-md md:justify-evenly">
            <Link to="/" className="transition-all duration-300 opacity-80 hover:opacity-100">
                <img src="/aditya.svg" alt="Aditya Logo" className="h-10 w-10" />
            </Link>

            <ul className="hidden md:flex gap-10">
                <Link to="/" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                    <li>Home</li>
                </Link>
                <Link to="/#tech" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                    <li>Tech</li>
                </Link>
                <Link to="/#experience" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                    <li>Experience</li>
                </Link>
                <Link to="/#archive" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                    <li>Archive</li>
                </Link>
                <Link to="/#contact" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                    <li>Contact</li>
                </Link>
            </ul>

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

            {isOpen ? (
                <BiX className="block md:hidden text-4xl" onClick={menuOpen} />
            ) : (
                <BiMenu className="block md:hidden text-4xl" onClick={menuOpen} />
            )}

            {isOpen && (
                <div className={`fixed right-0 top-[84px] flex h-screen w-1/2 flex-col items-start justify-start gap-10 border-l border-gray-800 bg-black/90 p-12 ${isOpen ? "block" : "hidden"}`}>
                    <ul className="flex flex-col gap-8">
                        <Link to="/" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                            <li>Home</li>
                        </Link>
                        <Link to="/#tech" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                            <li>Tech</li>
                        </Link>
                        <Link to="/#experience" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                            <li>Experience</li>
                        </Link>
                        <Link to="/#archive" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                            <li>Archive</li>
                        </Link>
                        <Link to="/#contact" className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100">
                            <li>Contact</li>
                        </Link>
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
    )
}

export default Navbar
