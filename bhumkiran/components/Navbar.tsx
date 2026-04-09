"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "FUN", href: "/fun" },
    { name: "FEATURES", href: "/#feature" },
    { name: "PORTFOLIO", href: "/#portfolio" },
    { name: "RESUME", href: "/#resume" },
    { name: "BLOG", href: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--bg)] border-b border-[#dce1e4] px-4 py-4">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center ml-5 gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#dce1e4]">
            <Image
              src="/profile.jpeg"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-lg font-bold tracking-widest text-[var(--text-primary)]">
            BHUM
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-15">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--primary)]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden block text-2xl text-black"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[var(--text-primary)]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;