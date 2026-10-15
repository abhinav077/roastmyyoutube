import { NextRequest, NextResponse } from "next/server";
import { generateRoast } from "@/lib/roast-generator";
import { UserYouTubeData, RoastIntensity } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data: UserYouTubeData = body.data;
    const intensity: RoastIntensity = body.intensity || "savage";

    if (!data) {
      return NextResponse.json(
        { error: "InvalidRequest", message: "Missing YouTube user data." },
        { status: 400 }
      );
    }

    const roast = await generateRoast(data, intensity);

    return NextResponse.json({ success: true, roast });
  } catch (error: any) {
    console.error("Roast generation error:", error);
    return NextResponse.json(
      { error: "RoastError", message: error.message || "Failed to generate roast." },
      { status: 500 }
    );
  }
}

