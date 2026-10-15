"use client";

import React from "react";
import { DEMO_PROFILES, DemoProfile } from "@/lib/demo-data";
import { Sparkles, ArrowRight } from "lucide-react";

interface DemoProfilesProps {
  onSelectProfile: (profile: DemoProfile) => void;
  disabled?: boolean;
}

export function DemoProfiles({ onSelectProfile, disabled }: DemoProfilesProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
          Instant Test Mode • No Google Login Needed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DEMO_PROFILES.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onSelectProfile(profile)}
            disabled={disabled}
            className="group flex flex-col items-start p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-red-500/50 hover:bg-zinc-800/80 transition-all text-left shadow-md hover:shadow-red-950/20 active:scale-95 disabled:opacity-50"
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span className="text-2xl">{profile.emoji}</span>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
            </div>
            <span className="font-bold text-sm text-zinc-200 group-hover:text-white">
              {profile.name}
            </span>
            <span className="text-xs text-zinc-400 font-medium mt-0.5 line-clamp-1">
              {profile.tagline}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

