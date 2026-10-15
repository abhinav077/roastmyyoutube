import { UserYouTubeData, RoastResult } from "./types";

export interface DemoProfile {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  data: UserYouTubeData;
  precomputedRoast: RoastResult;
}

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: "tech-bro",
    name: "Alex 'The Grindset' Chen",
    tagline: "Over-Optimized Tech Bro",
    emoji: "💻",
    data: {
      channel: {
        id: "demo-tech-bro",
        title: "Alex Chen | Build in Public",
        customUrl: "@alexcodesai",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        subscriberCount: "142",
      },
      subscriptions: [
        { channelId: "1", title: "Fireship" },
        { channelId: "2", title: "Andrew Huberman" },
        { channelId: "3", title: "ThePrimeagen" },
        { channelId: "4", title: "Lex Fridman" },
        { channelId: "5", title: "Alex Hormozi" },
        { channelId: "6", title: "Y Combinator" },
        { channelId: "7", title: "Theo - t3.gg" },
        { channelId: "8", title: "Naval" },
      ],
      likedVideos: [
        {
          id: "v1",
          title: "I Built an AI Micro-SaaS in 48 Hours and Made $0 (Post-Mortem)",
          channelTitle: "TechSolopreneur",
        },
        {
          id: "v2",
          title: "Optimize Your Morning: 4:30 AM Cold Plunge & Dopamine Reset",
          channelTitle: "Andrew Huberman",
        },
        {
          id: "v3",
          title: "Why Neovim Will Save Your Sanity (And Your Marriage)",
          channelTitle: "ThePrimeagen",
        },
        {
          id: "v4",
          title: "100+ VS Code Extensions You Will Install And Never Use",
          channelTitle: "Fireship",
        },
        {
          id: "v5",
          title: "How to Retire by 24 (Step 1: Get an unpaid internship at Google)",
          channelTitle: "HustleBro99",
        },
      ],
      playlists: [
        { id: "p1", title: "Monk Mode 2026", itemCount: 42 },
        { id: "p2", title: "SaaS Ideas To Never Actually Code", itemCount: 19 },
        { id: "p3", title: "Phonk / Hardstyle For 1000 WPM Coding", itemCount: 88 },
      ],
    },
    precomputedRoast: {
      archetype: "The Over-Optimized Tech Bro In Denial",
      cringeScore: 89,
      openingBurn: "Your YouTube profile looks like a LinkedIn post had an existential crisis in Silicon Valley. You don't watch videos to be entertained; you watch them to feel productive while avoiding writing a single line of actual production code.",
      subscriptionsRoast: {
        headline: "The Silicon Valley Echo Chamber",
        commentary: "Your subscriptions are a high-speed collision between Andrew Huberman's morning sunlight protocols and Fireship's 100-second panic attacks. You subscribe to Y Combinator like it's a religion, yet your greatest tech breakthrough is switching your terminal color scheme for the fourth time this week.",
        calledOutChannels: ["Andrew Huberman", "ThePrimeagen", "Fireship", "Alex Hormozi"],
      },
      likedVideosRoast: {
        headline: "Delusion In 4K Resolution",
        commentary: "Liking 'I Built an AI Micro-SaaS in 48 Hours and Made $0' alongside a 4-hour Neovim configuration video tells us everything we need to know. You've spent more hours researching cold plunges than you have shipping features to real users.",
        worstOffenders: [
          "I Built an AI Micro-SaaS in 48 Hours and Made $0 (Post-Mortem)",
          "Why Neovim Will Save Your Sanity (And Your Marriage)",
          "Optimize Your Morning: 4:30 AM Cold Plunge & Dopamine Reset",
        ],
      },
      playlistsRoast: {
        headline: "Graveyard of Good Intentions",
        commentary: "Your playlist 'Monk Mode 2026' has 42 videos in it, which proves that you've spent 40 hours curating a playlist about focus instead of actually focusing. And 'SaaS Ideas To Never Actually Code' is the most honest thing on your channel.",
        calledOutPlaylists: [
          "Monk Mode 2026",
          "SaaS Ideas To Never Actually Code",
          "Phonk / Hardstyle For 1000 WPM Coding",
        ],
      },
      metrics: [
        { label: "Grass Touched", value: "3%", verdict: "Severe photo-sensitivity" },
        { label: "Productivity Delusion", value: "98%", verdict: "Certified LinkedIn Lunatic" },
        { label: "Attention Span", value: "100s", verdict: "Only consumes Fireship" },
        { label: "Cold Plunge Compliance", value: "12%", verdict: "Shivers thinking about it" },
      ],
      finalVerdict: "Close YouTube, delete your dotfiles, and go outside. The sunlight won't charge your Huberman protocols, but it might remind you that trees exist.",
      topTags: ["#TechBro", "#DopamineGrind", "#VimObsessed", "#ZeroRevenueClub"],
    },
  },
  {
    id: "rabbit-hole",
    name: "Maya 'The 3 AM' Ramirez",
    tagline: "Midnight Rabbit Hole Connoisseur",
    emoji: "🦉",
    data: {
      channel: {
        id: "demo-rabbit-hole",
        title: "Maya's Void",
        customUrl: "@mayainthevoid",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        subscriberCount: "19",
      },
      subscriptions: [
        { channelId: "1", title: "Primitive Technology" },
        { channelId: "2", title: "Defunctland" },
        { channelId: "3", title: "Wendigoon" },
        { channelId: "4", title: "Kurzgesagt – In a Nutshell" },
        { channelId: "5", title: "Tasting History with Max Miller" },
        { channelId: "6", title: "Mark Rober" },
        { channelId: "7", title: "Noclip" },
      ],
      likedVideos: [
        {
          id: "v1",
          title: "Building an Underground Mud Villa with Secret Pool (Part 4)",
          channelTitle: "Primitive Survival Tool",
        },
        {
          id: "v2",
          title: "Disney's FastPass: A 108-Minute Structural Analysis of Nostalgia & Queues",
          channelTitle: "Defunctland",
        },
        {
          id: "v3",
          title: "What Happens If a Black Hole Enters Our Solar System While You Sleep?",
          channelTitle: "Kurzgesagt",
        },
        {
          id: "v4",
          title: "Restoring a Rusty 1914 Cast Iron Meat Grinder with Zero Commentary",
          channelTitle: "Odd Tinkering",
        },
        {
          id: "v5",
          title: "Ancient Roman Honey Garum Recipe Taste Test",
          channelTitle: "Tasting History",
        },
      ],
      playlists: [
        { id: "p1", title: "Watch To Fall Asleep But End Up Having Existential Dread", itemCount: 67 },
        { id: "p2", title: "Recipes I Will Literally Never Cook In This Lifetime", itemCount: 31 },
        { id: "p3", title: "Why Is This In My Recommended At 2:47 AM", itemCount: 104 },
      ],
    },
    precomputedRoast: {
      archetype: "The 3:00 AM Existential Dread Tourist",
      cringeScore: 82,
      openingBurn: "Your algorithm doesn't have a genre; it has a sleep disorder. You start at 11 PM planning to watch one quick video, and suddenly it's 3:42 AM and you're deeply emotionally invested in a 1914 cast-iron meat grinder restoration.",
      subscriptionsRoast: {
        headline: "From Mud Huts to Black Holes",
        commentary: "Your subscription feed is an unhinged psychological cry for help. You watch primitive builders dig mud pools in silence to soothe the anxiety given to you by Kurzgesagt telling you the universe could explode into nothingness at any second.",
        calledOutChannels: ["Defunctland", "Kurzgesagt", "Primitive Technology", "Wendigoon"],
      },
      likedVideosRoast: {
        headline: "Hypnotized By Oddities",
        commentary: "You spent nearly two hours watching a feature-length documentary about theme park queue line algorithms, followed immediately by ancient Roman fish guts sauce. Normal people sleep. You take university-level electives in random trivia you will never mention at a party.",
        worstOffenders: [
          "Disney's FastPass: A 108-Minute Structural Analysis of Nostalgia & Queues",
          "Building an Underground Mud Villa with Secret Pool (Part 4)",
          "Restoring a Rusty 1914 Cast Iron Meat Grinder with Zero Commentary",
        ],
      },
      playlistsRoast: {
        headline: "Curating The Night Terrors",
        commentary: "'Watch To Fall Asleep But End Up Having Existential Dread' is 67 videos of self-sabotage. You don't need a white noise machine; you need a screen-time lock and a melatonin gummy.",
        calledOutPlaylists: [
          "Watch To Fall Asleep But End Up Having Existential Dread",
          "Why Is This In My Recommended At 2:47 AM",
          "Recipes I Will Literally Never Cook In This Lifetime",
        ],
      },
      metrics: [
        { label: "REM Sleep Achieved", value: "0 hrs", verdict: "Cornea drying out" },
        { label: "Random Trivia Level", value: "99%", verdict: "Unusable at normal dinners" },
        { label: "Mud Hut Engineering Skill", value: "100%", verdict: "Has never touched soil" },
        { label: "Circadian Rhythm", value: "Deceased", verdict: "Algorithm controls heart rate" },
      ],
      finalVerdict: "Put down the phone. No, you do not need to know how Victorian wallpaper poisoned people before you close your eyes.",
      topTags: ["#3AMRabbitHole", "#InsomniaCrew", "#DefunctlandTruther", "#ExistentialVibes"],
    },
  },
  {
    id: "brainrot-gamer",
    name: "Tyler 'Skibidi' Jones",
    tagline: "Chronically Online Dopamine Chaser",
    emoji: "💀",
    data: {
      channel: {
        id: "demo-brainrot",
        title: "xX_ShadowGamer_Xx",
        customUrl: "@tylergaming2026",
        avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
        subscriberCount: "11",
      },
      subscriptions: [
        { channelId: "1", title: "IShowSpeed" },
        { channelId: "2", title: "Kai Cenat" },
        { channelId: "3", title: "MoistCr1TiKaL" },
        { channelId: "4", title: "Asmongold Clips" },
        { channelId: "5", title: "Ludwig" },
        { channelId: "6", title: "Daily Dose Of Internet" },
        { channelId: "7", title: "Jschlatt" },
      ],
      likedVideos: [
        {
          id: "v1",
          title: "I Survived 100 Days in Minecraft But Everything Is Brainrot (IMPOSSIBLE)",
          channelTitle: "GamerSigma",
        },
        {
          id: "v2",
          title: "Bro Think He The Thinker 💀💀 (Try Not To Laugh V14)",
          channelTitle: "MemeVault",
        },
        {
          id: "v3",
          title: "Subway Surfers Gameplay With Reddit Stories Underneath (2 Hours Relaxing)",
          channelTitle: "SplitScreenDopamine",
        },
        {
          id: "v4",
          title: "Reacting To Someone Reacting To My Reaction Video",
          channelTitle: "MetaReactionGuy",
        },
        {
          id: "v5",
          title: "Speed Barking At A Real Dog In Public For 10 Minutes Straight",
          channelTitle: "SpeedClipsDaily",
        },
      ],
      playlists: [
        { id: "p1", title: "Certified Hood Classics", itemCount: 120 },
        { id: "p2", title: "Watch While Eating Cereal", itemCount: 53 },
        { id: "p3", title: "Sigma Edits (Totally Ironic I Swear)", itemCount: 37 },
      ],
    },
    precomputedRoast: {
      archetype: "The Chronically Online Brainrot Fiend",
      cringeScore: 96,
      openingBurn: "Your brain is running on 30% battery and 70% Subway Surfers footage. If a video doesn't have soap cutting, kinetic sand, and a robotic text-to-speech voice reading an unverified Reddit divorce story, your prefrontal cortex shuts down completely.",
      subscriptionsRoast: {
        headline: "Dopamine Receptor Massacre",
        commentary: "Your subscription list is basically the Twitch lobby of chaos. You follow streamers who spend half their broadcast screaming into a microphone and the other half reacting to someone who is reacting to them.",
        calledOutChannels: ["IShowSpeed", "Kai Cenat", "MoistCr1TiKaL", "Asmongold Clips"],
      },
      likedVideosRoast: {
        headline: "Evidence For The Prosecution",
        commentary: "You liked 'Subway Surfers Gameplay With Reddit Stories Underneath (2 Hours Relaxing)'. You literally cannot consume narrative content without an animated cartoon boy dodging trains beneath it. The neurological damage is irreversible.",
        worstOffenders: [
          "Subway Surfers Gameplay With Reddit Stories Underneath (2 Hours Relaxing)",
          "Bro Think He The Thinker 💀💀 (Try Not To Laugh V14)",
          "I Survived 100 Days in Minecraft But Everything Is Brainrot (IMPOSSIBLE)",
        ],
      },
      playlistsRoast: {
        headline: "The Cereal Graveyard",
        commentary: "Your 'Watch While Eating Cereal' playlist is essentially a coping mechanism for being alone with your thoughts for eight minutes while chewing granola.",
        calledOutPlaylists: [
          "Watch While Eating Cereal",
          "Sigma Edits (Totally Ironic I Swear)",
          "Certified Hood Classics",
        ],
      },
      metrics: [
        { label: "Attention Span", value: "4.2s", verdict: "Goldfish outperforming" },
        { label: "Brainrot Saturation", value: "96%", verdict: "Only speaks in skull emojis" },
        { label: "Subway Surfers Need", value: "Critical", verdict: "Required to read this sentence" },
        { label: "Grass Proximity", value: "-12m", verdict: "Subterranean gamer dungeon" },
      ],
      finalVerdict: "Please look out of a window. Notice how real life doesn't have Minecraft parkour rendered underneath it. Good luck adjusting.",
      topTags: ["#BrainrotSurvivor", "#SubwaySurfersAddict", "#SkullEmoji", "#Cooked"],
    },
  },
];

