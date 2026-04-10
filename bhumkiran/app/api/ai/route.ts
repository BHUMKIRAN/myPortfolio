import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const chat = model.startChat({
      history: messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
    });

    const result = await chat.sendMessage(
      messages[messages.length - 1].text
    );

    return Response.json({
      reply: result.response.text(),
    });
  } catch (err) {
    return Response.json({ error: "AI error" }, { status: 500 });
  }
}