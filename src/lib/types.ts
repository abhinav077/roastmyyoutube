export interface YouTubeChannel {
  id: string;
  title: string;
  customUrl?: string;
  avatarUrl?: string;
  subscriberCount?: string;
}

export interface YouTubeVideoItem {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail?: string;
  publishedAt?: string;
}

export interface YouTubeSubscriptionItem {
  channelId: string;
  title: string;
  thumbnail?: string;
}

export interface YouTubePlaylistItem {
  id: string;
  title: string;
  itemCount?: number;
}

export interface UserYouTubeData {
  channel: YouTubeChannel;
  subscriptions: YouTubeSubscriptionItem[];
  likedVideos: YouTubeVideoItem[];
  playlists: YouTubePlaylistItem[];
}

export type RoastIntensity = "mild" | "savage" | "emotional_damage";

export interface RoastResult {
  archetype: string;
  cringeScore: number;
  openingBurn: string;
  subscriptionsRoast: {
    headline: string;
    commentary: string;
    calledOutChannels: string[];
  };
  likedVideosRoast: {
    headline: string;
    commentary: string;
    worstOffenders: string[];
  };
  playlistsRoast: {
    headline: string;
    commentary: string;
    calledOutPlaylists: string[];
  };
  metrics: {
    label: string;
    value: string;
    verdict: string;
  }[];
  finalVerdict: string;
  topTags: string[];
}

