"use client";

import React from "react";
import { Flame, Youtube, LogOut, RotateCcw } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

interface NavbarProps {
  onReset?: () => void;
  showReset?: boolean;
}

export function Navbar({ onReset, showReset }: NavbarProps) {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-yt-border bg-yt-dark/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onReset}
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-yt-red shadow-lg shadow-red-900/30">
            <Youtube className="w-5 h-5 text-white" />
            <Flame className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div className="text-left">
            <span className="font-black tracking-tight text-lg sm:text-xl text-white group-hover:text-red-400 transition-colors">
              ROAST <span className="text-yt-red">MY YOUTUBE</span>
            </span>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400">
              Algorithm Judgment Engine
            </span>
          </div>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {showReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Roast Another</span>
            </button>
          )}

          {session?.user && (
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full border border-red-500/50"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-red-900/50 text-red-300 flex items-center justify-center font-bold text-xs">
                  {session.user.name?.[0] || "U"}
                </div>
              )}
              <button
                onClick={() => signOut()}
                title="Sign out"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

