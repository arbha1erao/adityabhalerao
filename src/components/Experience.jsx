import { motion } from "framer-motion";
import experiences from "../data/experienceData";

const Experience = () => {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div id="experience" className="flex flex-col items-center w-full px-8 py-16 pt-36">
            <motion.h1
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                className="text-4xl font-light text-white md:text-6xl mb-12">
                Experience
            </motion.h1>

            <div className="flex flex-col gap-16">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.company}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
                        transition={{ duration: 0.4 }}
                        className="bg-black/80 p-6 rounded-lg shadow-lg border border-gray-800 flex items-center gap-6"
                    >
                        <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:block"
                        >
                            <img
                                src={exp.logo}
                                alt={`${exp.company} Logo`}
                                className="w-16 h-16 rounded-full object-cover shadow-md transition-all duration-300 hover:scale-110"
                            />
                        </a>

                        {/* Company Info */}
                        <div>
                            {/* Company Name (Visible as a link on small screens) */}
                            <a
                                href={exp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-semibold text-white md:text-2xl block sm:hidden hover:underline"
                            >
                                {exp.company}
                            </a>
                            <h2 className="text-xl font-semibold text-white md:text-2xl hidden sm:block">
                                {exp.company}
                            </h2>
                            <h3 className="text-lg text-gray-400">{exp.role}</h3>
                            <p className="text-sm text-gray-500">{exp.duration}</p>
                            <div className="mt-4 text-gray-300" dangerouslySetInnerHTML={{ __html: exp.description }}></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
