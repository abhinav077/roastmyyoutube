import React from "react";
import { Flame, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-yt-border bg-black/60 py-8 px-4 text-center text-xs text-zinc-500">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
          <Flame className="w-4 h-4 text-yt-red" />
          <span>ROAST MY YOUTUBE</span>
          <span>•</span>
          <span>Emotional Damage Guaranteed</span>
        </div>
        <p className="max-w-md text-zinc-400 text-[11px] leading-relaxed">
          This app is purely for entertainment and satirical fun. Not affiliated with or endorsed by Google, YouTube, or Alphabet Inc. Your data is analyzed ephemerally and never stored or sold.
        </p>
        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          <span>for internet addicts everywhere</span>
        </div>
      </div>
    </footer>
  );
}

