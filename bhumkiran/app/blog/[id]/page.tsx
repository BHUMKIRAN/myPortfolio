"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock } from "lucide-react";

const cardsData = [
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bTPEXEWXywBvzNknoa_SfiWK7yW0HVf4Sw&s",
        title: "Modern Web Development Trends in 2026",
        subtitle: "Development",
        readTime: "5 min read",
        paragraph: "Explore the latest trends shaping modern web development, including AI‑powered UI, server components, and performance‑first architecture."
    },
    {
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
        title: "Designing Clean UI with Tailwind CSS",
        subtitle: "UI/UX Design",
        readTime: "4 min read",
        paragraph: "Learn how to build clean, responsive interfaces using Tailwind CSS and utility‑first design principles for scalable projects."
    },
    {
        image: "https://d2ms8rpfqc4h24.cloudfront.net/React_Performance_Optimization_Techniques_0bf4828f5a.jpg",
        title: "Optimizing React Apps for Performance",
        subtitle: "Performance",
        readTime: "6 min read",
        paragraph: "Discover techniques to optimize React applications, reduce bundle size, and improve load times for better user experience."
    }
];

const BlogDetail = () => {
    const params = useParams();
    const [blog, setBlog] = useState<typeof cardsData[0] | null>(null);

    useEffect(() => {
        if (!params?.id) return;

        const idSlug = params.id;
        // match slug with title
        const foundBlog = cardsData.find((b) => {
            const slug = b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return slug === idSlug;
        });

        setBlog(foundBlog || null);
    }, [params?.id]);

    if (!blog) return <div className="min-h-screen flex items-center justify-center text-gray-500">Blog not found!</div>;

    return (
        <>
            <Navbar />
            <section className="max-w-5xl mx-auto py-16 px-6">
                <div className="mb-8 text-center">
                    <span className="text-[var(--primary)] uppercase tracking-widest font-medium">{blog.subtitle}</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mt-2">{blog.title}</h1>
                    <div className="flex items-center justify-center mt-3 text-sm text-[var(--text-muted)] gap-2">
                        <Clock size={16} />
                        <span>{blog.readTime}</span>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg shadow-lg mb-8">
                    <img src={blog.image} alt={blog.title} className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"/>
                </div>

                <div className="prose prose-lg text-[var(--text-primary)] mx-auto">
                    <p>{blog.paragraph}</p>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default BlogDetail;