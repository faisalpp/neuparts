import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Neulink from '@/models/neulink';
import { LoginAndUpdateToken, LoginAndCreateToken, GetProductCategoryId, GetProductSlug, CreateGetPartType, GetParent, CreateOrUpdateProduct,GetManufacturer } from '@/lib/neulink-auth';
import {generateSlug} from '@/utils/index'
import CronRec from '@/models/cron'

export async function GET() {  
  try{
    await connect();

  const email = process.env.NEULINK_CMS_EMAIL;
  const password = process.env.NEULINK_CMS_PASSWORD;
  let TOKEN;
  let UPDATED_AFTER;
  let ID;

  const authToken = await Neulink.findOne();
  ID = authToken._id;
  if (authToken) {
    const validUntil = new Date(authToken.valid_until);
    const currentDate = new Date();
    
    if (currentDate < validUntil) {
      TOKEN = `Bearer ${authToken.token}`;
      UPDATED_AFTER = authToken.updated_after;
    } else {
      const getToken = await LoginAndUpdateToken(email, password, authToken._id);
      if (!getToken.status){
        await CronRec.create({msg:'Login failed!',body:JSON.stringify(error),status:false})
        return NextResponse.json({ error: 'Login failed!' }, { status: 500 });
      } 
      
      TOKEN = `Bearer ${getToken.token}`;
      ID = getToken.id;
      UPDATED_AFTER = getToken.updatedAfter;
    }
  } else {
    const getToken2 = await LoginAndCreateToken(email, password);
    if (!getToken2.status){
      await CronRec.create({msg:'Login failed!',body:JSON.stringify(error),status:false})
      NextResponse.json({ error: 'Login failed!' }, { status: 500 });
    } 
    
    TOKEN = `Bearer ${getToken2.token}`;
    ID = getToken2.id;
  }

  const PER_PAGE = 100;
  let PAGE = 1;
  let LOGIN_URL;
  let TOTAL_PAGES;

  while (true) {
    LOGIN_URL = UPDATED_AFTER 
      ? `https://neulinkapi.neuappliances.com/api/parts?per_page=${PER_PAGE}&page=${PAGE}&updated_after=${UPDATED_AFTER}` 
      : `https://neulinkapi.neuappliances.com/api/parts?per_page=${PER_PAGE}&page=${PAGE}`;
    
    const getProducts = await fetch(LOGIN_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': TOKEN },
    });
    
    if (getProducts.status !== 200) {
      await CronRec.create({msg:'Neulink api failed!',body:'n/a',status:false})
      return NextResponse.json({ error: 'Product syncing failed!' }, { status: 500 });
    }
    
    const RES = await getProducts.json();
    if (!TOTAL_PAGES) TOTAL_PAGES = RES.meta.last_page;

    for (const prod of RES.data) {
      let data;
      try {
        const CONDITION = prod.condition != "" ? generateSlug(prod.condition) : null;
        if (prod.is_variant) {
          const catId = await GetProductCategoryId(prod.category);
          const slug = await GetProductSlug(prod.title);
          const partType = await CreateGetPartType(prod.type);
          const manufacturer = await GetManufacturer(prod.manufacturer);
          const parent = await GetParent(prod.sku);
          data = {
            id: prod.id,
            parent_id: prod.main_product_id,
            is_variant: true,
            parent_sku: parent._id,
            title: prod.title,
            regular_price: prod.regular_price,
            sale_price: prod.sale_price,
            sku: prod.sku,
            part_number: prod.part_number,
            is_sale: prod.sale_price !== '0.00',
            condition: CONDITION,
            manufacturer:manufacturer,
            description: parent.description,
            category: catId,
            parttype: partType,
            stock: prod.stock,
            images: prod.images,
            slug: slug,
            thumbnail: prod.images.length > 0 ? prod.images[0].thumbnail : null,
          };
        } else {
          const catId2 = await GetProductCategoryId(prod.category);
          const slug2 = await GetProductSlug(prod.title);
          const partType2 = await CreateGetPartType(prod.type);

          data = {
            id: prod.id,
            is_variant: false,
            parent_sku: null,
            title: prod.title,
            regular_price: prod.regular_price,
            sale_price: prod.sale_price,
            sku: prod.sku,
            model_no: prod.model_numbers,
            part_number: prod.part_number,
            is_sale: prod.sale_price !== '0.00',
            condition: CONDITION,
            description: prod.description,
            category: catId2,
            parttype: partType2,
            stock: prod.stock,
            images: prod.images,
            slug: slug2,
            thumbnail: prod.images.length > 0 ? prod.images[0].thumbnail : null,
          };
        }

        await CreateOrUpdateProduct(data);
      } catch (error) {
        return NextResponse.json({ message: `Error processing product with SKU: ${prod.sku}` }, { status: 500 });
      }
    }

    PAGE++;
    if (PAGE > TOTAL_PAGES) break;
  }

  const currentDate = new Date();
  const serverTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  await Neulink.findByIdAndUpdate(ID, { updated_after: serverTime });

  await CronRec.create({msg:'Product syncing completed!',body:`Product syncing completed with total ${TOTAL_PAGES} pages and ${TOTAL_PAGES*PER_PAGE} products`,status:true})
  return NextResponse.json({ message: 'Product syncing completed!' }, { status: 200 });

 }catch(error){
   await CronRec.create({msg:'Something went wrong!',body:JSON.stringify(error),status:false})
   return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
 }

}
