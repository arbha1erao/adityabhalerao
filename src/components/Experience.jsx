import { motion } from "framer-motion";

const Experience = () => {
    const experiences = [
        {
            company: "Diamanti",
            logo: "/diamanti.jpeg",
            role: "SDE Intern",
            duration: "Oct 2024 - July 2024",
            description: (
                <ul className="list-disc pl-5 text-gray-300">
                    <li className="mb-1">
                        <b>Spektra</b>: Fixed multiple bugs in React, enhancing the user experience.
                    </li>
                    <li className="mb-1">
                        <b>Ultimate Enterprise and Ultima Accelerator</b>: Addressed and resolved critical Kubernetes RBAC vulnerabilities.
                    </li>
                    <li className="mb-1">
                        <b>KubeVirt Integration</b>: Worked extensively with KubeVirt, which is implemented as a feature within Diamanti’s product suite.
                    </li>
                    <li className="mb-1">
                        <b>Certifications</b>: Completed the Certified Kubernetes Administrator (CKA) certification.
                    </li>
                </ul>
            ),
            link: "https://www.linkedin.com/company/diamanti/",
        },
        {
            company: "Geminus Tech",
            logo: "/geminus_tech.jpeg",
            role: "Software Engineer",
            duration: "Jul 2024 - Present",
            description: (
                <ul className="list-disc pl-5 text-gray-300">
                    <li className="mb-1">
                        <b>Backend Development</b>: Developing backend for <b>Pyro</b>, a system designed for companies involved in biochar production.
                    </li>
                    <li className="mb-1">
                        <b>API Maintenance</b>: Responsible for building, maintaining, and optimizing APIs in <b>Pyro</b> to support seamless integration with internal and external services.
                    </li>
                    <li className="mb-1">
                        <b>Authorization Model</b>: Implemented a robust authorization model in <b>Pyro</b>, ensuring secure access and role-based permissions across the platform.
                    </li>
                    <li className="mb-1">
                        <b>Organization Features</b>: Introduced organization features in <b>Pyro</b> for improved user management and data isolation within the platform.
                    </li>
                    <li className="mb-1">
                        <b>B2B Multitenancy</b>: Implemented B2B multitenancy in <b>Pyro</b>, ensuring that each company (tenant) has a fully isolated environment with tailored data and user access.
                    </li>
                    <li className="mb-1">
                        <b>Antaris Cloud Platform Integration</b>: Integrated various internal services within the <a href="https://www.antaris.space/platform" target="_blank" rel="noopener noreferrer" className="text-blue-500">Antaris Cloud Platform</a>, improving the platform’s service orchestration.
                    </li>
                </ul>
            ),
            link: "https://www.linkedin.com/company/geminus-tech/",
        },
        {
            company: "Geminus Space",
            logo: "/geminus_space.jpeg",
            role: "Software Engineer",
            duration: "Nov 2024 - Present",
            description: (
                <ul className="list-disc pl-5 text-gray-300">
                    <li className="mb-1">
                        <b>Strata Platform Development</b>: Working on the development and maintenance of <b>Strata</b>, a geodata management platform.
                    </li>
                </ul>
            ),
            link: "https://www.linkedin.com/company/geminus-space/",
        },
    ];

    return (
        <div id="experience" className="flex flex-col items-center min-h-[70vh] w-full px-8 py-16 md:px-16">
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-light text-white md:text-6xl mb-12"
            >
                Experience
            </motion.h1>

            <div className="flex flex-col gap-16">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
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
                            <p className="mt-4 text-gray-300">{exp.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default Experience;
