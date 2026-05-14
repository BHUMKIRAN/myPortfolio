const Skeleton = ({ className }: { className: string }) => (
  <div
    className={`animate-pulse bg-[var(--surface)]/60 rounded ${className}`}
  />
);

export default function HeroSkeleton() {
  return (
    <main className="w-full" aria-busy="true">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1200px] flex-col items-center gap-12 px-10 py-20 lg:flex-row lg:justify-between">
        {/* LEFT */}
        <div className="w-full max-w-2xl space-y-6">
          <Skeleton className="h-3 w-40" />

          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-2/3" />
          </div>

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="flex gap-4 mt-8">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>

          <div className="mt-10 flex gap-4">
            <Skeleton className="h-12 w-12 rounded" />
            <Skeleton className="h-12 w-12 rounded" />
            <Skeleton className="h-12 w-12 rounded" />
          </div>

          <div className="mt-6 flex gap-3 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-12 rounded" />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[350px]">
          <div className="p-5 bg-[var(--surface)] rounded-lg shadow space-y-4">
            <Skeleton className="aspect-[4/5] w-full" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
            <Skeleton className="h-3 w-1/2 mx-auto" />
          </div>
        </div>
      </div>
    </main>
  );
}
