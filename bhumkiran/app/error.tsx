"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6"
         style={{ background: "var(--bg)" }}>
      
      <div
        className="text-center p-10 max-w-xl w-full
                   bg-[var(--surface)]"
        style={{
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-neo)",
        }}
      >
        <h1 className="text-4xl font-bold mb-4"
            style={{ color: "var(--primary)" }}>
          Something went wrong
        </h1>

        <p className="mb-6"
           style={{ color: "var(--text-muted)" }}>
          {error.message || "Unexpected error occurred"}
        </p>

        <button
          onClick={() => reset()}
          className="px-6 py-3 font-semibold rounded-lg
                     bg-[var(--primary)] text-white
                     hover:scale-105 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}