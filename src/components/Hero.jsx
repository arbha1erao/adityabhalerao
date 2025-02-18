import { motion } from "framer-motion";
import { MapPin, Clock, ChevronDown } from "lucide-react";

const Hero = () => {
    const currentTime = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
    });

    const navigateAndScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div id="hero" className="px-16 flex min-h-screen w-full items-center justify-center py-28 md:px-32 relative">
            <div className="flex flex-col items-center justify-center gap-10 text-white">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src="/aditya.png" alt="Aditya" className="w-[300px] cursor-pointer rounded-full shadow-xl shadow-indigo-900 transition-all duration-300 hover:-translate-y-5 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-600 md:w-[350px]" />
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex max-w-[600px] flex-col items-center justify-center gap-3 text-center">
                    <h1 className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent text-5xl font-light md:text-7xl">
                        Aditya Bhalerao
                    </h1>
                    <h3 className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent text-2xl md:text-3xl">
                        Software Engineer
                    </h3>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-lg text-gray-300">
                        <span className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-400" />
                            Pune, MH, India
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-pink-400" />
                            {currentTime} IST
                        </span>
                    </div>

                    <p className="mt-4 md:text-base text-pretty text-sm text-gray-400">
                        I'm a Software Engineer with a focus on backend development, passionate about building scalable, efficient, and reliable systems.
                        <br /><br />
                        I specialize in crafting APIs, managing databases, and optimizing server-side performance to deliver seamless user experiences.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 flex-col items-center cursor-pointer hidden sm:flex"
                onClick={() => navigateAndScroll("tech")}
                initial={{ y: 10, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
                <ChevronDown className="h-10 w-10 text-gray-300 animate-bounce stroke-[2.5]" />
            </motion.div>
        </div>
    );
};

export default Hero;
