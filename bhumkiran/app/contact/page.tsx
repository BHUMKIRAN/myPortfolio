"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

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
      text: "Hi 👋 I'm Kiran. You can chat with me like WhatsApp. How can I help you?",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");

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

      // optional: send to backend email API
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Chat User",
          email: "chat@visitor.com",
          subject: "Chat Message",
          message: text,
        }),
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: "Got it 👍 I’ll get back to you soon!",
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

          <div className="mt-4 text-sm">
            <p>🟢 Active now</p>
            <p>⏱ Send message to get reply instat</p>
          </div>
        </div>

        {/* CHAT AREA */}
        <div
          className="lg:col-span-3 flex flex-col h-[80vh] rounded-2xl overflow-hidden"
          style={{ boxShadow: "var(--shadow-neo)" }}
        >
          {/* messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-[var(--primary)] text-black"
                      : "bg-white/70"
                  }`}
                  style={{ boxShadow: "var(--shadow-neo)" }}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] opacity-60 block mt-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* templates */}
          <div className="p-2 flex gap-2 flex-wrap border-t">
            {templates.map((t, i) => (
              <button
                key={i}
                onClick={() => sendMessage(t)}
                className="text-xs px-3 py-1 rounded-full bg-white/70"
              >
                {t}
              </button>
            ))}
          </div>

          {/* input */}
          <div className="p-3 flex gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-xl"
              style={{
                boxShadow: "inset 4px 4px 6px rgba(0,0,0,0.1)",
              }}
            />

            <button
              onClick={() => sendMessage(input)}
              disabled={status === "loading"}
              className="px-6 rounded-xl font-bold"
              style={{ background: "var(--primary)" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ContactChatPage;