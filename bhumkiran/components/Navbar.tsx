"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'FEATURES', href: '#' },
    { name: 'PORTFOLIO', href: '#' },
    { name: 'RESUME', href: '#' },
    { name: 'CLIENTS', href: '/client' },
    { name: 'PRICING', href: '/pricing' },
    { name: 'BLOG', href: '/blog' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[#dce1e4] w-full  px-10 py-5 z-[9999]">
      <div className="mx-auto flex items-center justify-between">
        
        {/* LEFT: Logo & Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#dce1e4] shadow-[var(--shadow-neo)]">
            <Image
              src="/profile.jpeg" 
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-bold tracking-widest text-[var(--text-primary)]">
            BHUM
          </span>
        </div>

        {/* CENTER: Navigation Links (Always Flex, no breakpoints) */}
        <div className="flex items-center gap-10 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="whitespace-nowrap text-[13px] font-medium tracking-wide text-[var(--text-primary)] transition-colors duration-300 hover:text-[var(--primary)]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT: CTA Button (Always Visible) */}
        <div className="shrink-0">
          <button className="btn btn-neumorphic whitespace-nowrap">
            BUY NOW
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;