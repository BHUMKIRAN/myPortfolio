import React, { useState } from "react";
import { ThumbsUp, ExternalLink, X } from "lucide-react";

interface ProjectsProps {
    data: {
        title: string;
        category: string;
        description: string;
        image: string;
        link: string;
        projectpdf: string;
    };
    setOpen: (open: boolean) => void;
}

const Projects: React.FC<ProjectsProps> = ({ data, setOpen }) => {
    const [likeCount, setLikeCount] = useState(0);

    const handleLike = () => setLikeCount(likeCount + 1);
    const handleClose = () => setOpen(false);
    const handleView = () => window.open(data.link, "_blank");
    const handlePDF = () => window.open(data.projectpdf, "_blank");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            {/* Main Modal Card */}
            <div
                className="relative w-full max-w-4xl overflow-hidden transition-all"
                style={{
                    background: 'var(--bg)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-soft)', // Using the larger soft shadow for the modal
                }}
            >
                {/* Header Section */}
                <div className="flex justify-between items-center p-8 pb-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--primary)' }}>
                            Project Details
                        </p>
                        <h2 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                            {data.title}
                        </h2>
                    </div>

                    {/* Neumorphic Close Button */}
                    <button
                        onClick={handleClose}
                        className="group flex items-center justify-center w-12 h-12 transition-all duration-200"
                        style={{
                            background: 'var(--bg)',
                            borderRadius: '50%',
                            boxShadow: 'var(--shadow-neo)',
                        }}
                    >
                        <X size={20} className="transition-colors group-hover:text-[var(--primary)]" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 pt-4">

                    {/* Image with Inset Frame */}
                    <div
                        className="p-3"
                        style={{
                            background: 'var(--bg)',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'inset 6px 6px 12px rgba(0,0,0,0.05), inset -6px -6px 12px rgba(255,255,255,0.8)'
                        }}
                    >
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-full min-h-[300px] object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col justify-between py-2">
                        <div>
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                                style={{
                                    background: 'var(--bg)',
                                    boxShadow: 'var(--shadow-neo)',
                                    color: 'var(--text-muted)'
                                }}>
                                {data.category}
                            </div>

                            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                                {data.description}
                            </p>
                        </div>

                        {/* Actions Section */}
                        <div className="mt-4 flex gap-4 ">
                            <button
                                onClick={handleLike}
                                className="btn-neumorphic px-4 py-2"
                            >
                                👍 Like ({likeCount})
                            </button>
                            <button
                                onClick={handleView}
                                className="btn-neumorphic px-4 py-2"
                            >
                                View Project
                            </button>

                            {data.projectpdf && (
                                <button
                                    onClick={handlePDF}
                                    className="btn-neumorphic px-4 py-2"
                                >
                                    View PDF
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Click to Close */}
            <div className="absolute inset-0 -z-10" onClick={handleClose} />
        </div>
    );
};

export default Projects;