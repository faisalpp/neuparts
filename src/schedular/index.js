require('dotenv').config();
const connect = require('./db');
const Neulink = require('./models/neulink');
const { generateSlug,LoginAndUpdateToken, LoginAndCreateToken, GetProductCategoryId, GetProductSlug, CreateGetPartType, GetParent, CreateOrUpdateProduct,GetManufacturer } = require('./functions');
const CronRec = require('./models/cron')


async function SyncProducts() {  
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
        process.exit(1)
      } 
      
      TOKEN = `Bearer ${getToken.token}`;
      ID = getToken.id;
      UPDATED_AFTER = getToken.updatedAfter;
    }
  } else {
    const getToken2 = await LoginAndCreateToken(email, password);
    if (!getToken2.status){
      await CronRec.create({msg:'Login failed!',body:JSON.stringify(error),status:false})
      process.exit(1)
    } 
    
    TOKEN = `Bearer ${getToken2.token}`;
    ID = getToken2.id;
  }

  const PER_PAGE = 100;
  let PAGE = 156;
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
      process.exit(1)
    }
    
    const RES = await getProducts.json();
    if (!TOTAL_PAGES) TOTAL_PAGES = RES.meta.last_page;

    for (const prod of RES.data) {
      let data;
      try {
        const CONDITION = prod.condition != "" ? generateSlug(prod.condition) : null;
      if(  prod.part_number !== null && prod.part_number !== '' && prod.type !== null && prod.type !== '' &&
        (
         (prod.regular_price && prod.regular_price !== '0.00') ||
         (prod.sale_price && prod.sale_price !== '0.00')
        )){
        const regularPrice = prod.regular_price ? prod.regular_price : '0.00'
        const salePrice = prod.sale_price ? prod.sale_price : '0.00'
        if (prod.is_variant) {
          const catId = await GetProductCategoryId(prod.category);
          const partType = await CreateGetPartType(prod.type);
          const manufacturer = await GetManufacturer(prod.manufacturer);
          const parent = await GetParent(prod.sku);

          data = {
            id: prod.id,
            parent_id: prod.main_product_id,
            is_variant: true,
            parent_sku: parent._id,
            title: prod.title,
            regular_price: regularPrice,
            sale_price: salePrice,
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
            thumbnail: prod.images.length > 0 ? prod.images[0].thumbnail : null,
          };
        } else {
          const catId2 = await GetProductCategoryId(prod.category);
          const  partType2 = await CreateGetPartType(prod.type);

          data = {
            id: prod.id,
            is_variant: false,
            parent_sku: null,
            title: prod.title,
            regular_price: regularPrice,
            sale_price: salePrice,
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
            thumbnail: prod.images.length > 0 ? prod.images[0].thumbnail : null,
          };
        }
        await CreateOrUpdateProduct(data);
       }
      } catch (error) {
        await CronRec.create({msg:'Neulink api failed!',body:`Error processing product with SKU: ${prod.sku}`,status:false})
        process.exit(1)
      }
    }

    PAGE++;
    console.log(`${PAGE} out of ${TOTAL_PAGES}`)
    if (PAGE > TOTAL_PAGES) break;
  }

  const currentDate = new Date();
  const serverTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  await Neulink.findByIdAndUpdate(ID, { updated_after: serverTime });

  await CronRec.create({msg:'Product syncing completed!',body:`Product syncing completed with total ${TOTAL_PAGES} pages and ${TOTAL_PAGES*PER_PAGE} products`,status:true})
  process.exit(0)
 }catch(error){
   await CronRec.create({msg:'Something went wrong!',body:JSON.stringify(error),status:false})
   process.exit(1)
 }

}



SyncProducts()