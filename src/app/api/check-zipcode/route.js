import { NextResponse } from 'next/server';
import axios from 'axios';
import connect from '@/lib/db';
import { ZipTransform } from '@/services/boundriesIO';
import ZipCode from '@/models/zipCode';

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
  let isZip = false;
  try {
    const res2 = await axios.get(url, { params, headers: { Authorization: TOKEN } });
    if (res2.data.location.zip === zip) {
      isZip = true;
    }
  } catch (error) {
    return NextResponse.json({ error: `No delivery location found for ${zip}` }, { status: error.response.status });
  }

  //  if client system has zip code then find
  if (isZip) {
    const getZip = await ZipCode.findOne({ zipCode: zip });
    if (getZip) {
      return NextResponse.json({ cords: JSON.parse(getZip.cords), zoom: getZip.zoom }, { status: 200 });
    } else {
      try {
        const data = await ZipTransform(zip);
        if (!data) {
          return NextResponse.json({ message: 'Internal Server Errorzip' }, { status: 500 });
        }
        // Create Backup for cords
        const zipToCreate = new ZipCode({
          zipCode: zip,
          cords: JSON.stringify(data.cords),
          raw: JSON.stringify(data.raw),
          country: data.country,
          city: data.city,
          state: data.state,
        });
        await zipToCreate.save();
        return NextResponse.json({ cords: data.cords, zoom: 10 }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 404 });
      }
    }
  }
}
