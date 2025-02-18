import { motion } from "framer-motion";
import tech from "../data/techData.js";

const Tech = () => {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div id="tech" className="flex flex-col items-center w-full px-8 py-16 pt-36">
            <motion.h1
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                className="text-4xl font-light text-white md:text-6xl mb-12">
                Tech
            </motion.h1>

            <motion.p
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                className="text-lg text-gray-300 text-center mb-12">
                Technologies I work with daily – from programming languages and frameworks to containerization tools, databases and cloud services.
            </motion.p>

            <div className="flex flex-wrap items-center justify-center gap-10 p-5">
                {tech.map((tech, index) => (
                    <motion.div
                        key={index}
                        variants={variants}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.5 }}>
                        <a href={tech.link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={tech.image}
                                alt={tech.name}
                                className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                            />
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Tech;
