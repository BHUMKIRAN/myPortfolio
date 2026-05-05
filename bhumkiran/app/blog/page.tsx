"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ArrowBigRight, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {useQuery} from "@tanstack/react-query"

import {getBlogData} from '@/service/Contentful';
const Blog = () => {
    
 
    const router = useRouter();

    const fetchData = async () => {
        const res = await getBlogData();
      return res
    }

    const {data , isloading, isError } = useQuery({
        queryKey: ['blog'],
        queryFn: fetchData
    })


   const formatDate = (time: string) => {
  const date = new Date(time);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
   

    const BlogData = data?.fields?.blogs[0]
    const title = BlogData?.fields?.title
    const subtitle = BlogData?.fields?.paragraph
    const contents = BlogData?.fields?.contents || []

const contentData = contents
  .map((card: any) => ({
    image: `https:${card?.fields?.images[0]?.fields?.file?.url}`,
    title: card?.fields?.title,
    // subtitle: card?.fields?.subtitle,
    // readTime: card?.fields?.readTime,
    paragraph: card?.fields?.paragraph,
    time: card?.fields?.time,
    formatted: formatDate(card?.fields?.time),
  }))
  .sort((a: any, b: any) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });
    const handleClick = (index : number) => {
    

        // const id = card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        // router.push(`/blog/${id}`);
        router.push(`/blog/${index}`);


    };
    if(isloading) return <div>Loading...</div>
    if(isError) return <div>Something went wrong</div>

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
                    {contentData.map((card:any, index: number) => (
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
                                    <span>{card.formatted}</span>
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