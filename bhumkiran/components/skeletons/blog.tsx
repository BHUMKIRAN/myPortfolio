import React from "react";

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-[var(--surface)]/60 rounded ${className}`} />
);

const BlogSkeleton = () => {
  return (
    <section className="py-30 px-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col items-center mb-16 text-center space-y-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-2/3" />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)]"
            style={{
              boxShadow: "var(--shadow-neo)",
            }}
          >
            {/* IMAGE */}
            <Skeleton className="h-48 w-full mb-6 rounded-[var(--radius-md)]" />

            {/* META */}
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>

            {/* TITLE */}
            <Skeleton className="h-6 w-3/4 mb-3" />

            {/* TEXT */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}

      </div>
    </section>
  );
};

export default BlogSkeleton;