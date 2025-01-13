import { motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
}

export default function ContactSection() {
    return (
        <div id="contact" className="flex min-h-screen min-w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-8 p-14">
                <motion.h1
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}
                    className="text-center text-5xl md:text-7xl"
                >
                    <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                        Let's Connect!
                    </span>
                </motion.h1>
                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center space-y-8 text-center"
                >
                    <p className="text-lg text-gray-500 font-semibold">
                        I'm always open to new opportunities, collaborations, or just a friendly chat! Drop me a message and I'll get back to you as soon as I can.
                    </p>
                    <a
                        href="mailto:adityab7968@gmail.com"
                        className="text-nowrap rounded-lg border border-indigo-600 bg-black px-5 py-3 text-lg font-bold text-white shadow-lg shadow-indigo-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-600"
                    >
                        Reach Out Now
                    </a>
                </motion.div>
            </div>
        </div>
    );
}