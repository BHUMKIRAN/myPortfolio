import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EasterEggTerminal from "@/components/tools/EsterEgg";
import MemoryGame from "@/components/tools/Memory";
import CodePlayground from "@/components/tools/PlayGround";
import InteractiveTerminal from "@/components/tools/Terminal";
import React from "react";

const ToolsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Navbar />

      <main className="flex-grow container mx-auto py-30 px-4 max-w-6xl">
        {/* Compact Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase">
            DEV<span className="text-[var(--primary)]">BOX</span>
          </h1>
          <p className="text-[var(--text-muted)] text-sm font-mono mt-1">
            v2.0.4 // Integrated Debugging & Logic Suite
          </p>
        </div>

        {/* Compact & Best Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1 */}
          <div className="h-[420px]">
            <ToolCard title="Playground.js" subtitle="Live_Compiler">
              <CodePlayground />
            </ToolCard>
          </div>

          {/* 2 */}
          <div className="h-[420px]">
            <ToolCard title="Root_Access" subtitle="Encrypted_Sectors">
              <EasterEggTerminal />
            </ToolCard>
          </div>

          {/* 3 */}
          <div className="h-[420px]">
            <ToolCard title="Neural_Match" subtitle="Logic_Test">
              <MemoryGame />
            </ToolCard>
          </div>

          {/* 4 */}
          <div className="h-[420px]">
            <ToolCard title="System_Console" subtitle="STDOUT/STDIN">
              <InteractiveTerminal />
            </ToolCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/**
 * Reusable Ultra-Compact Window Wrapper
 */
const ToolCard = ({ title, subtitle, children, isHidden = false }: any) => (
  <div
    className={`group flex flex-col h-full rounded-[var(--radius-sm)] bg-[var(--surface)] border border-white/5 overflow-hidden transition-all duration-300 hover:border-[var(--primary)]/40 ${
      isHidden
        ? "opacity-50 hover:opacity-100 border-dashed"
        : "shadow-[var(--shadow-neo)]"
    }`}
  >
    {/* Minimalist Header */}
    <div className="px-3 py-2 border-b border-[var(--bg)] flex justify-between items-center bg-white/[0.02]">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-white/5 group-hover:bg-[#ff5f56] transition-colors duration-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/5 group-hover:bg-[#ffbd2e] transition-colors duration-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/5 group-hover:bg-[#27c93f] transition-colors duration-500" />
        </div>
        <div className="h-3 w-[1px] bg-white/10 mx-1" />
        <div className="flex flex-col leading-none">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-primary)]">
            {title}
          </span>
        </div>
      </div>
      <span className="text-[8px] text-[var(--text-muted)] font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity">
        {subtitle}
      </span>
    </div>

    {/* Content Area - Adjusted for compactness */}
    <div className="p-4 flex-grow overflow-auto custom-scrollbar">
      {children}
    </div>
  </div>
);

export default ToolsPage;
