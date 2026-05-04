import { NextResponse } from "next/server";
import { getContentfulClient } from "@/lib/contentful";

export async function GET() {
  try {
    const client = getContentfulClient();
    const res = await client.getEntries({
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
