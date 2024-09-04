import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Coupon from '@/models/coupon';
import * as Yup from 'yup';

export async function GET(request) {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');

    const page = searchParams.get('page') || 1;
    const skip = (page - 1) * limit;

    let query = {};

    const CouponCountPromise = Coupon.estimatedDocumentCount(query);
    const GetCouponsPromise = Coupon.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const [count, coupons] = await Promise.all([CouponCountPromise, GetCouponsPromise]);

    const pageCount = Math.ceil(count / limit);

    return NextResponse.json({ coupons: coupons, pagination: { pageCount, count }, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {

  await connect();

  const ValCoupon = Yup.object({
    code: Yup.string().required('Code is required!'),
    description: Yup.string().required('Description is required!'),
    type: Yup.string().required('Type is required!'),
    value: Yup.string().required('Value is required!'),
  });

  const { code,description,type, value } = await request.json();
  await ValCoupon.validate({ code,description,type,value }, { abortEarly: false });

  const isCode = await Coupon.findOne({code:code})
  if(isCode){
    return NextResponse.json({ message: 'Coupon already exist!', success: false });
  }


    const isCreated = await Coupon.create({
      code,description,type,value
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Coupon code Created!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
  await connect();

  const ValCoupon = Yup.object({
    id: Yup.string().required('Review id is required!'),
    code: Yup.string().required('Code is required!'),
    description: Yup.string().required('Description is required!'),
    type: Yup.string().required('Type is required!'),
    value: Yup.string().required('Value is required!'),
  });

    const { id,code,description, type,value } = await request.json();
    await ValCoupon.validate({ id,code,description, type,value }, { abortEarly: false });

    const isCode = await Coupon.findOne({code:code})
    if(isCode){
      return NextResponse.json({ message: 'Coupon code already exist!', success: false });
    }

    const isUpdated = await Coupon.findByIdAndUpdate(id, {
      code,description,type,value
    });

    if (isUpdated) {
      return NextResponse.json({ message: 'Coupon Updated!', success: true });
    }
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (id === '') {
      return NextResponse.json({ message: 'Coupon ID required!', success: false });
    }

    await connect();

    await Coupon.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Coupon Deleted!', success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Something Went Wrong!', success: false });
  }
}
