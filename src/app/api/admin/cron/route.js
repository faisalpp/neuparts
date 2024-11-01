import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import CronRec from '@/models/cron'

export async function GET(request) { 
 try{
    await connect()
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;
    let query = {};

    const CronCountPromise = CronRec.estimatedDocumentCount(query);
    const GetCronsPromise = CronRec.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);
    const [count, crons] = await Promise.all([CronCountPromise, GetCronsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ crons: crons, pagination: { pageCount, count }, success: true }); 
 }catch(error){
     return NextResponse.json({ message:'Something went wrong!' }, { status: 500 }); 
 }
}
