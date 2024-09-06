import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

export async function POST(request) {
  const { userId, exerciseId, points, level, correct, feedback } = await request.json();
  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert([
        {
          user_id: userId,
          exercise_id: exerciseId,
          points,
          level,
          correct,
          feedback
        }
      ]);

    if (error) {
      return NextResponse.json({ error: 'Failed to update user progress', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Progress updated' });
  } catch (error) {
    console.error('Error updating user progress:', error);
    return NextResponse.json({ error: 'Failed to update user progress', details: error.message }, { status: 500 });
  }
}
