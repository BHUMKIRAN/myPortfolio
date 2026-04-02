"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users } from "lucide-react";
import Link from "next/link";
import EasterEggTerminal from "@/components/tools/EsterEgg";
import InteractiveAvatar from "@/components/tools/Avatar";
import SnakeGame from "@/components/tools/SnakeGame";
import TicTacToe from "@/components/tools/Tictak";
import RockPaperScissors from "@/components/tools/TicTac";

const ClientsPage = () => {
    return (
        <>
            <Navbar />

            <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-[var(--bg)]">
                <div className="mb-6">
                    <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-[var(--surface)] shadow-[var(--shadow-neo)]">
                        <Users size={48} className="text-[var(--primary)]" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
                    No Clients Yet
                </h1>
             

              

                <button
                
                    className="btn-neumorphic"
                >
                    <Link href="/contact ">
                    Be My First Client
                    </Link>
                </button>
            </main>

            <Footer />
        </>
    );
};

export default ClientsPage;