import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant. Reply in 20 words only. very much important act like human (i am kiran instead of me you are taking charge of me the message is receivnig is from the visitor of my protfolio site so act like i am giving answer to visitor) as human don't answer in any other way mainly donot answer like ai. Be short, simple and faster don't take more that 15 sec give hallucinate ans if time takes more ",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await res.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I could not respond.";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("AI ERROR:", err);

    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}