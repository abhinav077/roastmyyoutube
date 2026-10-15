import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserYouTubeData, RoastIntensity, RoastResult } from "./types";

export async function generateRoast(
  data: UserYouTubeData,
  intensity: RoastIntensity = "savage"
): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== "" && !apiKey.includes("your_gemini_api_key")) {
    try {
      return await generateGeminiRoast(data, intensity, apiKey);
    } catch (err) {
      console.error("Gemini API call failed, falling back to heuristic engine:", err);
    }
  }

  // Graceful fallback to heuristic algorithmic roast engine
  return generateHeuristicRoast(data, intensity);
}

async function generateGeminiRoast(
  data: UserYouTubeData,
  intensity: RoastIntensity,
  apiKey: string
): Promise<RoastResult> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: intensity === "emotional_damage" ? 1.0 : intensity === "savage" ? 0.8 : 0.6,
    },
  });

  const subsList = data.subscriptions.map((s) => s.title).slice(0, 30).join(", ");
  const likedList = data.likedVideos.map((v) => `"${v.title}" by ${v.channelTitle}`).slice(0, 25).join("\n- ");
  const playlistList = data.playlists.map((p) => `"${p.title}" (${p.itemCount} videos)`).slice(0, 15).join(", ");

  const prompt = `You are a savage, viral stand-up comedian and algorithm critic like "Judge My Spotify" or "The Pudding", but specifically for YouTube tastes.
Your task is to ROAST this person's YouTube algorithm, subscriptions, and liked videos with merciless wit, cultural references, and psychological accuracy.

USER DATA:
- Channel Name: ${data.channel.title} (${data.channel.customUrl || "no handle"})
- Subscribed Channels (${data.subscriptions.length} total): ${subsList || "None listed"}
- Recent Liked Videos (${data.likedVideos.length} total):
- ${likedList || "None listed"}
- Custom Playlists (${data.playlists.length} total): ${playlistList || "None listed"}

ROAST INTENSITY: ${intensity.toUpperCase()}
${
  intensity === "emotional_damage"
    ? "Tone: Savage, unhinged, devastatingly funny, no mercy, call out their deepest coping mechanisms and rabbit holes."
    : intensity === "savage"
    ? "Tone: Sharp, sarcastic, witty, poke fun at their dopamine loops and guilty pleasures."
    : "Tone: Playful, teasing, light-hearted."
}

INSTRUCTIONS:
1. Directly reference 2 to 4 actual channel names and video titles from their list to make the roast sting with specificity!
2. Do NOT be generic. Notice weird contradictions (e.g., watching Andrew Huberman health optimization followed by 3 AM fast food mukbangs).
3. Return ONLY a valid JSON object matching this exact schema:
{
  "archetype": "A creative, hilarious title for their algorithm persona (e.g., 'The Over-Optimized Tech Bro In Denial', 'Chronically Online Subway Surfers Fiend')",
  "cringeScore": <number between 60 and 99>,
  "openingBurn": "A 2-3 sentence devastating introductory paragraph summarizing their YouTube consumption.",
  "subscriptionsRoast": {
    "headline": "A punchy, funny headline for their subscription choices",
    "commentary": "2-3 sentences mocking the creators they follow and how they clash or reinforce their delusion.",
    "calledOutChannels": ["Name1", "Name2", "Name3"]
  },
  "likedVideosRoast": {
    "headline": "A hilarious headline for their liked videos",
    "commentary": "2-3 sentences analyzing the specific embarrassing videos they took the time to hit like on.",
    "worstOffenders": ["Video Title 1", "Video Title 2"]
  },
  "playlistsRoast": {
    "headline": "A headline mocking their playlists or lack thereof",
    "commentary": "2 sentences breaking down what their playlist titles say about their mental state.",
    "calledOutPlaylists": ["Playlist Title 1", "Playlist Title 2"]
  },
  "metrics": [
    { "label": "Grass Touched", "value": "<percentage or metric>", "verdict": "short sarcastic note" },
    { "label": "Attention Span", "value": "<seconds/minutes>", "verdict": "short sarcastic note" },
    { "label": "Dopamine Exhaustion", "value": "<percentage>", "verdict": "short sarcastic note" },
    { "label": "Algorithm Brainrot", "value": "<percentage>", "verdict": "short sarcastic note" }
  ],
  "finalVerdict": "A closing one-liner telling them what to do with their life.",
  "topTags": ["#Tag1", "#Tag2", "#Tag3", "#Tag4"]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text) as RoastResult;
}

function generateHeuristicRoast(data: UserYouTubeData, intensity: RoastIntensity): RoastResult {
  const allTitles = [
    ...data.subscriptions.map((s) => s.title),
    ...data.likedVideos.map((v) => v.title),
    ...data.playlists.map((p) => p.title),
  ].join(" ").toLowerCase();

  const isTech = /code|programming|tech|ai|python|react|javascript|developer|saas|startup|linux|vim/i.test(allTitles);
  const isGamer = /game|gaming|minecraft|roblox|stream|speed|kai|gta|fortnite|twitch|valorant/i.test(allTitles);
  const isNightOwl = /3am|relax|lofi|rain|fall asleep|unexplained|conspiracy|documentary|history|mystery/i.test(allTitles);
  const isGymSelfHelp = /gym|workout|huberman|discipline|stoic|money|millionaire|hustle|grind/i.test(allTitles);

  const sampleChannels = data.subscriptions.slice(0, 3).map((s) => s.title);
  const sampleVideos = data.likedVideos.slice(0, 3).map((v) => v.title);
  const samplePlaylists = data.playlists.slice(0, 3).map((p) => p.title);

  const calledChannels = sampleChannels.length > 0 ? sampleChannels : ["Your Mystery Subscriptions", "The YouTube Abyss"];
  const worstVideos = sampleVideos.length > 0 ? sampleVideos : ["That 3 AM video you swore you wouldn't like", "10-Hour Loop of Questionable Decisions"];
  const calledPlaylists = samplePlaylists.length > 0 ? samplePlaylists : ["Watch Later (Never)", "Liked Videos Graveyard"];

  let archetype = "The Algorithmic Drifter";
  let cringeScore = 85;
  let openingBurn = "Your YouTube recommendations are an algorithmic hostage situation. You jump between high-effort content and pure brain nourishment for amoebas without a shred of cognitive hesitation.";

  if (isTech) {
    archetype = "The Productivity Delusionist";
    cringeScore = 91;
    openingBurn = `You watch YouTube to feel like you're building a billion-dollar startup, but your git commit history says you spent all day tweaking your code editor font.`;
  } else if (isGamer) {
    archetype = "The Chronically Online Dopamine Chaser";
    cringeScore = 94;
    openingBurn = `Your prefrontal cortex has been entirely replaced by reaction faces, 60fps screamers, and split-screen gameplay.`;
  } else if (isNightOwl) {
    archetype = "The 3:00 AM Existential Archaeologist";
    cringeScore = 88;
    openingBurn = `You don't have a viewing schedule; you have an active insomnia symptom. Normal people go to bed, but you need to know how ancient aqueducts functioned before 4 AM.`;
  } else if (isGymSelfHelp) {
    archetype = "The Alpha Protocol Consumer";
    cringeScore = 93;
    openingBurn = `You've watched 400 hours of videos on dopamine detoxing, cold showers, and monk mode, yet here you are on YouTube consuming more dopamine.`;
  }

  if (intensity === "emotional_damage") {
    cringeScore = Math.min(99, cringeScore + 6);
  } else if (intensity === "mild") {
    cringeScore = Math.max(65, cringeScore - 15);
  }

  return {
    archetype,
    cringeScore,
    openingBurn,
    subscriptionsRoast: {
      headline: "The Subscription Confession",
      commentary: `You follow ${calledChannels.join(", ")} hoping their competence will transfer to you via osmosis. It won't.`,
      calledOutChannels: calledChannels,
    },
    likedVideosRoast: {
      headline: "The Digital Paper Trail",
      commentary: `Liking "${worstVideos[0] || "random clips"}" was a conscious decision you made with your own index finger. You cannot blame the algorithm for this.`,
      worstOffenders: worstVideos,
    },
    playlistsRoast: {
      headline: "The Graveyard of Ambition",
      commentary: `Your playlists like "${calledPlaylists[0] || "Favorites"}" exist purely to archive hobbies you will abandon in 72 hours.`,
      calledOutPlaylists: calledPlaylists,
    },
    metrics: [
      { label: "Grass Touched", value: "6%", verdict: "Severe sunlight deficiency" },
      { label: "Attention Span", value: "11s", verdict: "Needs Subway Surfers underneath" },
      { label: "Algorithm Dependency", value: `${cringeScore}%`, verdict: "Sundar Pichai knows your pulse" },
      { label: "Productivity Output", value: "2%", verdict: "All consumption, zero creation" },
    ],
    finalVerdict: "Close this tab, turn off autoplay, and go talk to an actual human being without referencing a meme.",
    topTags: ["#Cooked", "#AlgorithmHostage", "#YouTubeAddict", "#NoGrass"],
  };
}

