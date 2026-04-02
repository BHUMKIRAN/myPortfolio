"use client";
import React, { useState } from "react";

const title = "MY RESUME";
const tag = "Professional Path";

// Your original data structure
const timelineData = {
    Education: [
        { year: "2015 - 2019", title: "BSc in Computer Science", description: "University of Technology - Focus on Software Engineering and Algorithms.", rating: "4.8/5" },
        { year: "2012 - 2015", title: "High School Diploma", description: "Science & Mathematics Stream - Graduated with Honors.", rating: "4.9/5" },
    ],
    Experience: [
        { year: "2023 - Present", title: "Senior Full-Stack Developer", description: "Tech Company XYZ - Leading the migration to Next.js and microservices architecture.", rating: "5.0/5" },
        { year: "2020 - 2023", title: "Frontend Developer", description: "Startup ABC - Specialized in building real-time dashboards and responsive UIs.", rating: "4.7/5" },
    ],
    Skills: [
        { year: "Expert", title: "React & Next.js", description: "Server components, state management, and performance optimization.", rating: "95%" },
        { year: "Advanced", title: "Node.js & Express", description: "Restful APIs, WebSocket integration, and database modeling.", rating: "90%" },
        { year: "Advanced", title: "Tailwind CSS", description: "Complex layouts, neumorphic design, and responsive systems.", rating: "92%" },
    ],
};

const Resume: React.FC = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof timelineData>("Education");

    // Helper to split your array into two columns for the UI layout
    const leftCol = timelineData[activeTab].filter((_, i) => i % 2 === 0);
    const rightCol = timelineData[activeTab].filter((_, i) => i % 2 !== 0);

    return (
        <section className="py-20 px-6" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-bold uppercase tracking-[4px] mb-2" style={{ color: 'var(--primary)' }}>{tag}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
                </div>

                {/* 1. Neumorphic Full-Width Tab Bar */}
                <div
                    className="flex w-full mb-20 p-2"
                    style={{
                        background: 'var(--bg)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-neo)'
                    }}
                >
                    {Object.keys(timelineData).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as keyof typeof timelineData)}
                            className="flex-1 py-5 rounded-xl font-bold transition-all duration-300 text-base md:text-lg"
                            style={{
                                color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                                background: activeTab === tab ? 'var(--bg)' : 'transparent',
                                boxShadow: activeTab === tab ? 'var(--shadow-neo)' : 'none'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 2. Double Column Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">

                    {[leftCol, rightCol].map((columnItems, colIdx) => (
                        <div key={colIdx} className="relative">

                            {/* Column Heading (Matches Image) */}
                            <div className="mb-12 ml-10">
                                <p className="text-[var(--primary)] font-bold mb-2">2012 - 2026</p>
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                                    {colIdx === 0 ? `${activeTab} Quality` : `${activeTab} History`}
                                </h2>
                            </div>

                            {/* Vertical Connecting Line */}
                            <div
                                className="absolute top-28 bottom-0 left-[7px] w-[2px] opacity-20"
                                style={{ background: 'var(--text-muted)' }}
                            />

                            {/* Timeline Items */}
                            {columnItems.map((item, index) => (
                                <div key={index} className="relative mb-12 ml-12 group">

                                    {/* The Joining Node (Circle on the line) */}
                                    <div
                                        className="absolute left-[-54px] top-10 w-5 h-5 rounded-full border-4 transition-all duration-300 group-hover:bg-[var(--primary)]"
                                        style={{
                                            background: 'var(--bg)',
                                            borderColor: 'rgba(0,0,0,0.1)',
                                            boxShadow: 'var(--shadow-neo)'
                                        }}
                                    />

                                    {/* The Content Card */}
                                    <div
                                        className="p-8 md:p-10 transition-all duration-300 hover:shadow-soft"
                                        style={{
                                            background: 'var(--bg)',
                                            borderRadius: 'var(--radius-lg)',
                                            boxShadow: 'var(--shadow-neo)',
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-[var(--text-muted)] mt-2 font-medium">
                                                    {item.year}
                                                </p>
                                            </div>

                                            {/* Rating/Score Badge */}
                                            <div
                                                className="px-3 py-1 rounded shadow-sm text-xs font-bold whitespace-nowrap"
                                                style={{
                                                    background: 'var(--bg)',
                                                    boxShadow: 'var(--shadow-neo)',
                                                    color: 'var(--primary)'
                                                }}
                                            >
                                                {item.rating || "N/A"}
                                            </div>
                                        </div>

                                        {/* Divider Line */}
                                        <div className="w-full h-[1px] bg-black/5 dark:bg-white/5 mb-6" />

                                        <p className="text-[var(--text-muted)] leading-relaxed text-sm md:text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            
        </section>
    );
};

export default Resume;