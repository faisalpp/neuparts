import connect from '@/lib/db';
import Neulink from '@/models/neulink';


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
    return false
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
    return {status:false};
 }
}



export default async function CmsOrder(data) {  
  try{
   await connect();

  const email = process.env.NEULINK_CMS_EMAIL;
  const password = process.env.NEULINK_CMS_PASSWORD;
  let TOKEN;

  const authToken = await Neulink.findOne();
  if (authToken) {
    const validUntil = new Date(authToken.valid_until);
    const currentDate = new Date();
    
    if (currentDate < validUntil) {
      TOKEN = `Bearer ${authToken.token}`;
    } else {
      const getToken = await LoginAndUpdateToken(email, password, authToken._id);
      if (!getToken.status){
        return false;      
      } 
      
      TOKEN = `Bearer ${getToken.token}`;
    }
  } else {
    const getToken2 = await LoginAndCreateToken(email, password);
    if (!getToken2.status){
      return false
    } 
    
    TOKEN = `Bearer ${getToken2.token}`;
  }

  
  //send order
  const ApiUrl = 'https://neulinkapi.neuappliances.com/api/part-orders'
  const cmsOrder = await fetch(ApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    },
    body: JSON.stringify(data),
  });
  if(!cmsOrder.ok){
    return false
  }
  await cmsOrder.json()
  return true
 }catch(error){
  return false
 }

}




