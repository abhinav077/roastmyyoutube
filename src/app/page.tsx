"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Flame, Sparkles, Youtube, ShieldCheck, Zap, AlertCircle, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DemoProfiles } from "@/components/DemoProfiles";
import { RoastDashboard } from "@/components/RoastDashboard";
import { UserYouTubeData, RoastResult, RoastIntensity } from "@/lib/types";
import { DemoProfile } from "@/lib/demo-data";

export default function Home() {
  const { data: session, status } = useSession();
  const [intensity, setIntensity] = useState<RoastIntensity>("savage");
  const [roastData, setRoastData] = useState<{
    roast: RoastResult;
    userData: UserYouTubeData;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("Connecting to YouTube...");
  const [error, setError] = useState<string | null>(null);

  // Automatically fetch YouTube data and roast when user signs in with Google
  useEffect(() => {
    if (status === "authenticated" && session?.accessToken && !roastData && !loading) {
      handleAutoRoastGoogleUser();
    }
  }, [status, session?.accessToken]);

  const handleAutoRoastGoogleUser = async () => {
    try {
      setLoading(true);
      setError(null);
      setLoadingStep("Connecting to YouTube Data API...");

      const ytRes = await fetch("/api/youtube");
      if (!ytRes.ok) {
        const errJson = await ytRes.json();
        throw new Error(errJson.message || "Failed to fetch YouTube data.");
      }

      const { data } = await ytRes.json();
      setLoadingStep("Cataloging subscriptions & liked videos...");

      const roastRes = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, intensity }),
      });

      if (!roastRes.ok) {
        const roastErr = await roastRes.json();
        throw new Error(roastErr.message || "Failed to generate roast.");
      }

      const { roast } = await roastRes.json();
      setRoastData({ roast, userData: data });
    } catch (err: any) {
      console.error("Auto roast failed:", err);
      setError(err.message || "An unexpected error occurred while roasting your account.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemoProfile = async (profile: DemoProfile) => {
    setLoading(true);
    setError(null);
    setLoadingStep(`Analyzing ${profile.name}'s algorithm...`);

    // Small delay to simulate roast generation if using precomputed, or we can regenerate
    setTimeout(() => {
      setRoastData({
        roast: profile.precomputedRoast,
        userData: profile.data,
      });
      setLoading(false);
    }, 600);
  };

  const handleIntensityChange = async (newIntensity: RoastIntensity) => {
    if (!roastData) return;
    setIntensity(newIntensity);
    setLoading(true);
    setLoadingStep(`Adjusting roast level to ${newIntensity.toUpperCase()}...`);

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: roastData.userData, intensity: newIntensity }),
      });

      if (res.ok) {
        const { roast } = await res.json();
        setRoastData({ roast, userData: roastData.userData });
      }
    } catch (e) {
      console.warn("Failed to regenerate with new intensity:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRoastData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-zinc-100 selection:bg-red-600 selection:text-white">
      <Navbar onReset={handleReset} showReset={!!roastData} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto my-16 animate-pulse">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 shadow-2xl shadow-red-900/50 mb-6">
              <Flame className="w-10 h-10 text-white animate-bounce" />
              <Loader2 className="w-24 h-24 text-red-500/30 absolute animate-spin" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-wider text-white mb-2">
              Roasting In Progress...
            </h2>
            <p className="text-sm font-mono text-red-400">{loadingStep}</p>
            <p className="text-xs text-zinc-500 mt-4">
              Gathering evidence from your algorithm. Please hold your dignity.
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-red-950/30 border border-red-500/50 text-center my-8 shadow-xl">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Roast Interrupted</h3>
            <p className="text-xs text-red-300 mb-4">{error}</p>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ROAST DISPLAY STATE */}
        {roastData && !loading && (
          <RoastDashboard
            roast={roastData.roast}
            data={roastData.userData}
            onIntensityChange={handleIntensityChange}
            currentIntensity={intensity}
            isRegenerating={loading}
          />
        )}

        {/* LANDING / LOGIN STATE */}
        {!roastData && !loading && (
          <div className="w-full max-w-3xl mx-auto text-center py-8 z-10 flex flex-col items-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-400 mb-6 shadow-md">
              <Flame className="w-3.5 h-3.5 text-yt-red" />
              <span>AI-Powered YouTube Algorithm Roast</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
              Find out how cooked your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yt-red via-red-500 to-amber-500">
                YouTube
              </span>{" "}
              really is.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
              One click. Zero file downloads. We automatically analyze your subscribed channels, liked videos, and abandoned playlists to give you an unfiltered diagnosis of your digital habits.
            </p>

            {/* Intensity Selector Bar */}
            <div className="mt-8 flex items-center gap-2 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800 shadow-md">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 px-3">
                Roast Spice:
              </span>
              {(["mild", "savage", "emotional_damage"] as RoastIntensity[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setIntensity(level)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    intensity === level
                      ? "bg-red-600 text-white shadow-md shadow-red-950/50"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {level === "emotional_damage" ? "💀 Emotional Damage" : level.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Main 1-Click Google OAuth Button */}
            <div className="mt-8 w-full max-w-md">
              <button
                onClick={() => signIn("google")}
                className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-yt-red text-white font-bold text-base shadow-xl shadow-red-950/60 hover:shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-95 border border-red-500/30"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <span>Sign in with Google to Roast</span>
                <Flame className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  Read-Only Access
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Instant & Automatic
                </span>
              </div>
            </div>

            {/* Instant Demo Profiles Component */}
            <DemoProfiles onSelectProfile={handleSelectDemoProfile} disabled={loading} />

            {/* How it works feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 text-left w-full">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="w-9 h-9 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center mb-3 border border-red-500/20">
                  <Youtube className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">1. Automatic Audit</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Fetches your recent liked videos and subscribed channels automatically via the YouTube Data API.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="w-9 h-9 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center mb-3 border border-red-500/20">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">2. Savage AI Analysis</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Gemini analyzes your content patterns, detects your cringe archetype, and writes a personalized roast.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="w-9 h-9 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center mb-3 border border-red-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">3. Shareable Receipt</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Exports a stylized supermarket-style taste receipt with 1-click PNG download for X, Instagram, and Discord.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

