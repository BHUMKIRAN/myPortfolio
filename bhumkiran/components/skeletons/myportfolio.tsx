import React from "react";

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-[var(--surface)]/60 rounded ${className}`} />
);

const PortfolioSkeleton = () => {
  return (
    <section className="py-20 px-6 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <Skeleton className="h-5 w-1/2 mx-auto" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)]"
              style={{ boxShadow: "var(--shadow-neo)" }}
            >
              {/* IMAGE */}
              <Skeleton className="h-52 w-full mb-6 rounded-xl" />

              {/* CATEGORY */}
              <Skeleton className="h-3 w-24 mb-3" />

              {/* TITLE */}
              <Skeleton className="h-6 w-3/4 mb-3" />

              {/* DESCRIPTION */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-6" />

              {/* BUTTON */}
              <Skeleton className="h-10 w-full rounded" />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default PortfolioSkeleton;