import React, { useState } from "react";
import { Heart, ThumbsUp, X } from "lucide-react";

interface ProjectsProps {
    data: {
        title: string;
        category: string;
        description: string;
        image: string;
        link: string;
        github: string; // ✅ FIXED (camelCase)
    };
    setOpen: (open: boolean) => void;
}

const Projects: React.FC<ProjectsProps> = ({ data, setOpen }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleLike = () => {
        if (liked) return; // ✅ prevents multiple likes
        setLiked(true);
        setLikeCount(1);
    };

    const handleClose = () => setOpen(false);

    const handleView = () => {
        window.open(data.link, "_blank");
    };

    const handlePDF = () => {
        if (data.github) {
            window.open(data.github, "_blank");
        } else {
            alert("No PDF available");
        }
    };

    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            {/* Modal Card */}
            <div
                className="relative w-full max-w-4xl overflow-hidden"
                style={{
                    background: "var(--bg)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-soft)",
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-8 pb-4">
                    <div>
                        <p
                            className="text-xs font-bold uppercase tracking-widest mb-1"
                            style={{ color: "var(--primary)" }}
                        >
                            Project Details
                        </p>
                        <h2
                            className="text-3xl font-extrabold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {data.title}
                        </h2>
                    </div>

                    <button
                        onClick={handleClose}
                        className="w-12 h-12 flex items-center cursor-pointer justify-center"
                        style={{
                            background: "var(--bg)",
                            borderRadius: "50%",
                           
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 pt-4">
                    {/* Image */}
                    <div
                        className="p-3"
                        style={{
                            background: "var(--bg)",
                            borderRadius: "var(--radius-md)",
                            boxShadow:
                                "inset 6px 6px 12px rgba(0,0,0,0.05), inset -6px -6px 12px rgba(255,255,255,0.8)",
                        }}
                    >
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-full min-h-[300px] object-cover rounded-lg"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between py-2">
                        <div>
                            <div
                                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                                style={{
                                    background: "var(--bg)",
                                    boxShadow: "var(--shadow-neo)",
                                    color: "var(--text-muted)",
                                }}
                            >
                                {data.category}
                            </div>

                            <p
                                className="text-lg leading-relaxed mb-6"
                                style={{ color: "var(--text-muted)" }}
                            >
                                {data.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex gap-4 flex-wrap">
                            {/* Like Button */}
                            <button
                                onClick={handleLike}
                                className="flex gap-4 cursor-pointer px-4 py-2"
                            
                            >
                                {liked ? <Heart/> : <ThumbsUp/>} <span>{likeCount}</span>
                            </button>

                            {/* View Project */}
                            <button
                                onClick={handleView}
                                className="btn-neumorphic px-4 py-2"
                            >
                                View Project
                            </button>

                            {/* PDF Button (FIXED) */}
                            {data.github && (
                                <button
                                    onClick={handlePDF}
                                    className="btn-neumorphic px-4 py-2"
                                >
                                    Github
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={handleClose}
            />
        </div>
    );
};

export default Projects;