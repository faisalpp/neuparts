import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import TeamMember from '@/models/teamMembers';

export async function POST(request) {
    try {
    await connect();
    const { members } = await request.json();
  
        await Promise.all(
          members.map(async (cat) => {
            await TeamMember.findByIdAndUpdate(cat._id, { index: cat.index });
          })
        );

      return NextResponse.json({ error: 'Team member Updated', success: true });
    } catch (error) {
      return NextResponse.json({ message: 'Something Went Wrong!', success: false });
    }
  }
  