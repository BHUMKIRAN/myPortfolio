import React from "react";

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-[var(--surface)]/60 rounded ${className}`} />
);

const FeaturesSkeleton = () => {
  return (
    <section className="py-20 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        {/* HEADER SKELETON */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <Skeleton className="h-5 w-1/2 mx-auto" />
        </div>

        {/* CARDS SKELETON */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-8 rounded-[var(--radius-lg)] bg-[var(--surface)]"
            >
              {/* ICON */}
              <Skeleton className="h-12 w-12 mb-6 rounded-lg" />

              {/* TITLE */}
              <Skeleton className="h-6 w-3/4 mb-4" />

              {/* TEXT */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-2/3" />

              {/* BOTTOM LINE */}
              <Skeleton className="h-1 w-10 mt-6" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSkeleton;