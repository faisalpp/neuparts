import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ModelNo from '@/models/modelno';

export async function GET(req) {
  
  await connect();

  const modelNos = await ModelNo.find().select('model_no');

  return NextResponse.json({ success: true, modelNos });
}
