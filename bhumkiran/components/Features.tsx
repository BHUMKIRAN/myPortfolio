"use client";
import React, { useEffect, useState } from "react";
import { Smartphone, Globe, Layout, Database, Zap, Cpu } from "lucide-react";
import getData from "@/service/Contentful";
import TiltCard from "./animation/TiltCard";

/* ---------------- ICON MAPPER ---------------- */
const iconMap: any = {
  Smartphone: Smartphone,
  Globe: Globe,
  Layout: Layout,
  Cpu: Cpu,
  Database: Database,
  Zap: Zap,
};

/* ---------------- CARD COMPONENT ---------------- */
const CardDesign = ({ services }: any) => {
  return (
    <>
      {services?.map((feature: any) => {
        const Icon = iconMap[feature.iconSlug];

        return (
          <TiltCard
            key={feature.id}
            className="group p-8 text-left transition-all duration-300 
                       bg-[var(--surface)] ease-out
                       hover:scale-[1.04] hover:bg-[var(--primary)]
                       hover:text-white hover:shadow-[var(--shadow-primary)]
                       rounded-[var(--radius-lg)]"
            style={{
              boxShadow: "var(--shadow-neo)",
            }}
          >
            {/* Icon */}
            <div
              className="mb-6 inline-block p-3 rounded-lg transition-all duration-300
                         text-[var(--primary)] group-hover:text-white"
            >
              {Icon && <Icon size={40} />}
            </div>

            {/* Title */}
            <h3
              className="text-xl font-bold mb-4
                         text-[var(--text-primary)]
                         group-hover:text-white
                         transition-colors duration-300"
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p
              className="leading-relaxed
                         text-[var(--text-muted)]
                         group-hover:text-white
                         transition-colors duration-300"
            >
              {feature.description}
            </p>

            {/* Bottom line */}
            <div
              className="mt-6 w-10 h-1 bg-transparent
                         group-hover:bg-white
                         transition-all duration-300 rounded-full"
            />
          </TiltCard>
        );
      })}
    </>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
const Features = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      const hero = res?.fields?.features?.featuresSection;
      setData(hero);
    };
    fetchData();
  }, []);

  return (
    <section
      id="feature"
      className="py-20 px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p
            className="text-sm font-bold uppercase tracking-[4px] mb-2"
            style={{ color: "var(--primary)" }}
          >
            {data?.sectionTag}
          </p>

          <h1
            className="text-4xl md:text-5xl font-extrabold mt-2"
            style={{ color: "var(--text-primary)" }}
          >
            {data?.mainTitle}
          </h1>

          <p
            className="mt-6 max-w-2xl mx-auto text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            {data?.description}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          <CardDesign services={data?.services} />
        </div>
      </div>
    </section>
  );
};

export default Features;
