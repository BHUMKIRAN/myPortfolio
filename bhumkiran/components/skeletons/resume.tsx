import React from "react";

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-[var(--surface)]/60 rounded ${className}`} />
);

const ResumeSkeleton = () => {
  return (
    <section className="py-20 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-10 w-2/3 mx-auto" />
        </div>

        {/* TABS */}
        <div
          className="flex w-full mb-20 p-2"
          style={{
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-neo)",
          }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 flex-1 mx-1" />
          ))}
        </div>

        {/* CONTENT AREA (default timeline skeleton) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">

          {Array.from({ length: 2 }).map((_, colIdx) => (
            <div key={colIdx} className="relative space-y-8">

              {/* COLUMN HEADER */}
              <div className="ml-10 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-48" />
              </div>

              {/* TIMELINE ITEMS */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative ml-12 p-8 bg-[var(--surface)] rounded-[var(--radius-lg)]">

                  {/* DOT */}
                  <div className="absolute left-[-54px] top-10">
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>

                  {/* HEADER */}
                  <div className="flex justify-between mb-6">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-6 w-12" />
                  </div>

                  {/* DESCRIPTION */}
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />

                </div>
              ))}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ResumeSkeleton;