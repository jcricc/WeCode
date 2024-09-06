import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '../../lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { userId } = await request.json();
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch user progress', details: error.message }, { status: 500 });
    }

    const userProgress = data;

    const prompt = `
      You are an AI tutor. Here is the recent progress of the user:
      ${JSON.stringify(userProgress)}
      Based on this data, provide detailed feedback on what the user needs to improve on and suggest exercises to help them improve.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'system', content: prompt }],
      temperature: 1,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const feedback = response.choices[0].message.content.trim();
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Error generating personalized feedback:', error);
    return NextResponse.json({ error: 'Failed to generate personalized feedback', details: error.message }, { status: 500 });
  }
}
