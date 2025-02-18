import { motion } from "framer-motion";

const Tech = () => {

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div id="tech" className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-16 md:gap-32">
            <motion.h1
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                className="text-4xl font-light text-white md:text-6xl">
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
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}>
                    <a href="https://golang.org" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/golang.svg"
                            alt="GoLang"
                            className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </a>
                </motion.div>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}>
                    <a href="https://www.python.org" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/python.svg"
                            alt="Python"
                            className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </a>
                </motion.div>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}>
                    <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/fastapi.svg"
                            alt="FastAPI"
                            className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </a>
                </motion.div>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}>
                    <a href="https://www.docker.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/docker.svg"
                            alt="Docker"
                            className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </a>
                </motion.div>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}>
                    <a href="https://kubernetes.io" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/kubernetes.svg"
                            alt="Kubernetes"
                            className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </a>
                </motion.div>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}>
                    <a href="https://www.postgresql.org" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/postgresql.svg"
                            alt="PostgreSQL"
                            className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </a>
                </motion.div>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}>
                    <a href="https://www.mongodb.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/mongodb.svg"
                            alt="MongoDB"
                            className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </a>
                </motion.div>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}>
                    <a href="https://cloud.google.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/googlecloud.svg"
                            alt="Google Cloud"
                            className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </a>
                </motion.div>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}>
                    <a href="https://www.keycloak.org" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/keycloak.svg"
                            alt="Keycloak"
                            className="cursor-pointer transition-all duration-300 hover:-translate-y-5 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default Tech;
