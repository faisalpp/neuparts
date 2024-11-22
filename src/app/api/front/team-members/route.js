import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import TeamMember from '@/models/teamMembers';

export async function GET() {
  try {
    await connect();

    const teamMembers = await TeamMember.find({}).sort({index:-1});

    return NextResponse.json({ members: teamMembers, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
