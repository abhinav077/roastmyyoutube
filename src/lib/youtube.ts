import {
  UserYouTubeData,
  YouTubeChannel,
  YouTubeSubscriptionItem,
  YouTubeVideoItem,
  YouTubePlaylistItem,
} from "./types";

const YT_BASE = "https://www.googleapis.com/youtube/v3";

export async function fetchUserChannel(accessToken: string): Promise<YouTubeChannel> {
  const res = await fetch(`${YT_BASE}/channels?part=snippet,statistics&mine=true`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch channel: ${res.statusText}`);
  }

  const json = await res.json();
  const item = json.items?.[0];

  return {
    id: item?.id || "unknown-channel",
    title: item?.snippet?.title || "YouTube Viewer",
    customUrl: item?.snippet?.customUrl,
    avatarUrl: item?.snippet?.thumbnails?.high?.url || item?.snippet?.thumbnails?.default?.url,
    subscriberCount: item?.statistics?.subscriberCount || "0",
  };
}

export async function fetchSubscriptions(
  accessToken: string,
  maxResults = 50
): Promise<YouTubeSubscriptionItem[]> {
  const res = await fetch(
    `${YT_BASE}/subscriptions?part=snippet&mine=true&maxResults=${maxResults}&order=relevance`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    console.warn("Could not fetch subscriptions:", res.statusText);
    return [];
  }

  const json = await res.json();
  return (
    json.items?.map((item: any) => ({
      channelId: item.snippet?.resourceId?.channelId || "",
      title: item.snippet?.title || "Unknown Channel",
      thumbnail: item.snippet?.thumbnails?.default?.url,
    })) || []
  );
}

export async function fetchLikedVideos(
  accessToken: string,
  maxResults = 50
): Promise<YouTubeVideoItem[]> {
  // 'LL' is YouTube's internal playlist ID for user's Liked Videos
  const res = await fetch(
    `${YT_BASE}/playlistItems?part=snippet,contentDetails&playlistId=LL&maxResults=${maxResults}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    console.warn("Could not fetch liked videos (might be private/empty):", res.statusText);
    return [];
  }

  const json = await res.json();
  return (
    json.items?.map((item: any) => ({
      id: item.contentDetails?.videoId || item.id,
      title: item.snippet?.title || "Untitled Video",
      channelTitle: item.snippet?.videoOwnerChannelTitle || item.snippet?.channelTitle || "Unknown",
      thumbnail: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url,
      publishedAt: item.snippet?.publishedAt,
    })) || []
  );
}

export async function fetchPlaylists(
  accessToken: string,
  maxResults = 25
): Promise<YouTubePlaylistItem[]> {
  const res = await fetch(
    `${YT_BASE}/playlists?part=snippet,contentDetails&mine=true&maxResults=${maxResults}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    console.warn("Could not fetch playlists:", res.statusText);
    return [];
  }

  const json = await res.json();
  return (
    json.items?.map((item: any) => ({
      id: item.id,
      title: item.snippet?.title || "Untitled Playlist",
      itemCount: item.contentDetails?.itemCount || 0,
    })) || []
  );
}

export async function fetchAllUserYouTubeData(accessToken: string): Promise<UserYouTubeData> {
  const [channelResult, subsResult, likesResult, playlistsResult] = await Promise.allSettled([
    fetchUserChannel(accessToken),
    fetchSubscriptions(accessToken, 50),
    fetchLikedVideos(accessToken, 50),
    fetchPlaylists(accessToken, 25),
  ]);

  const channel: YouTubeChannel =
    channelResult.status === "fulfilled"
      ? channelResult.value
      : { id: "unknown", title: "YouTube User", subscriberCount: "0" };

  const subscriptions: YouTubeSubscriptionItem[] =
    subsResult.status === "fulfilled" ? subsResult.value : [];

  const likedVideos: YouTubeVideoItem[] =
    likesResult.status === "fulfilled" ? likesResult.value : [];

  const playlists: YouTubePlaylistItem[] =
    playlistsResult.status === "fulfilled" ? playlistsResult.value : [];

  return {
    channel,
    subscriptions,
    likedVideos,
    playlists,
  };
}

