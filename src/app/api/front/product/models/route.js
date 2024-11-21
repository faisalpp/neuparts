import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Product from '@/models/product';

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Parse the query parameters
  const query = searchParams.get("query")?.toLowerCase() || ""; // Get the 'query' parameter

  await connect();

  const matchStage = query
    ? {
        model_no: { $regex: new RegExp(query, "i") }, // Case-insensitive partial match
      }
    : {};

  const filteredModelNos = await Product.aggregate([
    { $unwind: "$model_no" }, // Unwind each model_no into separate documents
    { $match: matchStage }, // Filter based on the query
    { $group: { _id: null, modelNos: { $addToSet: "$model_no" } } }, // Group them into a single array without duplicates
    { $project: { _id: 0, modelNos: { $slice: ["$modelNos", 20] } } }, // Limit results to 20 suggestions
  ]);

  const modelNos = filteredModelNos.length > 0 ? filteredModelNos[0].modelNos : [];

  return NextResponse.json({ success: true, modelNos });
}

