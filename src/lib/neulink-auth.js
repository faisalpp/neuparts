import { NextResponse } from 'next/server';
import Neulink from '@/models/neulink'
import { generateSlug } from '@/utils/index';
import ProductCategory from '@/models/productcategory'
import Product from '@/models/product'
import PartType from '@/models/producttype'
import Manufacturer from '@/models/productManufacturer'
import connect from '@/lib/db';
import CronRec from '@/models/cron'

export async function LoginAndUpdateToken(email,password,id){
 try{
 await connect()
 const loginUrl = 'https://neulinkapi.neuappliances.com/api/login'
 const login = await fetch(loginUrl,{
     method:'POST',
     headers: {'Content-Type': 'application/json' },
     body:JSON.stringify({email,password})
 });
 if(!login.ok){
   return {status:false};
 }
 const loginRes = await login.json()
 
 const newLogin = await Neulink.findOneAndUpdate(id,{token:loginRes.token,valid_until:loginRes.valid_until},{new:true})
 
 return {id:newLogin._id,token:newLogin.token,updatedAfter:newLogin.updated_after,status:true}
 }catch(error){
  await CronRec.create({msg:'Login and token update failed!',body:JSON.stringify(error),status:false})
  return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
 }
}


export async function LoginAndCreateToken(email,password){
try{
  await connect()
 const loginUrl = 'https://neulinkapi.neuappliances.com/api/login'
 const login = await fetch(loginUrl,{
     method:'POST',
     headers: {'Content-Type': 'application/json' },
     body:JSON.stringify({email,password})
 });
 if(!login.ok){
   return {status:false};
 }
 const loginRes = await login.json()

 const newLogin2 = await Neulink.create({token:loginRes.token,valid_until:loginRes.valid_until})
 
 return {id:newLogin2._id,token:loginRes.token,status:true}
 }catch(error){
  await CronRec.create({msg:'Login and retrive token failed!',body:JSON.stringify(error),status:false})
  return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
 }
}



export async function GetProductCategoryId(title){
 try{
  await connect()
  let slug = generateSlug(title);
  const isCat = await ProductCategory.findOne({slug:slug})
  if(isCat){
    return isCat._id;
  }else{
   const newSlug = generateSlug(title);
   const newCat = await ProductCategory.create({title:title,slug:newSlug,isvisible:false,thumbnail:'/no-image.webp'})
   return newCat._id
  }
 }catch(error){
  await CronRec.create({msg:'Retriving product category failed!',body:JSON.stringify(error),status:false})
  return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
 }
}


export async function GetProductSlug(title) {
try{
  await connect()
  let slug = generateSlug(title);
  const regex = new RegExp(`^${slug}-\\d+$`);

  const blogCount = await Product.countDocuments({ slug: regex });
  if (blogCount > 0) {
    let inc = parseInt(blogCount) + 1;
    slug = slug + `-${inc}`;
  }

  const exactMatch = await Product.countDocuments({ slug: slug });
  if (exactMatch > 0) {
    slug = slug + `-1`;
  }

  return slug;
 }catch(error){
  await CronRec.create({msg:'Creating product slug failed!',body:JSON.stringify(error),status:false})
  return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
 }
}


export async function CreateGetPartType(title){
 try{
  await connect()
  let slug = generateSlug(title);
  const isPart = await PartType.findOne({slug:slug})
  if(isPart){
    return isPart._id;
  }else{
   const newSlug = generateSlug(title);
   const newPart = await PartType.create({title:title,slug:newSlug})
   return newPart._id
  }
 }catch(error){
  await CronRec.create({msg:'Retriving or creating part type failed!',body:error,status:false})
  return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
 }
}

export async function GetParent(SKU){
try{
  await connect()
  const sku = SKU.split('-')[0]
  const getParent = await Product.findOne({sku:sku})
  if(getParent){
    return getParent
  }
  return {sku:'n/a',description:''}
 }catch(error){
  await CronRec.create({msg:'Retriving parent id failed!',body:error,status:false})
  return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
 }
}


export async function CreateOrUpdateProduct(data){
try{
  const isFind = await Product.findOne({id:data.id});
  if(isFind){
    await Product.findOneAndUpdate(isFind._id,data)
  }else{
    await Product.create(data)  
  }
}catch(error){
  await CronRec.create({msg:'Creating or updating product failed!',body:error,status:false})
  return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
 }
}

export async function GetManufacturer(title){
try{
  let slug = generateSlug(title);
  const isFind = await Manufacturer.findOne({slug:slug});
  if(isFind){
    return isFind._id
  }
  const isCreated = await Manufacturer.create({title:title,slug:slug})  
  return isCreated._id
}catch(error){
  await CronRec.create({msg:'Creating manufacturer failed!',body:error,status:false})
  return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
 }
}