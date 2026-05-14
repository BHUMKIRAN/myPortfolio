"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, ArrowLeft, ExternalLink } from "lucide-react";
import { getBlogData } from "@/service/Contentful";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function CarouselDemo({ x }: { x: string[] }) {
  return (
    <Carousel className="w-full max-w-[12rem] sm:max-w-xs">
      <CarouselContent>
        {x.map((i, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">
                    <img src={i} alt="" />
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
const BlogDetail = () => {
  const params = useParams();
  const [blog, setBlog] = useState<any>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog"],
    queryFn: getBlogData,
  });

  console.log(data);
  const BlogData = data?.fields?.blogs[0];
  const contents = BlogData?.fields?.contents || [];

  useEffect(() => {
    // Ensure params.id exists and contents is an array
    if (params?.id && Array.isArray(contents)) {
      const index = parseInt(params.id as string, 10);

      const foundBlog = contents[index];
      setBlog(foundBlog || null);
    }
  }, [params?.id, contents]);

  useEffect(() => {
    if (blog && blog?.fields?.title) {
      document.title = `${blog?.fields?.title} | Bhum bikram silwal kiran`;
    } else if (!isLoading && !blog) {
      document.title = `Blog not found | Bhum bikram silwal kiran`;
    } else {
      document.title = `Bhum bikram silwal kiran`;
    }
  }, [blog, isLoading]);

  const mapToline = (text: string | undefined) => {
    const lines = text?.split("\n") || [];
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  const blogData = {
    title: blog?.fields?.title || "",
    subtitle: blog?.fields?.chips || "",
    paragraph: blog?.fields?.paragraph || "",

    readTime: blog?.readTime || "8 min read",
    images:
      blog?.fields?.images?.map((i: any) => `https:${i.fields.file.url}`) || [],

    contents: blog?.fields?.contents || [],

    contentsData: (blog?.fields?.contents || []).map((card: any) => ({
      image: `https:${card?.fields?.images?.[0]?.fields?.file?.url || ""}`,
      title: card?.fields?.title || "",
      paragraph: card?.fields?.paragraph || "",

      others: {
        example: mapToline(card?.fields?.others?.example) || "",
        links: card?.fields?.others?.links || "",
      },
    })),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Error fetching blog!
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
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="max-w-5xl mx-auto py-30 px-6">
        {/* header */}
        <div className="mb-8 text-center">
          <span className="text-[var(--primary)] uppercase tracking-widest font-medium  text-xl">
            {blogData.title}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mt-2 uppercase">
            {blogData.subtitle}
          </h1>
          <div className="flex items-center justify-center mt-3 text-sm text-[var(--text-muted)] gap-2">
            <Clock size={16} />
            <span>{blogData.readTime}</span>
          </div>
        </div>

        {/* introduction + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start px-0 md:px-10 lg:px-0 py-10">
          {/* TEXT SECTION */}
          <div className="max-w-3xl">
            <div
              className="
        prose 
        prose-lg 
        max-w-none
        
      "
            >
              <p className="text-justify leading-8 text-[17px] tracking-wide ">
                {blogData.paragraph}
              </p>
            </div>
          </div>

          {/* IMAGE / CAROUSEL */}
          <div className="w-full justify-center items-center flex">
            <CarouselDemo x={blogData.images} />
          </div>
        </div>

        {/* contents */}

        <div className="flex flex-col gap-10">
          {blogData.contentsData.map((card: any, index: number) => (
            <div
              key={index}
              className={`grid ${
                card.others?.example?.length === 0
                  ? "grid-cols-1 "
                  : "grid-cols-1 md:grid-cols-2"
              } gap-6 items-start`}
            >
              {/* LEFT SIDE */}
              <div className="space-y-4 w-full">
                <h2
                  className="
      text-2xl 
      md:text-3xl 
      font-bold 
      text-primary
      leading-tight
    "
                >
                  {card.title}
                </h2>

                <p
                  className="
      text-[15px]
      md:text-base
      leading-8
      tracking-wide
      text-justify
    "
                >
                  {card.paragraph}
                </p>
              </div>

              {/* RIGHT SIDE */}
              {card.others?.example?.length > 0 && (
                <div className="bg-[var(--card)] text-[var(--text-primary)] rounded-xl border border-white/10 shadow-md overflow-hidden max-h-[420px] flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/20">
                    <span className="text-xs tracking-wide opacity-70">
                      Example Code
                    </span>
                  </div>

                  {/* Code Block */}
                  <div className="p-4 overflow-auto">
                    <pre className="text-sm leading-6 whitespace-pre-wrap break-words font-mono">
                      {card.others?.example}
                    </pre>
                  </div>

                  {/* Link Section */}
                  {card.others?.links && (
                    <div className="px-4 py-3 border-t border-white/10">
                      <a
                        href={card.others.links}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:text-blue-400 underline break-all text-sm"
                      >
                        {card.others.links}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* button */}
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
    </main>
  );
};

export default BlogDetail;
