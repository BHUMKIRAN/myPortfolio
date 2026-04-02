"use client";
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer id='footer' className="w-full py-5 px-6 " style={{ background: 'var(--bg)', borderTop: '1px solid #dce1e4' }}>

      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Profile Image with Neumorphic Ring */}
        <div
          className="w-28 h-28 rounded-full p-1 mb-6 flex items-center justify-center"
          style={{
            background: 'var(--bg)',
            boxShadow: 'var(--shadow-neo)'
          }}
        >
          <img
            src="/profile.jpeg"
            alt="Bhum Bikram Silwal"
            className="w-full h-full rounded-full object-cover  transition-all duration-500"
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-2">
          <h1
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Bhum Bikram Silwal <span style={{ color: 'var(--primary)' }}>Kiran</span>
          </h1>

          <p
            className="text-lg font-medium opacity-80 uppercase tracking-widest text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Software Engineer
          </p>
        </div>

        {/* Divider Line (Inward Groove) */}
        <div
          className="w-full max-w-xs h-[2px] my-8 rounded-full"
          style={{
            background: 'var(--bg)',
            boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1), inset -1px -1px 2px rgba(255,255,255,0.8)'
          }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-6">
          {/* Social / Action Button (Using your btn-neumorphic class) */}
          <button className="btn-neumorphic">
            <Link href="/contact">Get In Touch</Link>
          </button>

          <p
            className="text-xs font-semibold tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;