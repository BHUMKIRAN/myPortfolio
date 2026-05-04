"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock } from "lucide-react";
import getData from "@/service/Contentful";

const BlogDetail = () => {
  const params = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndFindBlog = async () => {
      try {
        const res = await getData();
        const cards = res?.fields?.blog?.cards;

        // Ensure params.id exists and cards is an array
        if (params?.id && Array.isArray(cards)) {
          // Convert string ID from URL to a number to use as index
          const index = parseInt(params.id as string, 10);
          
          // Get the blog at that specific index
          const foundBlog = cards[index];
          setBlog(foundBlog || null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndFindBlog();
  }, [params?.id]); // Re-run if ID changes


  useEffect(()=>{
    if(blog && blog.title){
      document.title = `${blog.title} | Bhum bikram silwal kiran `;
    }
    else if (!loading && !blog) {
      document.title = `Blog not found | Bhum bikram silwal kiran`
    }
    else {
      document.title = `Bhum bikram silwal kiran`
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found!
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <section className="max-w-5xl mx-auto py-30 px-6">
        <div className="mb-8 text-center">
          <span className="text-[var(--primary)] uppercase tracking-widest font-medium">
            {blog.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mt-2">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center mt-3 text-sm text-[var(--text-muted)] gap-2">
            <Clock size={16} />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="prose prose-lg text-[var(--text-primary)] mx-auto">
          <p>{blog.paragraph}</p>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="mt-10 btn-neumorphic  "
          >
            Back to Blogs
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogDetail;
