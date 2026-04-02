
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./svg/SocialIcons";

const roles = ["Developer.", " Coder.", "Designer."];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

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
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1200px] flex-col items-center gap-12 p-10 pb-16 lg:flex-row lg:items-start lg:justify-between">
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
            <a
              href="#portfolio"
              className="btn btn-neumorphic text-[var(--primary)] hover:shadow-[var(--shadow-soft)]"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="btn btn-neumorphic text-[var(--text-primary)] hover:shadow-[var(--shadow-soft)]"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-12">
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[var(--text-primary)]">
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
                    className="grid h-10 w-10 place-items-center rounded-[var(--radius-md)] bg-[var(--surface)] shadow-[var(--shadow-neo)] text-[var(--text-primary)] transition-colors hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[var(--text-primary)]">
                BEST SKILL ON
              </p>
              <div className="flex gap-3">
                {["JS", "TS", "UI"].map((skill) => (
                  <div
                    key={skill}
                    className="grid h-10 w-10 place-items-center rounded-[var(--radius-md)] bg-[var(--surface)] shadow-[var(--shadow-neo)] text-sm font-bold text-[var(--text-primary)]"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[400px] mx-auto mt-20"> {/* Added margin top to give space for the pop-out */}
          <div className="relative group">

            {/* 1. The Neumorphic Card Base (The Background) */}
            <div
              className="absolute bottom-0 w-full h-[85%] transition-transform duration-500 group-hover:scale-[1.01]"
              style={{
                background: 'var(--bg)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-neo)',
                zIndex: 1
              }}
            />

            {/* 2. The Image Container */}
            <div className="relative z-10 flex justify-center">
              <div
                className="relative aspect-[4/5] w-[90%] overflow-visible"
              >
                {/* The Actual Image */}
                <Image
                  src="/profile.jpeg"
                  alt="Kiran's Profile"
                  fill
                  priority
                  className="object-cover  transition-transform duration-500 group-hover:scale-105"
                  style={{
                    /* This mask clips the bottom of the image to the card radius 
                       while letting the top stay visible */
                    maskImage: 'linear-gradient(to bottom, black 90%, black 100%)',
                    borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
