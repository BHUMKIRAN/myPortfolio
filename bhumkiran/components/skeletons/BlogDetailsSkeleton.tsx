"use client";

import React from "react";

const Skeleton = () => (
  <div className="bg-white/10 rounded-md animate-pulse" />
);

const BlogDetailSkeleton = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar skeleton */}
      <div className="h-16 w-full bg-white/5 animate-pulse" />

      <section className="max-w-5xl mx-auto py-30 px-6">
        {/* HEADER */}
        <div className="mb-10 text-center space-y-4">
          <div className="h-4 w-40 mx-auto bg-white/10 animate-pulse rounded-md" />
          <div className="h-10 w-3/4 mx-auto bg-white/10 animate-pulse rounded-md" />
          <div className="h-4 w-24 mx-auto bg-white/10 animate-pulse rounded-md" />
        </div>

        {/* INTRO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start py-10">
          {/* TEXT */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/10 animate-pulse rounded-md" />
            <div className="h-4 w-11/12 bg-white/10 animate-pulse rounded-md" />
            <div className="h-4 w-10/12 bg-white/10 animate-pulse rounded-md" />
            <div className="h-4 w-9/12 bg-white/10 animate-pulse rounded-md" />
            <div className="h-4 w-8/12 bg-white/10 animate-pulse rounded-md" />
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
                <div className="h-6 w-2/3 bg-white/10 animate-pulse rounded-md" />
                <div className="h-4 w-full bg-white/10 animate-pulse rounded-md" />
                <div className="h-4 w-11/12 bg-white/10 animate-pulse rounded-md" />
                <div className="h-4 w-10/12 bg-white/10 animate-pulse rounded-md" />
              </div>

              {/* RIGHT CODE BLOCK */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <div className="h-8 bg-white/10 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-full bg-white/10 animate-pulse rounded-md" />
                  <div className="h-3 w-11/12 bg-white/10 animate-pulse rounded-md" />
                  <div className="h-3 w-10/12 bg-white/10 animate-pulse rounded-md" />
                  <div className="h-3 w-9/12 bg-white/10 animate-pulse rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-12">
          <div className="h-10 w-40 bg-white/10 animate-pulse rounded-full" />
        </div>
      </section>

      {/* Footer skeleton */}
      <div className="h-20 w-full bg-white/5 animate-pulse mt-auto" />
    </main>
  );
};

export default BlogDetailSkeleton;