import { NextResponse } from 'next/server';
import axios from 'axios';
import connect from '@/lib/db';

export async function GET(req, res) {
  await connect();
  const zip = req.nextUrl.searchParams.get('zip');

  if (!zip) {
    return NextResponse.json({ message: 'Zip Code Not Found!' }, { status: 404 });
  }

  // Check from zip code availability from clients system
  let url = `${process.env.POSTMAN_ZIP_CODE_API_HOST}/web-api/delivery/nearest-slot`;
  const params = { start_date: '2023-04-19', zip: zip };
  const TOKEN = `Bearer ${process.env.POSTMAN_ZIP_CODE_API_KEY}`;
  
  try {
    const res2 = await axios.get(url, { params, headers: { Authorization: TOKEN } });
    const data = res2.data
    return NextResponse.json({ data:data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `No delivery location found for ${zip}` }, { status: error.response.status });
  }

}
