import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { QUESTIONS_PROMPT } from "@/services/Constants";

export async function POST(req) {

    const {jobPosition, jobDescription, duration, interviewType} = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
        .replace('{{jobTitle}}', jobPosition)
        .replace('{{jobDescription}}', jobDescription)
        .replace('{{duration}}', duration) 
        .replace('{{type}}', interviewType);

    console.log(FINAL_PROMPT);

  try{
  const openai = new OpenAI({
     baseURL: "https://openrouter.ai/api/v1",
     apiKey: process.env.OPENROUTER_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: "google/gemma-3-12b-it:free",
    messages: [
      { role: "user", content: FINAL_PROMPT }
    ],
  })
  console.log(completion.choices[0].message)
  //return NextResponse.json(completion.choices[0].message);
  return NextResponse.json({ content: completion.choices[0].message.content });


    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }

}

 