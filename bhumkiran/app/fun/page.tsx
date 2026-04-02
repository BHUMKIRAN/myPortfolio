import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import EasterEggTerminal from '@/components/tools/EsterEgg'
import CodePlayground from '@/components/tools/PlayGround'
import InteractiveTerminal from '@/components/tools/Terminal'
import React from 'react'

const ToolsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Navbar />

      <main className="flex-grow container mx-auto  py-30">
        {/* Header Section */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-black text-[var(--text-primary)] mb-2">
            DEVELOPER <span className="text-[var(--primary)]">SANDBOX</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl text-sm lg:text-base">
            Test your logic in real-time, execute commands in the interactive terminal, 
            and maybe find something hidden if you look closely.
          </p>
        </div>

        {/* Main Interface Grid: 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          
          {/* Code Playground Card */}
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] shadow-[var(--shadow-neo)] border border-white/10 flex flex-col">
            <div className="flex items-center gap-2 mb-3 border-b border-[var(--bg)] pb-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] ml-2 tracking-widest uppercase">
                Playground.js
              </span>
            </div>
            <div className="flex-grow">
              <CodePlayground />
            </div>
          </div>

          {/* Interactive Terminal Card */}
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] shadow-[var(--shadow-neo)] flex flex-col">
            <h3 className="text-sm font-bold text-[var(--primary)] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              SYSTEM_TERMINAL
            </h3>
            <div className="flex-grow">
              <InteractiveTerminal />
            </div>
          </div>

          {/* Easter Egg Terminal */}
          <div className="group relative p-4 rounded-[var(--radius-md)] bg-[var(--surface)] shadow-[var(--shadow-neo)] border-t-2 border-transparent group-hover:border-[var(--primary)] flex flex-col">
            <div className="absolute inset-0 bg-[var(--primary)] blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <p className="text-[10px] font-mono text-[var(--text-muted)] mb-2 italic">
              Hidden Easter Egg Terminal
            </p>
            <div className="flex-grow">
              <EasterEggTerminal />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ToolsPage