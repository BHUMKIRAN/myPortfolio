import React from 'react';
import {
    Smartphone,
    Globe,
    Layout,
    Database,
    Zap,
    Cpu
} from 'lucide-react';

const featuresData = [
    {
        icon: <Smartphone size={40} />,
        title: "App Development",
        description: "I create mobile applications that are not only visually appealing but also highly functional and user-friendly."
    },
    {
        icon: <Globe size={40} />,
        title: "Web Development",
        description: "I build modern, responsive websites using the latest technologies. My goal is to create fast, scalable web apps."
    },
    {
        icon: <Layout size={40} />,
        title: "UI/UX Design",
        description: "I design intuitive and engaging user interfaces focusing on usability, accessibility, and clean visual design."
    },
    {
        icon: <Cpu size={40} />,
        title: "API Integration",
        description: "I integrate third-party APIs and build custom systems to ensure seamless communication between platforms."
    },
    {
        icon: <Database size={40} />,
        title: "Database Management",
        description: "I design and manage efficient databases with optimized queries, ensuring security and high performance."
    },
    {
        icon: <Zap size={40} />,
        title: "Performance Optimization",
        description: "I improve application speed by optimizing code, reducing load times, and ensuring smooth experiences."
    }
];

const content = "Features";
const title = "WHAT I DO";
const subtitle =
    "I am a passionate developer specializing in creating exceptional digital experiences. I bring ideas to life through clean code and innovative solutions.";

const CardDesign = () => {
    return (
        <>
            {featuresData.map((feature, index) => (
                <div
                    key={index}
                    className="group p-8 text-left transition-all duration-300 bg-[var(--surface)] ease-out
                               hover:scale-[1.04] hover:bg-[var(--primary)]
                               hover:text-white hover:shadow-[var(--shadow-primary)]"
                    style={{
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-neo)',
                    }}
                >
                    {/* Icon */}
                    <div
                        className="mb-6 inline-block p-3 rounded-lg transition-all duration-300
                                   text-[var(--primary)] group-hover:text-white"
                    >
                        {feature.icon}
                    </div>

                    {/* Title */}
                    <h3
                        className="text-xl font-bold mb-4
                                   text-[var(--text-primary)]
                                   group-hover:text-white
                                   transition-colors duration-300"
                    >
                        {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                        className="leading-relaxed
                                   text-[var(--text-muted)]
                                   group-hover:text-white
                                   transition-colors duration-300"
                    >
                        {feature.description}
                    </p>

                    {/* Bottom line */}
                    <div className="mt-6 w-10 h-1 bg-transparent
                                    group-hover:bg-white
                                    transition-all duration-300 rounded-full" />
                </div>
            ))}
        </>
    );
};

const Features = () => {
    return (
        <section id='feature' className="py-20 px-6" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p
                        className="text-sm font-bold uppercase tracking-[4px] mb-2"
                        style={{ color: 'var(--primary)' }}
                    >
                        {content}
                    </p>

                    <h1
                        className="text-4xl md:text-5xl font-extrabold mt-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {title}
                    </h1>

                    <p
                        className="mt-6 max-w-2xl mx-auto text-lg"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                    <CardDesign />
                </div>
            </div>
        </section>
    );
};

export default Features;