"use client";
import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import Projects from "@/modal/Projects"; // your modal component

const title = "MY PORTFOLIO";
const subtitle =
    "Here are some of my projects that showcase my skills and expertise in various technologies. Each project reflects my commitment to delivering high-quality solutions.";

const projectsData = [
    {
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format",
        category: "Mobile",
        title: "Fitness Tracker App",
        description: "A mobile application that helps users track workouts, calories, and daily fitness goals.",
        link: "#",
        projectpdf: "/pdfs/fitness-tracker.pdf",
    },
    {
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&auto=format",
        category: "Web",
        title: "E-commerce Platform",
        description: "A full-stack e-commerce web application with product listing and secure checkout.",
        link: "#",
        projectpdf: "/pdfs/ecommerce-platform.pdf",
    },
    {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format",
        category: "UI/UX",
        title: "Dashboard Design",
        description: "A modern admin dashboard UI with analytics, charts, and user management features.",
        link: "/",
        projectpdf: "/pdfs/dashboard-design.pdf",
    },
    {
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&auto=format",
        category: "Mobile",
        title: "Task Manager App",
        description: "A productivity mobile app that allows users to organize their daily workflow.",
        link: "#",
        projectpdf: "/pdfs/task-manager.pdf",
    },
    {
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format",
        category: "Web",
        title: "Portfolio Website",
        description: "A responsive personal portfolio website showcasing projects and skills.",
        link: "#",
        projectpdf: "/pdfs/portfolio-website.pdf",
    },
    {
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format",
        category: "Full Stack",
        title: "Blog Platform",
        description: "A full-stack blogging platform with authentication and content management.",
        link: "#",
        projectpdf: "/pdfs/blog-platform.pdf",
    },
];

const MyPortfolio: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleCardClick = (project: any) => {
        setSelectedProject(project);
        setIsOpen(true);
    };

    return (
        <section id="portfolio" className="py-20 px-6 bg-[var(--bg)]">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-[var(--text-primary)]">
                        {title}
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg leading-relaxed text-[var(--primary)]">
                        {subtitle}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projectsData.map((project, index) => (
                        <div
                            key={index}
                            className="group bg-[var(--surface)]  p-6 transition-all duration-300 ease-in-out cursor-pointer"
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
                                View Project <ExternalLink size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isOpen && selectedProject && (
                <Projects data={selectedProject} setOpen={setIsOpen} />
            )}
        </section>
    );
};

export default MyPortfolio;