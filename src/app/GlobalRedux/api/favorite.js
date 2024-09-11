'use client'

export const AddToFavorite = async (data) => {
 let response;
 try{
  const res = await fetch('/api/front/favorite', 
   { method: 'PUT',headers: { 'Content-Type': 'application/json' },body: JSON.stringify(data)})
  response = await res.json()
 }catch(error){
   return error; 
 }
 return response;
}

export const RemoveFromFavorite = async (data) => {
 let response;
 try{
  const res = await fetch('/api/front/favorite', 
   { method: 'DELETE',headers: { 'Content-Type': 'application/json' },body: JSON.stringify(data)})
  response = await res.json()
 }catch(error){
   return error; 
 }
 return response;
}