import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import TeamMember from '@/models/teamMembers';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    let query = {};

    const MemberCountPromise = TeamMember.estimatedDocumentCount(query);
    const GetMembersPromise = TeamMember.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, teamMembers] = await Promise.all([MemberCountPromise, GetMembersPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ members: teamMembers, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, role, bio, avatar } = await request.json();
    //  return  NextResponse.json({message: data,success: true})
    await connect();

    const isCreated = await TeamMember.create({
      name,
      role,
      bio,
      avatar,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Team Member Created!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, name, role, bio, avatar } = await request.json();
    //  return  NextResponse.json({message: data,success: true})
    await connect();

    const isCreated = await TeamMember.findByIdAndUpdate(id, {
      name,
      role,
      bio,
      avatar,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Team Member Updated!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (id === '') {
      return NextResponse.json({ message: 'Member ID required!', success: false });
    }

    await connect();

    await TeamMember.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Team Member Deleted!', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
