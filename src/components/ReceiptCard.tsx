"use client";

import React, { useRef, useState } from "react";
import { Download, Share2, Check, Flame } from "lucide-react";
import { RoastResult, UserYouTubeData } from "@/lib/types";
import { toPng } from "html-to-image";

interface ReceiptCardProps {
  roast: RoastResult;
  data: UserYouTubeData;
}

export function ReceiptCard({ roast, data }: ReceiptCardProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `roast-my-youtube-${data.channel.title.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate receipt image:", err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyText = () => {
    const text = `🔥 ROAST MY YOUTUBE RECEIPT 🔥\n\n` +
      `User: ${data.channel.title}\n` +
      `Archetype: ${roast.archetype}\n` +
      `Cringe Score: ${roast.cringeScore}/100\n` +
      `Opening Burn: "${roast.openingBurn}"\n\n` +
      `Worst Liked Videos:\n` +
      roast.likedVideosRoast.worstOffenders.map((v) => `• ${v}`).join("\n") +
      `\n\nVerdict: ${roast.finalVerdict}\n\n` +
      `Find out how cooked your algorithm is at Roast My YouTube!`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const todayStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto my-6">
      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-4 w-full justify-end">
        <button
          onClick={handleCopyText}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy Summary"}</span>
        </button>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-white bg-yt-red hover:bg-yt-hover transition-colors shadow-md shadow-red-950/40 disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{downloading ? "Printing..." : "Save Receipt (PNG)"}</span>
        </button>
      </div>

      {/* The Printable Receipt Card */}
      <div
        ref={receiptRef}
        className="w-full bg-[#faf8f5] text-[#1c1b1a] font-mono p-6 sm:p-7 rounded-sm shadow-2xl border-t-8 border-yt-red relative select-none"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Header */}
        <div className="text-center border-b-2 border-dashed border-zinc-400 pb-4 mb-4">
          <div className="flex items-center justify-center gap-1.5 font-black text-lg tracking-wider text-black">
            <Flame className="w-5 h-5 text-red-600 fill-red-600 inline" />
            <span>ROAST MY YOUTUBE</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
            ALGORITHM AUDIT & RAP SHEET
          </p>
          <div className="flex justify-between text-[11px] text-zinc-600 mt-3 pt-2 border-t border-dotted border-zinc-300">
            <span>DATE: {todayStr}</span>
            <span>TIME: {timeStr}</span>
          </div>
          <div className="flex justify-between text-[11px] text-zinc-600">
            <span>USER: {data.channel.title.slice(0, 20)}</span>
            <span>ORDER: #{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
        </div>

        {/* Archetype & Score */}
        <div className="py-2 text-center border-b border-dashed border-zinc-400">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            DIAGNOSED ARCHETYPE:
          </span>
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-red-700 mt-0.5">
            {roast.archetype}
          </h3>
          <div className="mt-2 inline-flex items-center gap-2 bg-zinc-900 text-white px-3 py-1 rounded text-xs font-bold">
            <span>CRINGE INDEX:</span>
            <span className="text-red-400 font-mono text-sm">{roast.cringeScore}/100</span>
          </div>
        </div>

        {/* Line Items */}
        <div className="py-3 text-[11px] space-y-2.5 border-b border-dashed border-zinc-400">
          <div className="flex justify-between font-bold border-b border-dotted border-zinc-300 pb-1">
            <span>ITEM / CRIME</span>
            <span>SEVERITY</span>
          </div>

          <div>
            <div className="flex justify-between text-zinc-900 font-semibold">
              <span>SUBSCRIPTIONS AUDIT</span>
              <span className="text-red-700">QUESTIONABLE</span>
            </div>
            <p className="text-[10px] text-zinc-600 leading-tight mt-0.5">
              Follows: {roast.subscriptionsRoast.calledOutChannels.slice(0, 3).join(", ")}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-zinc-900 font-semibold">
              <span>EVIDENCE IN LIKES</span>
              <span className="text-red-700">INCRIMINATING</span>
            </div>
            {roast.likedVideosRoast.worstOffenders.slice(0, 2).map((vid, idx) => (
              <p key={idx} className="text-[10px] text-zinc-600 leading-tight truncate mt-0.5">
                • {vid}
              </p>
            ))}
          </div>

          {roast.playlistsRoast.calledOutPlaylists.length > 0 && (
            <div>
              <div className="flex justify-between text-zinc-900 font-semibold">
                <span>ABANDONED PLAYLISTS</span>
                <span className="text-red-700">DELUSIONAL</span>
              </div>
              <p className="text-[10px] text-zinc-600 leading-tight mt-0.5">
                "{roast.playlistsRoast.calledOutPlaylists[0]}"
              </p>
            </div>
          )}
        </div>

        {/* Sarcastic Stats */}
        <div className="py-2.5 text-[11px] space-y-1 border-b border-dashed border-zinc-400">
          {roast.metrics.map((m, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-zinc-600">{m.label.toUpperCase()}:</span>
              <span className="font-bold text-zinc-900">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="py-2 text-[11px] space-y-1 border-b-2 border-dashed border-zinc-400">
          <div className="flex justify-between text-zinc-600">
            <span>SUBTOTAL DIGNITY:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>TAX (BRAIN CELLS):</span>
            <span>-100%</span>
          </div>
          <div className="flex justify-between font-black text-sm text-black pt-1">
            <span>TOTAL DAMAGE:</span>
            <span>IRREVERSIBLE</span>
          </div>
        </div>

        {/* Verdict & Barcode */}
        <div className="pt-4 text-center">
          <p className="text-[10px] italic text-zinc-700 px-2 leading-snug">
            "{roast.finalVerdict}"
          </p>

          {/* Faux Barcode */}
          <div className="mt-4 flex flex-col items-center justify-center">
            <div className="flex items-center gap-[2px] h-9">
              {[2, 1, 3, 1, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4, 1, 2].map(
                (w, idx) => (
                  <div
                    key={idx}
                    className="bg-black h-full"
                    style={{ width: `${w}px` }}
                  />
                )
              )}
            </div>
            <span className="text-[9px] tracking-widest text-zinc-600 mt-1 font-mono">
              ROAST-YT-{roast.cringeScore}-99281-OK
            </span>
          </div>

          <p className="text-[9px] uppercase tracking-wider text-zinc-500 mt-3 font-semibold">
            THANK YOU FOR WASTING YOUR YOUTH. PLEASE TOUCH GRASS.
          </p>
        </div>
      </div>
    </div>
  );
}

