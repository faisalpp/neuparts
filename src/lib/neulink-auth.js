import Neulink from '@/models/neulink'
import { generateSlug } from '@/utils/index';
import ProductCategory from '@/models/productcategory'
import Product from '@/models/product'
import PartType from '@/models/producttype'
import connect from '@/lib/db';

export async function LoginAndUpdateToken(email,password,id){
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

}


export async function LoginAndCreateToken(email,password){
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

}



export async function GetProductCategoryId(title){
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
}


export async function GetProductSlug(title) {
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
}


export async function CreateGetPartType(title){
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
}

export async function GetParent(SKU){
  await connect()
  const sku = SKU.split('-')[0]
  const getParent = await Product.findOne({sku:sku})
  if(getParent){
    return getParent
  }
  return {sku:'n/a',description:''}
}


export async function CreateOrUpdateProduct(data){
 const isFind = await Product.findOne({sku:data.sku});
 if(isFind){
  const res = await Product.findOneAndUpdate(isFind._id,data)
 }else{
  const res1 = await Product.create(data)  
 }
}