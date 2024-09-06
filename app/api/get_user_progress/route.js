import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase'; // Correct import path

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID must be provided' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user progress:', error.message);
      return NextResponse.json({ error: 'Failed to fetch user progress', details: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: 'No user progress found', data: [] }, { status: 200 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json({ error: 'Failed to fetch user progress', details: error.message }, { status: 500 });
  }
}
