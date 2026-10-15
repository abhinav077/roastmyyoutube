import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { fetchAllUserYouTubeData } from "@/lib/youtube";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Please sign in with your Google account to access your YouTube data.",
        },
        { status: 401 }
      );
    }

    const data = await fetchAllUserYouTubeData(session.accessToken);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching YouTube data:", error);
    return NextResponse.json(
      {
        error: "YouTubeFetchError",
        message: error.message || "Failed to fetch YouTube data.",
      },
      { status: 500 }
    );
  }
}

