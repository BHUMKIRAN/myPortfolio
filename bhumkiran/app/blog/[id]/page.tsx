"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock } from "lucide-react";
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

function CarouselDemo({ x }) {
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

  const mapToline = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  const blogData = {
    title: blog?.fields?.title || "",
    subtitle: blog?.fields?.paragraph || "",
    readTime: blog?.readTime || "8 min read",
    images:
      blog?.fields?.images?.map((i) => `https:${i.fields.file.url}`) || [],

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
    <div>
      <Navbar />
      <section className="max-w-5xl mx-auto py-30 px-6">
        {/* header */}
        <div className="mb-8 text-center">
          <span className="text-[var(--primary)] uppercase tracking-widest font-medium  text-xl">
            {blogData.title}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mt-2">
            {""}
          </h1>
          <div className="flex items-center justify-center mt-3 text-sm text-[var(--text-muted)] gap-2">
            <Clock size={16} />
            <span>{blogData.readTime}</span>
          </div>
        </div>

        {/* introduction + image */}
        <div className="grid grid-cols-2 gap-x-5">
          <div className="prose prose-lg text-[var(--text-primary)] text-lg leading-relaxed mx-auto">
            <p>{blogData.subtitle}</p>
          </div>
          <CarouselDemo x={blogData.images} />
          {/* <div className="overflow-hidden rounded-lg shadow-lg mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
            />
          </div> */}
        </div>

        {/* contents */}

        <div className="flex flex-col gap-10">
          {blogData.contentsData.map((card: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
            >
              {/* LEFT SIDE */}
              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                  {card.title}
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  {card.paragraph}
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div className="bg-white text-black p-4 rounded-md overflow-auto max-h-[400px]">
                <pre className="text-sm whitespace-pre">
                  {card.others?.example}
                </pre>

                {card.others?.links && (
                  <a
                    href={card.others.links}
                    target="_blank"
                    className="text-blue-400 underline mt-3 block break-all"
                  >
                    {card.others.links}
                  </a>
                )}
              </div>
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
    </div>
  );
};

export default BlogDetail;
