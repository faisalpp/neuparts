import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ApplianceCategories from '@/models/applianceCategories';
import HelpsCategories from '@/models/helpsCategories';

export async function POST(request) {
  await connect();
  const { cats, type } = await request.json();

  try {
    if (type === 'appliance-tips') {
      await Promise.all(
        cats.map(async (cat) => {
          await ApplianceCategories.findByIdAndUpdate(cat._id, { index: cat.index });
        })
      );
    } else if (type === 'help-and-support') {
      await Promise.all(
        cats.map(async (cat) => {
          await HelpsCategories.findByIdAndUpdate(cat._id, { index: cat.index });
        })
      );
    }
    return NextResponse.json({ error: 'Category Updated', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
