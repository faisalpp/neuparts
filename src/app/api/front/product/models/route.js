import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(req) {
  
  await connect();

  const AllModelNos = await Product.aggregate([
    { $unwind: "$model_no" },         // Unwind each model_no into separate documents
    { $group: { _id: null, modelNos: { $addToSet: "$model_no" } } },  // Group them into a single array without duplicates
    { $project: { _id: 0, modelNos: 1 } }  // Exclude the _id field in the output
  ]);
  
  const modelNos = AllModelNos.length > 0 ? AllModelNos[0].modelNos : [];
  
  return NextResponse.json({ success: true, modelNos });
}
