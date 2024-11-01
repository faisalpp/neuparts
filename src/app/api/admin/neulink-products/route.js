import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Neulink from '@/models/neulink';
import { LoginAndUpdateToken, LoginAndCreateToken, GetProductCategoryId, GetProductSlug, CreateGetPartType, GetParent, CreateOrUpdateProduct } from '@/lib/neulink-auth';
import {generateSlug} from '@/utils/index'

export async function GET() {
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
      if (!getToken.status) return NextResponse.json({ error: 'Login failed!' }, { status: 500 });
      
      TOKEN = `Bearer ${getToken.token}`;
      ID = getToken.id;
      UPDATED_AFTER = getToken.updatedAfter;
    }
  } else {
    const getToken2 = await LoginAndCreateToken(email, password);
    if (!getToken2.status) return NextResponse.json({ error: 'Login failed!' }, { status: 500 });
    
    TOKEN = `Bearer ${getToken2.token}`;
    ID = getToken2.id;
  }

  const perPage = 10;
  let page = 1;
  let url;
  let totalPages=1;

  while (true) {
    url = UPDATED_AFTER 
      ? `https://neulinkapi.neuappliances.com/api/parts?per_page=${perPage}&page=${page}&updated_after=${UPDATED_AFTER}` 
      : `https://neulinkapi.neuappliances.com/api/parts?per_page=${perPage}&page=${page}`;
    
    const getProducts = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': TOKEN },
    });
    
    if (getProducts.status !== 200) {
      return NextResponse.json({ error: 'Product syncing failed!' }, { status: 500 });
    }
    
    const RES = await getProducts.json();
    if (!totalPages) totalPages = RES.meta.last_page;

    for (const prod of RES.data) {
      let data;
      try {
        const CONDITION = prod.condition != "" ? generateSlug(prod.condition) : null;
        if (prod.is_variant) {
          const catId = await GetProductCategoryId(prod.category);
          const slug = await GetProductSlug(prod.title);
          const partType = await CreateGetPartType(prod.type);
          const parent = await GetParent(prod.sku);
          data = {
            is_variant: true,
            parent_sku: parent._id,
            title: prod.title,
            regular_price: prod.regular_price,
            sale_price: prod.sale_price,
            sku: prod.sku,
            part_number: prod.part_number,
            is_sale: prod.sale_price !== '0.00',
            condition: CONDITION,
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

    page++;
    if (page > totalPages) break;
  }

  const currentDate = new Date();
  const serverTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  await Neulink.findByIdAndUpdate(ID, { updated_after: serverTime });

  return NextResponse.json({ message: 'Product syncing completed!' }, { status: 200 });
}
