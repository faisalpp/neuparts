'use client'

export const ApplyCoupon = async (data) => {
 let response;
 try{
  const res = await fetch('/api/front/coupon', 
   { method: 'POST',headers: { 'Content-Type': 'application/json' },body: JSON.stringify(data)})
  response = await res.json()
 }catch(error){
   return error; 
 }
 return response;
}