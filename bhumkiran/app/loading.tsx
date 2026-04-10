export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center"
         style={{ background: "var(--bg)" }}>
      
      <div
        className="p-10 text-center
                   bg-[var(--surface)]
                   animate-pulse"
        style={{
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-neo)",
        }}
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full
                        border-4 border-[var(--primary)]
                        border-t-transparent animate-spin" />

        <p style={{ color: "var(--text-muted)" }}>
          Loading amazing things...
        </p>
      </div>
    </div>
  );
}