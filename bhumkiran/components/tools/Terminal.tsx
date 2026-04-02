"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Define commands and responses
const commands: Record<string, string | JSX.Element> = {
  about: "Hi! I'm Kiran, a full-stack developer passionate about React, Node.js, and creative web experiences.",
  projects: <a href="/#portfolio" className="text-amber underline hover:text-forest">View my projects</a>,
  skills: "Skills: JavaScript, React, Next.js, Tailwind, Node.js, Electron",
  contact: <span>Email me at: <a href="mailto:kiran@example.com" className="text-amber underline">kiran@example.com</a></span>,
  help: "Try typing: about, projects, skills, contact",
  hack: "💥 You found an Easter egg! Nice job, hacker 😉",
};

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<(string | JSX.Element)[]>([]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever history updates
  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();
      const output = commands[command] || <span className="text-red-500">Command not found: {command}</span>;

      // Update history
      setHistory([...history, `> ${input}`, output]);
      setInput("");
    }
  };

  return (
    <div className="bg-void text-cream font-mono p-4 rounded-lg w-full max-w-3xl mx-auto shadow-lg">
      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="h-64 overflow-y-auto border border-forest rounded p-3 flex flex-col gap-0.5 text-sm"
      >
        {history.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-2 flex items-center">
        <span className="mr-2 text-amber font-bold text-sm">&gt;</span>
        <input
          type="text"
          className="bg-void text-cream font-mono flex-1 text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="Type a command (help for options)"
          autoFocus
        />
      </div>

      {/* Tip */}
      <div className="mt-1 text-xs text-forest">
        Tip: Try commands <code>about</code>, <code>projects</code>, <code>skills</code>, <code>contact</code>, <code>help</code>
      </div>
    </div>
  );
}