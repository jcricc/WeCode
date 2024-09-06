import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language');
  const difficulty = searchParams.get('difficulty');

  const prompt = `Generate a clear and concise ${difficulty} level practice question for ${language} programming. The question should be designed to practice specific coding skills or concepts. Include a properly formatted starter function using "def function_name(parameters):" syntax, detailed problem description, input and output specifications, and constraints. The question should challenge the user to think critically and solve the problem without giving away the solution. Ensure the question is engaging and educational.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const question = response.choices[0].message.content.trim();
  return NextResponse.json({ question });
}
