"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./svg/SocialIcons";
// Install these: npm install react-icons
import {
  SiMongodb, SiExpress, SiReact, SiNodedotjs,
  SiJavascript, SiTypescript, SiMysql,
  SiGraphql, SiSocketdotio, SiTailwindcss
} from "react-icons/si";
import InteractiveTerminal from "./tools/Terminal";
import CodePlayground from "./tools/PlayGround";

const roles = ["Developer.", " Coder.", "Designer."];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Skill data configuration
  const skills = [
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Express", icon: SiExpress, color: "var(--text-primary)" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
    { name: "WebSockets", icon: SiSocketdotio, color: "var(--text-primary)" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  ];

  useEffect(() => {
    const current = roles[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 100);
    } else if (!deleting && displayed.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 60);
    } else if (deleting && displayed.length === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="home" className="w-full">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1200px] flex-col items-center gap-12 px-10 py-30 pb-16 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[var(--text-muted)]">
            WELCOME TO MY WORLD
           
          </p>
          

          <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-[var(--primary)]">Bhum Bikram Silwal kiran</span>
            <br />
            a{" "}
            <span className="border-r-2 border-[var(--primary)] pr-1 animate-pulse">
              {displayed}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-7 text-[var(--text-muted)]">
            I build modern web experiences with clean UI, smooth interactions,
            and a focus on performance.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#portfolio" className="btn btn-neumorphic">View Work</a>
            <a href="#contact" className="btn btn-neumorphic text-[var(--text-primary)]">Contact Me</a>
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-12">
            {/* Social Links */}
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[var(--text-primary)] uppercase">
                FIND WITH ME
              </p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", icon: FacebookIcon },
                  { label: "Instagram", icon: InstagramIcon },
                  { label: "LinkedIn", icon: LinkedInIcon },
                ].map(({ label, icon: Icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-[var(--surface)] shadow-[var(--shadow-neo)] text-[var(--text-primary)] transition-all hover:text-[var(--primary)] hover:-translate-y-1"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[var(--text-primary)] uppercase">
                BEST SKILL ON
              </p>
              <div className="flex flex-wrap gap-3 max-w-md">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    title={skill.name}
                    className="group grid h-12 w-12 place-items-center rounded-[var(--radius-md)] bg-[var(--surface)] shadow-[var(--shadow-neo)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
                  >
                    <skill.icon
                      size={20}
                      className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors duration-300"
                      style={{ color: 'var(--text-muted)' }} // Uses primary color on hover via Tailwind class
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="w-[400px] mx-auto mt-20 lg:mt-0 p-4"> {/* Added padding for hover glow clearance */}
          <div className="relative group perspective-1000"> {/* Perspective added for subtle 3D hover */}

            {/* 1. The Dynamic Hover Glow (The 'Primary' Variable accent) */}
            <div
              className="absolute bottom-0 w-full h-[85%] rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0"
              style={{
                background: 'var(--primary)',
                boxShadow: 'var(--shadow-primary)',
                transform: 'translateY(10px) scale(0.95)',
              }}
            />

            {/* 2. The Neumorphic Card Base (The Background with Inner Shadow) */}
            <div
              className="absolute bottom-0 w-full h-[85%] transition-all duration-500 ease-out 
                 group-hover:scale-[1.02] group-hover:-translate-y-2 z-10"
              style={{
                background: 'var(--surface)', // Using surface color for subtle contrast
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-neo)', // Standard outward shadow
              }}
            >
              {/* 3. The INNER Shadow Layer (Creates depth and anchors the image) */}
              <div
                className="absolute inset-0 rounded-[var(--radius-lg)] z-10"
                style={{
                  boxShadow: 'inset 6px 6px 12px rgba(0,0,0,0.06), inset -6px -6px 12px rgba(255,255,255,0.8)'
                }}
              />
            </div>

            {/* 4. The Image Container */}
            <div className="w-[400px] mx-auto mt-20 lg:mt-0 p-4">
              {/* Perspective adds a very subtle 3D lift on hover */}
              <div className="relative group perspective-1000">

                {/* 1. Neumorphic Glow Backdrop (using Primary variable on hover) */}
                <div
                  className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-0"
                  style={{
                    background: 'var(--primary)',
                    transform: 'translateY(10px) scale(0.9)',
                  }}
                />

                {/* 2. Main Neumorphic Card Container */}
                <div
                  className="relative z-10 p-5 transition-all duration-500 ease-out flex flex-col items-center
                 group-hover:scale-[1.02] group-hover:-translate-y-2"
                  style={{
                    background: 'var(--surface)', // Surface color gives subtle contrast from background
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-neo)',
                  }}
                >

                  {/* 3. Image Container - Fully rounded at top */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden mb-6"
                    style={{
                      borderRadius: `var(--radius-lg) var(--radius-lg) var(--radius-md) var(--radius-md)`
                    }}>

                    <Image
                      src="/profile.jpeg"
                      alt="Kiran's Profile"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />

                    {/* Optional Inner Shadow/Glint Layer on image for extra depth */}
                    <div className="absolute inset-0 z-10"
                      style={{
                        boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.1), inset 0 -2px 5px rgba(0,0,0,0.05)'
                      }}
                    />
                  </div>

                  {/* 4. Caption Area (Optional but looks great here) */}
                  <div className="w-full text-center pb-2">
                    <h4 className="text-[var(--text-primary)] font-bold text-lg group-hover:text-[var(--primary)] transition-colors">
                      Bhum Bikram Silwal
                    </h4>
                    <p className="text-[var(--text-muted)] text-sm tracking-widest uppercase mt-1">
                      Full Stack Developer
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;