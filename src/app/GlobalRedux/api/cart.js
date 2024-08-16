'use client'

export const AddToCart = async (data) => {
 let response;
 try{
  const res = await fetch('/api/front/cart/add-to-cart', 
   { method: 'POST',headers: { 'Content-Type': 'application/json' },body: JSON.stringify(data)})
  response = res.json()
 }catch(error){
   return error; 
 }
 return response;
}

export const RemoveFromCart = async (data) => {
 let response;
 try{
  const res = await fetch('/api/front/cart/remove-from-cart', 
   { method: 'POST',headers: { 'Content-Type': 'application/json' },body: JSON.stringify(data)})
  response = res.json()
 }catch(error){
   return error; 
 }
 return response;
}

export const DeleteFromCart = async (data) => {
 let response;
 try{
  const res = await fetch('/api/front/cart/delete-from-cart', 
   { method: 'POST',headers: { 'Content-Type': 'application/json' },body: JSON.stringify(data)})
  response = res.json()
 }catch(error){
   return error; 
 }
 return response;
}