import { NextResponse } from 'next/server';
import { connect } from '@/DB/index';
import Categories from '@/models/productcategory';

export async function GET(req) {
  await connect();
  try {
    const categories = await Categories.find().sort({ createdAt: -1 });

    const parttypes = [
      {
        title: 'Appliances',
        slug: 'appliance',
      },
      {
        title: 'Doors',
        slug: 'delts',
      },
      {
        title: 'Belts',
        slug: 'belts',
      },
      {
        title: 'Racks',
        slug: 'racks',
      },
    ];
    const conditions = [
      {
        title: 'New',
        slug: 'new',
      },
      {
        title: 'New / Open Box',
        slug: 'new-open-box',
      },
      {
        title: 'Certified Refurbished',
        slug: 'certified-refurbished',
      },
      {
        title: 'Used • Grade A',
        slug: 'used-grade-a',
      },
      {
        title: 'Used • Grade B',
        slug: 'used-grade-b',
      },
      {
        title: 'Used • Grade C',
        slug: 'used-grade-c',
      },
    ];
    return NextResponse.json({ success: true, categories: categories, parttypes: parttypes, conditions: conditions });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: 'Error retrieving attributes' });
  }
}
