"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Mail,
  MoreVerticalIcon,
  Phone,
  PhoneCall,
  PhoneIcon,
  Send,
  VideoIcon,
} from "lucide-react";
import { BsTelephone } from "react-icons/bs";
import Link from "next/link";

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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      text: "Hi I'm Kiran. You can chat with me like WhatsApp. How can I help you?",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [showForm, setShowForm] = useState(true);
  const [istyping, setIstyping] = useState(false);
  const [calling, setCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  //real simulation on call buttoms

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const callTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio("/ringtone.mp3");
    audio.loop = true;
    audio.preload = "auto";

    audioRef.current = audio;

    return () => {
      // cleanup when component unmounts
      audio.pause();
      audio.src = "";
    };
  }, []);

  const startCall = async (type: "audio" | "video") => {
    setCalling(true);
    setCallStatus(`${type} call started... Ringing 📞`);

    const audio = audioRef.current;

    if (audio) {
      try {
        audio.currentTime = 0;

        const playPromise = audio.play();

        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (err) {
        console.log("Audio play blocked:", err);
      }
    }

    // clear previous timeout if user spam clicks
    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
    }

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

  // scroll to bottom

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
  // FORM SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.message("Please fill all the fields");
      return;
    }

    const formatted = `Name: ${form.name}
Email: ${form.email}
Message: ${form.message}`;

    const userMessage: Message = {
      role: "user",
      text: formatted,
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
          text: "Thanks! I received your details. You can continue chatting.",
          time: new Date().toLocaleTimeString(),
        },
      ]);

      toast.success("Message sent");
      setShowForm(false); // ✅ close form
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setStatus("idle");
    }
  };

  // CHAT MESSAGE
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      role: "user",
      text,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setStatus("loading");
      setIstyping(true);

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      await new Promise((res) => setTimeout(res, 2000));

      setIstyping(false);

      const aiReply: Message = {
        role: "system",
        text: data.reply,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiReply]);

      let reply = data.reply;

      // different replies based on template
      if (text === "I want to hire you for a project") {
        reply = "Great! You can call me at 📞 +977-98XXXXXXXX";
      } else if (text === "I have a project inquiry") {
        reply = "Sure! Please share your requirements and timeline.";
      } else if (text === "I found a bug on your site") {
        reply = "Thanks for reporting! Could you share screenshot?";
      } else if (text === "Just wanted to connect") {
        reply = "Nice to meet you 😊 How can I help?";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: reply,
          time: new Date().toLocaleTimeString(),
        },
      ]);

      toast.success("Message sent");
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center  justify-center ml-50">
          <div className=" flex flex-col justify-center items-center bg-white border rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Contact Me</h2>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Your Name"
                className="w-full p-2 mb-2 border rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Your Email"
                className="w-full p-2 mb-2 border rounded"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <textarea
                placeholder="Your Message"
                className="w-full p-2 mb-4 border rounded"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <div className="flex gap-2 ">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded border cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rotate-45 hover:translate-x-3 transition-all duration-300 cursor-pointer"
                >
                  <Send />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto py-30 grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
        {/* PROFILE PANEL */}
        <div
          className="p-6 rounded-2xl h-fit"
          style={{ boxShadow: "var(--shadow-neo)" }}
        >
          <img
            src="/profile.jpeg"
            className="rounded-xl mb-4 w-full h-52 object-cover"
          />

          <h2 className="text-xl font-bold">Bhum Bikram Silwal</h2>
          <p className="text-sm text-gray-500">Software Engineer</p>

          <div className="mt-4 text-sm flex flex-col justify-center items-center gap-2">
            <a
              href="tel:+977 9845257185"
              className="flex justify-center items-center gap-2 hover:scale-110 transition-all duration-300"
            >
              <Phone size={10} /> 9845257185
            </a>
            <a
              href="mailto: kiran.khatri.787@gmail.com"
              className="flex justify-center items-center gap-2 hover:scale-110 transition-all duration-300"
            >
              <Mail size={10} /> kiran.khatri.787@gmail.com
            </a>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="lg:col-span-3 flex flex-col h-[80vh] rounded-2xl overflow-hidden border border-white shadow-[var(--shadow-neo)]">
          {/* messages */}
          <header className="flex justify-between shrink-0 px-4 py-3 bg-white/80 backdrop-blur-md border-b">
            <div className="flex gap-3">
              <img
                src="/profile.jpeg"
                className="h-12 w-12 rounded-full cursor-pointer"
                onClick={() => window.open("/profile.jpeg", "_blank")}
              />
              <h1 className="flex flex-col">
                Bhum Bikram silwal kiran{" "}
                <span>
                  Active now <span>🟢</span>
                </span>
              </h1>
            </div>
            <div className="flex flex-wrap space-x-5 justify-center items-center">
              <PhoneIcon
                className="text-blue-600 cursor-pointer hover:scale-110 transition"
                onClick={() => startCall("audio")}
              />

              <VideoIcon
                className="text-blue-600 cursor-pointer hover:scale-110 transition"
                onClick={() => startCall("video")}
              />

              <MoreVerticalIcon
                className="text-blue-600 cursor-pointer hover:scale-110 transition"
                onClick={() => setShowForm(true)}
              />
            </div>
          </header>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 ">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
                ref={messagesEndRef}
              >
                <div>
                  {msg.role === "system" && (
                    <img
                      src="/profile.jpeg"
                      className="relative top-3 m-0 rounded-full h-8 w-8"
                    />
                  )}
                </div>
                <div
                  className={`max-w-[70%] p-3 ml-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-white/70"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] opacity-60 block mt-1">
                    {msg.time}
                  </span>
                  <div>
                    {calling && (
                      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 text-white">
                        <div className="text-2xl font-bold animate-puls text-green-500">
                          {callStatus}
                        </div>

                        <div className="mt-4 flex  ">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-150"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-300"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {istyping && (
              <div className="flex justify-start">
                <div className="bg-white/70 p-3 rounded-2xl text-sm animate-pulse">
                  typing...
                </div>
              </div>
            )}
          </div>

          {/* templates */}
          <div className="p-2 flex gap-2 flex-wrap">
            {templates.map((t, i) => (
              <button
                key={i}
                onClick={() => sendMessage(t)}
                className="text-xs px-3 py-1 rounded-full bg-[var(--primary)] text-white"
              >
                {t}
              </button>
            ))}
          </div>

          {/* input */}
          <div className="p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(input);
                }
              }}
              className="flex-1 p-3 rounded-full bg-[var(--bg)] border h-[70px]"
            />

            <button
              onClick={() => sendMessage(input)}
              disabled={status === "loading"}
              className="px-6 rounded-full rotate-45 group font-bold transition-all duration-300 cursor-pointer text-white"
              style={{ background: "var(--primary)" }}
            >
              <Send className="group-hover:scale-125 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ContactChatPage;
