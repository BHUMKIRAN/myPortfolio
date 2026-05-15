import React from "react";
import { getBlogData } from "@/service/Contentful";
import BlogDetail from "./Client";
const Id = async ({ params }) => {
  const id = params?.id;

  const data = await getBlogData();

  return (
    <div>
      <BlogDetail data={data} />
    </div>
  );
};

export default Id;
