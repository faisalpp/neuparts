import { NextResponse } from 'next/server';
import connect from '@/lib/db';

export async function GET(req, res) {
  await connect();
  const zip = req.nextUrl.searchParams.get('zip');

  if (!zip) {
    return NextResponse.json({ message: 'Zip Code Not Found!' }, { status: 404 });
  }

  // Check from zip code availability from clients system
  const url = `${process.env.POSTMAN_ZIP_CODE_API_HOST}/web-api/delivery/nearest-slot`;
  const params = new URLSearchParams({ start_date: '2023-04-19', zip });
  const TOKEN = `Bearer ${process.env.POSTMAN_ZIP_CODE_API_KEY}`;
  
  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: { Authorization: TOKEN }
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Zip Code Not Found!' }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `No delivery location found for ${zip}` }, { status: 404 });
  }
}
