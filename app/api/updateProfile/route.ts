import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      bio,
      avatar_url,
      resume_url,
      handle,
      location,
      website,
      twitter,
      skills,
      preferred_targets,
      total_bounties,
      total_rewards,
    } = body;

    // ✅ Basic validation
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // ✅ Build dynamic update object
    const updates: Record<string, any> = {};

    if (name !== undefined) updates.name = name;
    if (bio !== undefined) updates.bio = bio;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;
    if (resume_url !== undefined) updates.resume_url = resume_url;
    if (handle !== undefined) updates.handle = handle;
    if (location !== undefined) updates.location = location;
    if (website !== undefined) updates.website = website;
    if (twitter !== undefined) updates.twitter = twitter;
    if (skills !== undefined) updates.skills = skills;
    if (preferred_targets !== undefined) updates.preferred_targets = preferred_targets;
    if (total_bounties !== undefined) updates.total_bounties = total_bounties;
    if (total_rewards !== undefined) updates.total_rewards = total_rewards;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // ✅ Update the user's row (RLS must allow auth.uid() = id)
    const { error } = await supabase.from('users').update(updates).eq('id', id);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error: any) {
    console.error('Unexpected API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
