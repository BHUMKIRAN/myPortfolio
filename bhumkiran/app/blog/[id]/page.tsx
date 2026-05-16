import React from "react";
import { getBlogData } from "@/service/Contentful";
import BlogDetail from "./Client";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const data: any = await getBlogData();

  const parentBlog = data?.fields?.blogs?.[0] ?? null;
  const contents = parentBlog?.fields?.contents ?? [];

  const blog = contents[Number(id)] ?? null;

  return {
    title: blog?.fields?.title
      ? `${blog.fields.title} | Bhum bikram silwal kiran`
      : "Blog not found | Bhum bikram silwal kiran",
  };
}

const Id = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const data: any = await getBlogData();
  const parentBlog = data?.fields?.blogs?.[0] ?? null;
  const contents = parentBlog?.fields?.contents ?? [];

  const blog = contents[Number(id)] ?? null;

  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
};

export default Id;
