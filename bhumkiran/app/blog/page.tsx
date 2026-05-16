import React from "react";
import Blog from "./blogClient";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { queryClient } from "@/lib/reactQuery";
import { getBlogData } from "@/service/Contentful";
const BlogPage = async () => {
  // await queryClient.prefetchQuery({
  //   queryKey: ["blog"],
  //   queryFn: getBlogData,
  // });

  const data = await getBlogData();


  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    //   <Blog />
    // </HydrationBoundary>
    <div>
      <Blog data={data} />
    </div>
  );
};

export default BlogPage;
