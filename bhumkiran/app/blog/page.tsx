"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ArrowBigRight, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const Blog = () => {
    const [data, setData] = useState(null);
    const title = "MY BLOG";
    const subtitle = "VIEW MY BLOGS";
    const router = useRouter();

    const cardsData = [
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bTPEXEWXywBvzNknoa_SfiWK7yW0HVf4Sw&s", // replace with actual chosen image URL
            title: "Modern Web Development Trends in 2026",
            subtitle: "Development",
            readTime: "5 min read",
            paragraph: "Explore the latest trends shaping modern web development, including AI‑powered UI, server components, and performance‑first architecture."
        },
        {
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786", // replace with chosen image
            title: "Designing Clean UI with Tailwind CSS",
            subtitle: "UI/UX Design",
            readTime: "4 min read",
            paragraph: "Learn how to build clean, responsive interfaces using Tailwind CSS and utility‑first design principles for scalable projects."
        },
        {
            image: "https://d2ms8rpfqc4h24.cloudfront.net/React_Performance_Optimization_Techniques_0bf4828f5a.jpg", // replace with chosen image
            title: "Optimizing React Apps for Performance",
            subtitle: "Performance",
            readTime: "6 min read",
            paragraph: "Discover techniques to optimize React applications, reduce bundle size, and improve load times for better user experience."
        }
    ];
    const handleClick = (card) => {
        setData(card);

        const id = card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        router.push(`/blog/${id}`);


    };

    return (
        <>
            <Navbar />
            <section className="py-30 px-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <h3 className="text-[var(--primary)] font-bold tracking-widest uppercase mb-2">
                        {subtitle}
                    </h3>
                    <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)]">
                        {title}
                    </h1>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {cardsData.map((card, index) => (
                        <div
                            key={index}
                            className="group bg-[var(--surface)] p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-neo)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 cursor-pointer flex flex-col"
                            onClick={() => handleClick(card)}
                        >
                            {/* Image Container */}
                            <div className="overflow-hidden rounded-[var(--radius-md)] mb-6">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Meta Info */}
                            <div className="flex justify-between items-center mb-4 text-[var(--text-muted)] text-sm font-medium">
                                <span className="text-[var(--primary)] uppercase tracking-wider">{card.subtitle}</span>
                                <div className="flex items-center gap-1">
                                    <Clock size={16} />
                                    <span>{card.readTime}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors flex items-center justify-between">
                                {card.title}
                                <ArrowBigRight
                                    size={24}
                                    className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--primary)]"
                                />
                            </h3>

                            <p className="text-[var(--text-muted)] line-clamp-3">
                                {card.paragraph}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>

    );
};

export default Blog;