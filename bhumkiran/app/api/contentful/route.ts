import { NextResponse } from "next/server";
import { getContentfulClient } from "@/lib/contentful";

export async function GET(req : Request) {

  const searchParams = new URL(req.url).searchParams;

  const type = searchParams.get("type");
  try {
    const client = getContentfulClient();
    const res = await client.getEntries({
      content_type: type=== "blog" ? "blog" : "myPortfolio",
      limit: 1,
      include: 3,
      
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



