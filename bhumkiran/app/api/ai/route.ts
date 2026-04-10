import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    const prompt = `
You are a helpful assistant.
Reply in 20–30 words only.
Be short, clear, and natural.

User: ${message}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({ reply: text });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "AI error" }, { status: 500 });
  }
}