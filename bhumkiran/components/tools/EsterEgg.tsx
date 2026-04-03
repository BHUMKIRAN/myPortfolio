"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";

// ======== Matrix Effect ========
function MatrixRain({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const columns = Math.floor(canvas.width / 16);
    const drops = new Array(columns).fill(1);
    let animId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = String.fromCharCode(33 + Math.random() * 94);
        ctx.fillText(char, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-30 opacity-40" />;
}

// ======== Rain Effect ========
function RainEffect({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drops: { x: number; y: number; speed: number; length: number }[] = [];
    for (let i = 0; i < 100; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 5 + Math.random() * 10,
        length: 8 + Math.random() * 12,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#4a9eff";
      ctx.lineWidth = 1;

      for (let d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.length);
        ctx.stroke();
        d.y += d.speed;
        if (d.y > canvas.height) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-30 opacity-30" />;
}

// ======== Ghost ========
function Ghost({ onDragEnd }: { onDragEnd?: () => void }) {
  return (
    <motion.div
      drag
      dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
      dragElastic={0.5}
      animate={{ y: [0, -10, 0], x: [0, 3, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onDragEnd={onDragEnd}
      className="fixed top-16 right-16 text-3xl cursor-grab active:cursor-grabbing z-50 select-none"
      title="Drag me"
    >
      👻
    </motion.div>
  );
}

// ======== Main Terminal ========
export default function EasterEggTerminal() {
  const [history, setHistory] = useState<string[]>(["Welcome to Kiran Terminal.", "Type 'help' for commands.", ""]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [rain, setRain] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [dance, setDance] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [currentFortune, setCurrentFortune] = useState("");

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const controls = useAnimation();

  useEffect(() => terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight), [history]);
  useEffect(() => inputRef.current?.focus(), []);

  const speakNepali = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const nepaliVoice = voices.find((v) => v.lang.includes("ne") || v.lang.includes("hi"));
      if (nepaliVoice) utter.voice = nepaliVoice;
      utter.lang = "ne-NP";
      utter.rate = 0.9;
      window.speechSynthesis.speak(utter);
    }
  };

  const triggerShake = () => controls.start({ x: [-5, 5, -5, 5, 0], transition: { duration: 0.3 } });
  const triggerConfetti = () => confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 }, colors: ["#ff0000", "#00ff00", "#0000ff"] });
  const addHistory = (cmd: string, res: string) => setHistory((prev) => [...prev, `> ${cmd}`, res, ""]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let result = "";
    let speakText = "";

    switch (cmd) {
      case "help":
        result = "Commands: about, rain, matrix, dance, luck, hack, clear, theme, ghost, secret, date, ping, echo, say [msg]";
        speakText = "सहायता आदेशहरू";
        break;
      case "about":
        result = "Kiran is a full-stack developer passionate about React, Node.js, and creative web experiences.";
        speakText = "namaskar  mero pura naam kiran chha।";
        break;
      case "matrix":
        setMatrix(!matrix);
        setRain(false);
        result = matrix ? "Exiting matrix..." : "Entering matrix...";
        speakText = "म्याट्रिक्स मोड परिवर्तन भयो।";
        break;
      case "rain":
        setRain(!rain);
        setMatrix(false);
        result = rain ? "Rain stopped." : "Rain started.";
        speakText = "पानी मोड परिवर्तन भयो।";
        break;
      case "dance":
        setDance(true);
        triggerConfetti();
        setTimeout(() => setDance(false), 4000);
        result = "Dance mode activated!";
        speakText = "नाच मोड सक्रिय भयो!";
        break;
      case "hack":
        triggerShake();
        triggerConfetti();
        result = "Hack simulation complete.";
        speakText = "ह्याक सिमुलेशन पूरा भयो।";
        break;
      case "ghost":
        result = "Ghost says hello. Drag me!";
        speakText = "भूतले नमस्ते भन्छ।";
        break;
      case "secret":
        result = "Secret message: Keep going. +100 points.";
        triggerConfetti();
        speakText = "गोप्य सन्देश: अगाडि बढ्नुहोस्। +१०० अंक।";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        setTimeout(() => setHistory(["Screen cleared."]));
        return;
      case "theme":
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        result = `Theme: ${newTheme}`;
        speakText = newTheme === "dark" ? "डार्क थिम सक्रिय भयो।" : "लाइट थिम सक्रिय भयो।";
        break;
      default:
        if (cmd.startsWith("say ")) { result = `You said: ${cmd.slice(4)}`; speakText = cmd.slice(4); }
        else if (cmd.startsWith("echo ")) { result = `Echo: ${cmd.slice(5)}`; speakText = cmd.slice(5); }
        else { triggerShake(); result = `Unknown command: ${cmd}`; speakText = "अज्ञात आदेश।"; }
    }

    addHistory(input, result);
    if (speakText) speakNepali(speakText);
    setInput("");
  };

  const handleGhostDragEnd = () => { addHistory("ghost", "Ghost interaction complete."); speakNepali("तपाईंले भूतलाई तान्नुभयो। धन्यवाद।"); };

  return (
    <motion.div animate={controls} className={`h-[350px] rounded-xl w-[400px] flex items-center justify-center p-2 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-amber-50"}`}>
      <MatrixRain active={matrix} />
      <RainEffect active={rain} />
      <Ghost onDragEnd={handleGhostDragEnd} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"} font-mono rounded-xl w-full max-w-3xl shadow-lg border p-2 relative`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b p-1">
          <div className="flex gap-1">
            <motion.div className="w-3 h-3 rounded-full bg-red-500" onClick={() => triggerConfetti()} />
            <motion.div className="w-3 h-3 rounded-full bg-yellow-500" />
            <motion.div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-xs">{matrix ? "MATRIX" : rain ? "RAIN" : "TERMINAL"}</div>
        </div>

        {/* Output */}
        <div ref={terminalRef} className="h-50 overflow-y-auto p-1 space-y-1 text-sm">
          {history.map((line, idx) => <div key={idx} className="whitespace-pre-wrap">{line}</div>)}
        </div>

        {/* Input */}
        <div className="border-t p-1 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-green-400 font-bold text-base">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent w-full focus:outline-none text-sm"
            />
          </div>
          <div className="text-xs opacity-50">
            Try: help, matrix, rain, dance, luck, hack, secret, say [message]
          </div>
        </div>

        {/* Dance */}
        <AnimatePresence>
          {dance && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1.3 }} exit={{ scale: 0 }} className="fixed bottom-28 right-28 text-4xl pointer-events-none flex gap-1">
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>🕺</motion.div>
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}>💃</motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fortune */}
        <AnimatePresence>
          {showFortune && (
            <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} className={`fixed bottom-4 left-1/2 -translate-x-1/2 p-2 rounded shadow-md ${theme === "dark" ? "bg-gray-700" : "bg-white"} border-2 border-yellow-500 text-sm`}>
              <div>{currentFortune}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}