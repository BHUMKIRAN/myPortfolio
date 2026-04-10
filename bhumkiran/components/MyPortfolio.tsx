"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import Projects from "@/modal/Projects";
import getData from "@/service/Contentful";

const MyPortfolio: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const handleCardClick = (project: any) => {
        setSelectedProject(project);
        setIsOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getData();

                // Correct path from your Contentful JSON
                const portfolioSection =
                    res?.fields?.projects?.portfolioSection;

                setData(portfolioSection);
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <section className="py-20 text-center text-[var(--text-primary)]">
                Loading portfolio...
            </section>
        );
    }

    return (
        <section id="portfolio" className="py-20 px-6 bg-[var(--bg)]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-[var(--text-primary)]">
                        {data?.title}
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg leading-relaxed text-[var(--primary)]">
                        {data?.subtitle}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data?.projects?.map((project: any) => (
                        <div
                            key={project.id}
                            className="group bg-[var(--surface)] p-6 transition-all duration-300 ease-in-out cursor-pointer"
                            style={{
                                borderRadius: "var(--radius-lg)",
                                boxShadow: "var(--shadow-neo)",
                            }}
                        >
                            <div className="overflow-hidden rounded-xl mb-6">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[var(--primary)]">
                                {project.category}
                            </p>

                            <h3 className="text-xl font-bold mb-3 transition-colors group-hover:text-[var(--primary)] text-[var(--text-primary)]">
                                {project.title}
                            </h3>

                            <p className="text-sm leading-relaxed mb-6 text-[var(--text-muted)]">
                                {project.description}
                            </p>

                            <button
                                className="btn-neumorphic w-full gap-2"
                                onClick={() => handleCardClick(project)}
                            >
                                View Project{" "}
                                <ExternalLink size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isOpen && selectedProject && (
                <Projects
                    data={selectedProject}
                    setOpen={setIsOpen}
                />
            )}
        </section>
    );
};

export default MyPortfolio;