"use client";
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { toast } from 'sonner';


const CONTACT_TITLE = "Contact Me";
const TAGLINE = "Get In Touch";
const PHONE = "+977 986-1234567";
const EMAIL = "kiran.khatri.787@gmail.com";

const ContactPage = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                setData({ name: '', email: '', phone: '', subject: '', message: '' });
                toast.success('Message sent successfully!');
            } else {
                setStatus('error');
                toast.error('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />
            
            <div className='max-w-6xl mx-auto py-20 px-6'>
                {/* Header Section */}
                <div className="text-center mb-16">
                    <p className="text-sm font-bold uppercase tracking-[4px] mb-2" style={{ color: 'var(--primary)' }}>{TAGLINE}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{CONTACT_TITLE}</h1>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-5 gap-12'>
                    
                    {/* Left Side: Contact Info Card */}
                    <div className='lg:col-span-2 p-8 rounded-2xl h-fit' 
                         style={{ background: 'var(--bg)', boxShadow: 'var(--shadow-neo)' }}>
                        <div className="rounded-xl overflow-hidden mb-6 shadow-inner border-4 border-white/10">
                            <img 
                                src="/contact-hero.jpg" 
                                alt="Contact" 
                                className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                            />
                        </div>
                        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Bhum Bikram Silwal</h2>
                        <p className="text-[var(--text-muted)] mb-6">Software Engineer</p>
                        
                        <div className="space-y-4 mb-8">
                            <p className="flex items-center gap-3" style={{ color: 'var(--text-muted)' }}>
                                <span className="font-bold text-[var(--text-primary)] w-16 text-sm uppercase">Phone:</span>
                                <Link href={`tel:${PHONE}`} className="hover:text-[var(--primary)] transition-colors">{PHONE}</Link>
                            </p>
                            <p className="flex items-center gap-3" style={{ color: 'var(--text-muted)' }}>
                                <span className="font-bold text-[var(--text-primary)] w-16 text-sm uppercase">Email:</span>
                                <Link href={`mailto:${EMAIL}`} className="hover:text-[var(--primary)] transition-colors">{EMAIL}</Link>
                            </p>
                        </div>

                        <div>
                            <h5 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Find me on</h5>
                            <div className='flex gap-4'>
                                <Link href="https://linkedin.com" target="_blank" className="btn-neumorphic !p-3">LinkedIn</Link>
                                <Link href="https://github.com" target="_blank" className="btn-neumorphic !p-3">GitHub</Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className='lg:col-span-3 p-8 md:p-10 rounded-2xl' 
                         style={{ background: 'var(--bg)', boxShadow: 'var(--shadow-neo)' }}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="name" className="text-xs font-bold uppercase ml-2" style={{ color: 'var(--text-muted)' }}>Your Name</label>
                                    <input 
                                        type="text" id='name' name='name' value={data.name} onChange={handleChange} required 
                                        className="neumorphic-input"
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='phone' className="text-xs font-bold uppercase ml-2" style={{ color: 'var(--text-muted)' }}>Phone Number</label>
                                    <input 
                                        type="tel" id='phone' name='phone' value={data.phone} onChange={handleChange} required 
                                        className="neumorphic-input"
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email" className="text-xs font-bold uppercase ml-2" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                                <input 
                                    type="email" id='email' name='email' value={data.email} onChange={handleChange} required 
                                    className="neumorphic-input"
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="subject" className="text-xs font-bold uppercase ml-2" style={{ color: 'var(--text-muted)' }}>Subject</label>
                                <input 
                                    type="text" id='subject' name='subject' value={data.subject} onChange={handleChange} required 
                                    className="neumorphic-input"
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="message" className="text-xs font-bold uppercase ml-2" style={{ color: 'var(--text-muted)' }}>Your Message</label>
                                <textarea 
                                    id='message' name='message' rows={6} value={data.message} onChange={handleChange} required 
                                    className="neumorphic-input"
                                ></textarea>
                            </div>

                            <button 
                                type='submit' 
                                disabled={status === 'loading'}
                                className="btn-neumorphic w-full mt-4 uppercase tracking-widest disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'success' && <p className="text-green-500 text-center font-bold">Message sent successfully!</p>}
                            {status === 'error' && <p className="text-red-500 text-center font-bold">Failed to send message.</p>}
                        </form>
                    </div>

                </div>
            </div>
            
            <Footer />

            <style jsx>{`
                .neumorphic-input {
                    background: var(--bg);
                    border: none;
                    border-radius: var(--radius-md);
                    padding: 1rem;
                    color: var(--text-primary);
                    box-shadow: inset 4px 4px 8px rgba(0,0,0,0.07), 
                                inset -4px -4px 8px rgba(255,255,255,0.9);
                    outline: none;
                    transition: all 0.2s ease;
                }
                .neumorphic-input:focus {
                    box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1), 
                                inset -2px -2px 4px rgba(255,255,255,0.8);
                    border: 1px solid var(--primary);
                }
            `}</style>
        </main>
    );
};

export default ContactPage;