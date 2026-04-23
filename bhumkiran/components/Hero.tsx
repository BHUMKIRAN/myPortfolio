"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./svg/SocialIcons";

import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiGraphql,
  SiSocketdotio,
  SiTailwindcss,
} from "react-icons/si";

import getData from "@/service/Contentful";
import TiltCard from "./animation/TiltCard";

/* ---------------- ICON MAP ---------------- */
const iconMap: any = {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiGraphql,
  SiSocketdotio,
  SiTailwindcss,
};

/* ---------------- TYPES ---------------- */
interface Button {
  label: string;
  link: string;
  isPrimary: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
  iconType: string;
}

interface Skill {
  name: string;
  iconSlug: string;
}

interface ProfileImage {
  url: string;
  altText: string;
  captionTitle: string;
  captionSubtitle: string;
}

interface HeroSectionType {
  welcomeText: string;
  fullName: string;
  roles: string[];
  description: string;
  buttons: Button[];
  socialLinks: SocialLink[];
  skills: Skill[];
  profileImage: ProfileImage;
}

/* ---------------- COMPONENT ---------------- */
const HeroSection = () => {
  const [data, setData] = useState<HeroSectionType | null>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  /* -------- FETCH DATA -------- */
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      const hero = res?.fields?.hero?.heroSection;
      setData(hero);
    };
    fetchData();
  }, []);

  /* -------- TYPEWRITER EFFECT -------- */
  useEffect(() => {
    if (!data?.roles) return;

    const roles = data.roles;
    const current = roles[roleIndex];

    let timer: any;

    if (!deleting && displayed.length < current.length) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 100);
    } else if (!deleting && displayed.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 60);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIndex, data]);

  if (!data) return null;

  return (
    <section id="home" className="w-full">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1200px] flex-col items-center gap-12 px-10 py-20 lg:flex-row lg:justify-between">
        {/* LEFT CONTENT */}
        <div className="w-full max-w-2xl">
          <p className="text-xs tracking-[0.3em] text-[var(--text-muted)]">
            {data.welcomeText}
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Hi, I'm{" "}
            <span className="text-[var(--primary)]">{data.fullName}</span>
            <br />a{" "}
            <span className="border-r-2 border-[var(--primary)] pr-1">
              {displayed}
            </span>
          </h1>

          <p className="mt-6 text-[15px] text-[var(--text-muted)]">
            {data.description}
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4 ">
            {data.buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.link}
                className={`btn btn-neumorphic ${
                  btn.isPrimary ? "" : "text-[var(--text-primary)]"
                }`}
              >
                {btn.label}
              </a>
            ))}
          </div>

          {/* SOCIAL + SKILLS */}
          <div className="mt-12 flex flex-col md:flex-row gap-12">
            {/* SOCIAL */}
            <div>
              <p className="mb-4 text-xs tracking-[0.3em] uppercase">
                FIND WITH ME
              </p>

              <div className="flex gap-3 ">
                {data.socialLinks.map((item, i) => {
                  const Icon =
                    item.platform === "Facebook"
                      ? FacebookIcon
                      : item.platform === "Instagram"
                        ? InstagramIcon
                        : LinkedInIcon;

                        

                  return (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      className="grid hover:scale-110 hover:translate-y-1 transition-all duration-300 h-12 w-12 place-items-center rounded bg-[var(--surface)] shadow"
                    >
                      
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* SKILLS */}
            <div>
              <p className="mb-4 text-xs tracking-[0.3em] uppercase">
                BEST SKILL ON
              </p>

              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, i) => {
                  const Icon = iconMap[skill.iconSlug];

                  return (
                    <div
                      key={i}
                      className="group grid h-12 w-12 place-items-center rounded bg-[var(--surface)] shadow"
                      title={skill.name}
                    >
                      {Icon && (
                        <Icon
                          className="transition-all duration-200 group-hover:scale-130 hover:text-[var(--primary)]"
                          size={20}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-[350px]">
          <TiltCard className="p-5 bg-[var(--surface)] rounded-lg shadow">
            <div className="relative aspect-[4/5] w-full mb-4 overflow-hidden rounded">
              <Image
                src={data.profileImage.url}
                alt={data.profileImage.altText}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            <h4 className="text-center font-bold">
              {data.profileImage.captionTitle}
            </h4>

            <p className="text-center text-sm text-[var(--text-muted)]">
              {data.profileImage.captionSubtitle}
            </p>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
