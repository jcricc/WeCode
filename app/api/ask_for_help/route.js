import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { question, helpQuery } = await request.json();
  const prompt = `You are helping a user with a programming problem. Here is the main question they are working on:\n\n${question}\n\nNow, they have the following specific question:\n\n${helpQuery}\n\nPlease provide a clear, concise, and helpful response to assist them. Include detailed explanations and examples where necessary.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
    temperature: 1,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const helpResponse = response.choices[0].message.content.trim();
  return NextResponse.json({ response: helpResponse });
}
