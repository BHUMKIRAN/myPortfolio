"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6"
         style={{ background: "var(--bg)" }}>
      
      <div
        className="group text-center p-10 max-w-xl w-full
                   transition-all duration-300
                   bg-[var(--surface)]
                   hover:shadow-[var(--shadow-primary)]"
        style={{
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-neo)",
        }}
      >
        <h1 className="text-6xl font-extrabold mb-4"
            style={{ color: "var(--primary)" }}>
          404
        </h1>

        <h2 className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}>
          Page Not Found
        </h2>

        <p className="mb-8"
           style={{ color: "var(--text-muted)" }}>
          The page you&apos;re looking for doesn&rsquo;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="px-6 py-3 font-semibold rounded-lg transition-all
                     bg-[var(--primary)] text-white hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}