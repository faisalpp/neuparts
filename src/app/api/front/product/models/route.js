import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ProductCategory from '@/models/productcategory';

export async function GET(req) {
  await connect();

  const models = await ProductCategory.find().select('model_no').distinct('model_no');

  const modelNos = models.filter((model) => model.model_no !== null);

  return NextResponse.json({ success: true, modelNos });
}
