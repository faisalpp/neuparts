require('dotenv').config();
const Neulink = require('./models/neulink')
const ProductCategory = require('./models/productcategory')
const Product = require('./models/product')
const PartType = require('./models/producttype')
const Manufacturer = require('./models/productManufacturer')
const connect = require('./db')
const CronRec = require('./models/cron')

function generateSlug(title) {
  return title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .trim() // Remove leading/trailing spaces
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove consecutive hyphens
      .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}


async function LoginAndUpdateToken(email,password,id){
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
  process.exit(1)
 }
}


async function LoginAndCreateToken(email,password){
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
  process.exit(1)
 }
}

async function GetProductCategoryId(title){
 try{
  await connect()
  let tit = title 
  if(tit === ''){
    tit = 'Uncategorized'
  }  
  let slug = generateSlug(tit);
  
  const isCat = await ProductCategory.findOne({slug:slug})
  if(isCat){
    return isCat._id;
  }else{
   const newSlug = generateSlug(tit);
   const newCat = await ProductCategory.create({title:tit,slug:newSlug,isvisible:false,thumbnail:'/no-image.webp'})
   return newCat._id
  }
 
}catch(error){
  await CronRec.create({msg:'Retriving product category failed!',body:JSON.stringify(error),status:false})
  process.exit(1)
 }
}


async function GetProductSlug(title) {
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
  process.exit(1)
 }
}


async function CreateGetPartType(title){
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
  process.exit(1)
 }
}

async function GetParent(SKU){
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
  process.exit(1)
 }
}


async function CreateOrUpdateProduct(data){
 try{
  await connect()
  const isFind = await Product.findOne({id:data.id});
  if(isFind){
    await Product.findOneAndUpdate(isFind._id,{data})
  }else{
    const slug = await GetProductSlug(data.title)
    await Product.create({...data,slug:slug})  
  }
}catch(error){
  await CronRec.create({msg:'Creating or updating product failed!',body:error,status:false})
  process.exit(1)
 }
}


async function GetManufacturer(title){
try{
  await connect()
  let slug = generateSlug(title);
  const isFind = await Manufacturer.findOne({slug:slug});
  if(isFind){
    return isFind._id
  }
  const isCreated = await Manufacturer.create({title:title,slug:slug})  
  return isCreated._id
}catch(error){
  await CronRec.create({msg:'Creating manufacturer failed!',body:error,status:false})
  process.exit(1)
 }
}


module.exports = {CreateOrUpdateProduct,GetParent,CreateGetPartType,GetProductSlug,LoginAndUpdateToken,LoginAndCreateToken,GetProductCategoryId,GetManufacturer,generateSlug}
