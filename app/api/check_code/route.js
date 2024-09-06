import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '../../lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { code, question } = await request.json();

  const prompt = `You are a code interpreter. Run the following code and check if it solves the problem correctly. If it does, return "correct", otherwise return "incorrect".\n\nQuestion: ${question}\n\nCode:\n${code}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
    temperature: 0,
    max_tokens: 300,
  });

  const result = response.choices[0].message.content.trim().toLowerCase();
  const isCorrect = result.includes('correct');

  return NextResponse.json({ correct: isCorrect, feedback: result });
}
