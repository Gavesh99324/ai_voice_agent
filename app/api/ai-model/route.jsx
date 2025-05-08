import { OpenAI } from "openai";

export async function POST(req) {

  const openai = new OpenAI({
     baseURL: "https://openrouter.ai/api/v1",
     apiKey: process.env.OPENROUTER_API_KEY,
  })  
}

