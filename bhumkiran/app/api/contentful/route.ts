import { NextResponse } from "next/server";
import { Client } from "@/lib/contentful";

export async function GET() {
  try {
    const res = await Client.getEntries({
      content_type: "myPortfolio",
      limit: 1,
    });

    return NextResponse.json(res.items[0] ?? null, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Contentful fetch failed:", error);

    return NextResponse.json(
      { error: "Failed to fetch Contentful data" },
      { status: 500 }
    );
  }
}
