"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ShieldCheck, Zap, Rocket } from "lucide-react";
import Link from "next/link";

const pricingData = [
  {
    title: "Basic",
    icon: <Rocket size={20} className="text-[var(--text-muted)]" />,
    subtitle: "Quick Landing Page",
    tech: "HTML, CSS & JS",
    price: "$50",
    features: [
      "Up to 5 Pages",
      "Custom Animations",
      "SEO & Performance",
      "Responsive Layout",
    ],
  },
  {
    title: "Medium",
    icon: <Zap size={20} className="text-[var(--primary)]" />,
    subtitle: "Complete CMS Build",
    tech: "Elementor Pro + CMS",
    price: "$150",
    features: [
      "Full Dynamic CMS",
      "Advanced Templates",
      "Client Dashboard",
      "Performance Optimized",
    ],
    popular: true,
  },
  {
    title: "Pro",
    icon: <ShieldCheck size={20} className="text-[var(--text-muted)]" />,
    subtitle: "Enterprise Solution",
    tech: "Full E-commerce",
    price: "$350",
    features: [
      "Enterprise Website",
      "Advanced E-commerce",
      "SEO Strategy Suite",
      "Priority Support",
    ],
  },
];

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Navbar />

      <main className="flex-grow py-30 px-6 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-4 tracking-tight">
            My <span className="text-[var(--primary)]">Pricing</span>
          </h1>
          <p className="text-[var(--text-muted)] text-base max-w-xl mx-auto">
            Experience the soft-ui aesthetic with high-performance delivery. 
            Choose the tier that fits your growth.
          </p>
        </div>

        {/* Neumorphic 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingData.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-[var(--surface)] p-8 rounded-[2.5rem] shadow-[var(--shadow-neo)] border border-white/5 transition-all duration-300 hover:translate-y-[-5px] ${
                plan.popular ? "ring-2 ring-[var(--primary)]/20" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-[var(--shadow-primary)] flex items-center gap-1">
                  Best Value
                </div>
              )}

              {/* Icon & Title */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[var(--primary)] font-bold text-[10px] uppercase tracking-[0.2em] mb-1">
                    {plan.tech}
                  </p>
                  <h3 className="text-3xl font-black text-[var(--text-primary)] leading-tight">
                    {plan.title}
                  </h3>
                </div>
                <div className="p-3 rounded-2xl shadow-[var(--shadow-soft)] bg-[var(--bg)]">
                  {plan.icon}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-black text-[var(--text-primary)]">
                  {plan.price}
                </span>
                <span className="text-[var(--text-muted)] text-sm font-medium">/total</span>
              </div>
              <p className="text-[var(--text-muted)] text-sm mb-8 font-medium">
                {plan.subtitle}
              </p>

              {/* Neumorphic Inset Divider */}
              <div className="h-[4px] w-full bg-[var(--bg)] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] mb-8 rounded-full" />

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-primary)] font-bold">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg)] shadow-[var(--shadow-neo)] flex items-center justify-center">
                      <Check size={14} className="text-[var(--primary)] stroke-[4px]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Neumorphic Button */}
              <Link href="/contact" className="block">
                <button className="btn-neumorphic w-full py-4 text-sm font-black shadow-[var(--shadow-neo)] tracking-wide uppercase">
                  Select {plan.title}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;