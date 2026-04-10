"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Mail,
  MoreVerticalIcon,
  Phone,
  PhoneIcon,
  Send,
  VideoIcon,
} from "lucide-react";

type Message = {
  role: "user" | "system";
  text: string;
  time: string;
};

const templates = [
  "I want to hire you for a project",
  "I have a project inquiry",
  "I found a bug on your site",
  "Just wanted to connect",
];

const ContactChatPage = () => {
  const [showForm, setShowForm] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      text: "Hi I'm Kiran. You can chat with me like WhatsApp. How can I help you?",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [istyping, setIstyping] = useState(false);
  const [calling, setCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<string | null>(null);
  const [profile, setProfile] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const callTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio("/ringtone.mp3");
    audio.loop = true;
    audio.preload = "auto";

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const startCall = async (type: "audio" | "video") => {
    setCalling(true);
    setCallStatus(`${type} call started... Ringing `);

    const audio = audioRef.current;

    if (audio) {
      try {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) await playPromise;
      } catch (err) {
        console.log("Audio play blocked:", err);
      }
    }

    if (callTimeoutRef.current) clearTimeout(callTimeoutRef.current);

    callTimeoutRef.current = setTimeout(() => {
      audio?.pause();
      if (audio) audio.currentTime = 0;

      setCalling(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: `${type} call ended`,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 10000);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.message("Please fill all the fields");
      return;
    }

    const userMessage: Message = {
      role: "user",
      text: `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setStatus("loading");

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: "Thanks! I received your details.",
          time: new Date().toLocaleTimeString(),
        },
      ]);

      toast.success("Message sent");
      setShowForm(false);
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setStatus("idle");
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      role: "user",
      text,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    let reply = "";

    if (templates.includes(text)) {
      if (text === "I want to hire you for a project") {
        reply =
          "Great! You can call me at +977 9845257185 or email me at kiran.khatri.787@gmail.com";
      } else if (text === "I have a project inquiry") {
        reply = "Sure! Please share your requirements and timeline.";
      } else if (text === "I found a bug on your site") {
        reply = "Thanks for reporting! Could you share screenshot?";
      } else if (text === "Just wanted to connect") {
        reply = "Nice to meet you 😊 How can I help?";
      }

      setIstyping(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: reply,
          time: new Date().toLocaleTimeString(),
        },
      ]);

      setIstyping(false);

      return;
    }

    try {
      setStatus("loading");
      setIstyping(true);

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setIstyping(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: data.reply,
          time: new Date().toLocaleTimeString(),
        },
      ]);

      toast.success("Message sent");
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setStatus("idle");
      setIstyping(false);
    }
  };

  return (
    <main className="min-h-screen w-full" style={{ background: "var(--bg)" }}>
      <Navbar />

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center p-4 sm:p-6">
          <div className="flex flex-col justify-center items-center  bg-white border rounded-2xl shadow-2xl w-full max-w-md p-4 sm:p-6">
            <form
              onSubmit={handleSubmit}
              className="w-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-4 sm:p-6 space-y-4"
            >
              <h2 className="text-lg sm:text-xl font-bold text-center mb-2">
                Contact Me
              </h2>

              <input
                placeholder="@krishna khatri"
                className="w-full p-3 rounded-xl border border-gray-200"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="krishna@gmail.com"
                type="email"
                className="w-full p-3 rounded-xl border border-gray-200"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <textarea
                placeholder="Hi want to collaborat with you . Our contact is +977-98XXXXXXXXX . After your response I will contact you. Thanks"
                rows={4}
                className="w-full p-3 rounded-xl border border-gray-200 resize-none"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-xl border hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 group py-2.5 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center gap-2 "
                >
                  <Send
                    size={18}
                    className="group-hover:rotate-45 group-hover:translate-x-5 transition-all duration-300 cursor-pointer"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-30 grid gap-6 sm:gap-8 transition-all duration-300
  ${profile ? "grid-cols-1 lg:grid-cols-4" : "grid-cols-1"}
`}
      >
        {/* PROFILE */}

        {profile && (
          <div
            className="p-4 sm:p-6 rounded-2xl h-fit hidden sm:block"
            style={{ boxShadow: "var(--shadow-neo)" }}
          >
            <img
              src="/profile.jpeg"
              className="rounded-xl mb-4 w-full h-40 sm:h-52 object-cover"
            />

            <h2 className="text-lg sm:text-xl font-bold">Bhum Bikram Silwal</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Software Engineer
            </p>

            <div className="mt-4 text-xs sm:text-sm flex flex-col gap-2">
              <a href="tel:+9779845257185" className="flex gap-2">
                <Phone size={12} /> 9845257185
              </a>
              <a
                href="mailto:kiran.khatri.787@gmail.com"
                className="flex gap-2"
              >
                <Mail size={12} /> kiran.khatri.787@gmail.com
              </a>
            </div>
          </div>
        )}

        {/* CHAT */}
        <div className="lg:col-span-3 flex flex-col h-[70vh] sm:h-[75vh] lg:h-[80vh] rounded-2xl overflow-hidden border">
          <header className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center px-3 sm:px-4 py-3 bg-white/80 backdrop-blur-md border-b">
            <div className="flex gap-3 items-center">
              <img
                src="/profile.jpeg"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full cursor-pointer"
                onClick={() => window.open("/profile.jpeg", "_blank")}
              />
              <h1
                className="text-sm sm:text-base cursor-pointer"
                onClick={() => {
                  setProfile(!profile);
                }}
              >
                Bhum Bikram silwal
                <span className="block text-xs text-green-500">Active now</span>
              </h1>
            </div>

            <div className="flex gap-4 sm:gap-5">
              <PhoneIcon
                onClick={() => startCall("audio")}
                className="cursor-pointer"
              />
              <VideoIcon
                onClick={() => startCall("video")}
                className="cursor-pointer"
              />
              <MoreVerticalIcon
                onClick={() => setShowForm(true)}
                className="cursor-pointer"
              />
            </div>
          </header>

          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "system" && (
                  <img
                    src="/profile.jpeg"
                    alt="kiran"
                    className="h-8 w-8 rounded-full relative top-3"
                  />
                )}
                <div
                  className={`max-w-[80%] sm:max-w-[70%] p-3 rounded-2xl text-xs sm:text-sm ${
                    msg.role === "user"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-white/70"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] sm:text-xs opacity-70">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {istyping && (
              <div className="text-xs sm:text-sm animate-pulse">typing...</div>
            )}
            {/* CALLING OVERLAY (FIXED + RESPONSIVE) */}
            {calling && (
              <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/70 backdrop-blur-md px-4 text-center">
                {/* STATUS TEXT */}
                <div className="text-white text-lg sm:text-xl md:text-2xl font-bold animate-pulse">
                  {callStatus}
                </div>

                {/* ANIMATION DOTS */}
                <div className="mt-6 flex gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-bounce delay-300"></div>
                </div>

                {/* SUB TEXT */}
                <p className="text-white/70 text-xs sm:text-sm mt-4">
                  Connecting... please wait
                </p>

                {/* CANCEL BUTTON */}
                <button
                  onClick={() => {
                    setCalling(false);
                    setCallStatus(null);

                    // optional: stop ringtone if playing
                    audioRef.current?.pause();
                    if (audioRef.current) audioRef.current.currentTime = 0;

                    // optional: clear timeout if needed
                    if (callTimeoutRef.current) {
                      clearTimeout(callTimeoutRef.current);
                    }
                  }}
                  className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 active:scale-95 transition-all rounded-full text-white font-medium shadow-lg cursor-pointer"
                >
                  <Phone size={18} />
                  Cancel Call
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* templates */}
          <div className="p-2 flex flex-wrap gap-2">
            {templates.map((t, i) => (
              <button
                key={i}
                onClick={() => sendMessage(t)}
                className="text-[10px] sm:text-xs px-3 py-1 rounded-full bg-[var(--primary)] text-white cursor-pointer hover:-translate-y-2 transition-all duration-300"
              >
                {t}
              </button>
            ))}
          </div>

          {/* input */}
          <div className="p-2 sm:p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 sm:p-3 rounded-full border text-sm"
              placeholder="Type message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />

            <button
              onClick={() => sendMessage(input)}
              className="px-4 sm:px-6 rounded-full group bg-[var(--primary)] text-white cursor-pointer"
            >
              <Send
                size={18}
                className="group-hover:rotate-45 transition-all duration-300 "
              />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ContactChatPage;
