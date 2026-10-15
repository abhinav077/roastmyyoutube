"use client";

import React, { useState, useEffect } from "react";
import {
  Flame,
  Radio,
  ThumbsUp,
  FolderHeart,
  TrendingDown,
  Sparkles,
  Receipt,
  RotateCcw,
  Tag,
  AlertTriangle,
} from "lucide-react";
import { RoastResult, UserYouTubeData, RoastIntensity } from "@/lib/types";
import { ReceiptCard } from "./ReceiptCard";
import confetti from "canvas-confetti";
import Image from "next/image";

interface RoastDashboardProps {
  roast: RoastResult;
  data: UserYouTubeData;
  onIntensityChange?: (newIntensity: RoastIntensity) => void;
  currentIntensity: RoastIntensity;
  isRegenerating?: boolean;
}

export function RoastDashboard({
  roast,
  data,
  onIntensityChange,
  currentIntensity,
  isRegenerating,
}: RoastDashboardProps) {
  const [activeTab, setActiveTab] = useState<"cards" | "receipt">("cards");

  useEffect(() => {
    // Fire celebratory satirical confetti on load
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#FF0000", "#FF4500", "#FFA500", "#FFFFFF"],
      });
    } catch (e) {
      // safe fallback
    }
  }, [roast.archetype]);

  const getCringeColor = (score: number) => {
    if (score >= 90) return "text-red-500 border-red-500/50 bg-red-950/30";
    if (score >= 75) return "text-orange-500 border-orange-500/50 bg-orange-950/30";
    return "text-yellow-500 border-yellow-500/50 bg-yellow-950/30";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-receipt-in">
      {/* Top Profile Summary Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl mb-8">
        <div className="flex items-center gap-4">
          {data.channel.avatarUrl ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-red-500 shadow-lg shadow-red-950/50">
              <Image
                src={data.channel.avatarUrl}
                alt={data.channel.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-red-900/80 text-white flex items-center justify-center font-bold text-xl border-2 border-red-500">
              {data.channel.title[0]}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {data.channel.title}
              </h2>
              {data.channel.customUrl && (
                <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  {data.channel.customUrl}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Analyzed {data.subscriptions.length} subscriptions • {data.likedVideos.length} liked videos • {data.playlists.length} playlists
            </p>
          </div>
        </div>

        {/* Cringe Meter Badge */}
        <div className={`flex items-center gap-3 px-5 py-2.5 rounded-xl border ${getCringeColor(roast.cringeScore)}`}>
          <div className="text-right">
            <span className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400">
              CRINGE SCORE
            </span>
            <span className="text-2xl font-black font-mono tracking-tight leading-none">
              {roast.cringeScore}
              <span className="text-xs font-normal text-zinc-400">/100</span>
            </span>
          </div>
          <Flame className="w-7 h-7 animate-bounce text-red-500" />
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("cards")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "cards"
                ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Interactive Roast</span>
          </button>
          <button
            onClick={() => setActiveTab("receipt")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "receipt"
                ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Shareable Receipt</span>
          </button>
        </div>

        {/* Spice Intensity Selector */}
        {onIntensityChange && (
          <div className="hidden sm:flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            {(["mild", "savage", "emotional_damage"] as RoastIntensity[]).map((level) => (
              <button
                key={level}
                onClick={() => onIntensityChange(level)}
                disabled={isRegenerating}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-all ${
                  currentIntensity === level
                    ? "bg-zinc-800 text-red-400 font-bold border border-red-500/30 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {level === "emotional_damage" ? "💀 Damage" : level}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Tab View */}
      {activeTab === "receipt" ? (
        <ReceiptCard roast={roast} data={data} />
      ) : (
        <div className="space-y-6">
          {/* Archetype Hero Card */}
          <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-2 border-red-500/40 shadow-2xl glow-red">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 fill-red-400" />
              <span>Diagnosed Algorithm Persona</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              {roast.archetype}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-medium leading-relaxed italic border-l-4 border-red-500 pl-4 py-1">
              "{roast.openingBurn}"
            </p>

            {/* Top Hashtags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {roast.topTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 text-xs font-mono text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700/60"
                >
                  <Tag className="w-3 h-3 text-red-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sarcastic Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {roast.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  {metric.label}
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-white my-1.5">
                  {metric.value}
                </span>
                <span className="text-[11px] text-red-400/90 font-medium leading-tight">
                  {metric.verdict}
                </span>
              </div>
            ))}
          </div>

          {/* Detailed Callout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subscriptions Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-red-400 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
                  <Radio className="w-4 h-4" />
                  <span>Subscriptions Roast</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {roast.subscriptionsRoast.headline}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  {roast.subscriptionsRoast.commentary}
                </p>
              </div>

              {roast.subscriptionsRoast.calledOutChannels.length > 0 && (
                <div className="pt-3 border-t border-zinc-800/80">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1.5">
                    Flagged Creators:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {roast.subscriptionsRoast.calledOutChannels.map((ch, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700 font-mono"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Liked Videos Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-red-400 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
                  <ThumbsUp className="w-4 h-4" />
                  <span>The Liked Videos Evidence</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {roast.likedVideosRoast.headline}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  {roast.likedVideosRoast.commentary}
                </p>
              </div>

              {roast.likedVideosRoast.worstOffenders.length > 0 && (
                <div className="pt-3 border-t border-zinc-800/80">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1.5">
                    Incriminating Videos:
                  </span>
                  <div className="space-y-1">
                    {roast.likedVideosRoast.worstOffenders.slice(0, 3).map((vid, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-zinc-300 bg-zinc-800/60 p-1.5 rounded border border-zinc-800 truncate"
                        title={vid}
                      >
                        • {vid}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Playlists Judgment */}
          {roast.playlistsRoast && (
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex items-center gap-2 text-red-400 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
                <FolderHeart className="w-4 h-4" />
                <span>Playlist Delusions</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {roast.playlistsRoast.headline}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                {roast.playlistsRoast.commentary}
              </p>
              {roast.playlistsRoast.calledOutPlaylists.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {roast.playlistsRoast.calledOutPlaylists.map((pl, idx) => (
                    <span
                      key={idx}
                      className="text-xs italic bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded border border-zinc-700/60"
                    >
                      📁 "{pl}"
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Final Verdict Banner */}
          <div className="p-6 rounded-2xl bg-red-950/20 border-2 border-red-500/30 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block mb-1">
                Final Prescription & Verdict
              </span>
              <p className="text-base text-zinc-200 font-medium">
                {roast.finalVerdict}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

