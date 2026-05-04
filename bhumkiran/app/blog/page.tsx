"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ArrowBigRight, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getData from '@/service/Contentful';

const Blog = () => {
    const [data, setData] = useState<any | null>(null);
 
    const router = useRouter();

    const fetchData = async () => {
        const res = await getData();
        setData(res);
    }

    useEffect(() => {
        fetchData();

    }, [])

   
    const BlogData = data?.fields?.blog
    const title = BlogData?.title
    const subtitle = BlogData?.subtitle
    const cards = BlogData?.cards || []

const cardsData = cards.map((card : any) => ({
    image: card.image,
    title: card.title,
    subtitle: card.subtitle,
    readTime: card.readTime,
    paragraph: card.paragraph
}));

    const handleClick = (index : number) => {
    

        // const id = card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        // router.push(`/blog/${id}`);
        router.push(`/blog/${index}`);


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
                    {cardsData.map((card:any, index: number) => (
                        <div
                            key={index}
                            className="group bg-[var(--surface)] p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-neo)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 cursor-pointer flex flex-col"
                            onClick={() => handleClick(index)}
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