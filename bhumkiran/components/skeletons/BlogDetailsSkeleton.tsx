"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-white/10 rounded-md animate-pulse ${className}`} />
);

const BlogDetailSkeleton = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar skeleton */}
      <div className="h-16 w-full bg-white/5 animate-pulse" />

      <section className="max-w-5xl mx-auto py-30 px-6">
        {/* HEADER */}
        <div className="mb-10 text-center space-y-4">
          <Skeleton className="h-4 w-40 mx-auto" />
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <div className="flex justify-center">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* INTRO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start py-10">
          {/* TEXT */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-9/12" />
            <Skeleton className="h-4 w-8/12" />
          </div>

          {/* CAROUSEL */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs aspect-square bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* CONTENT CARDS */}
        <div className="flex flex-col gap-10 mt-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
            >
              {/* LEFT TEXT */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-10/12" />
              </div>

              {/* RIGHT CODE BLOCK */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <div className="h-8 bg-white/10 animate-pulse" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-11/12" />
                  <Skeleton className="h-3 w-10/12" />
                  <Skeleton className="h-3 w-9/12" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-12">
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
      </section>

      {/* Footer skeleton */}
      <div className="h-20 w-full bg-white/5 animate-pulse mt-auto" />
    </main>
  );
};

export default BlogDetailSkeleton;
