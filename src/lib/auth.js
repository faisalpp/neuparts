import {SignJWT,jwtVerify} from 'jose'
import { NextResponse } from "next/server";


const secretKey = process.env.NEXT_ENCRYPT_SALT;
const key = new TextEncoder().encode(secretKey);


const secretKey2 = process.env.NEXT_ENCRYPT_RESET_USER;
const key2 = new TextEncoder().encode(secretKey2);

export async function encryptResetToken(payload){
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('2 hours from now')
    .sign(key2)
}

export async function decryptResetToken(input){
  const {payload} = await jwtVerify(input,key2,{
    algorithms:['HS256']
  });
  return payload;
}

export async function encrypt(payload){
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('2 hours from now')
    .sign(key)
}

export async function decrypt(input){
    const {payload} = await jwtVerify(input,key,{
      algorithms:['HS256']
    });
    return payload;
}


export async function updateSession(request,sessionType){
  const session = request.cookies.get(sessionType)?.value;
  if(!session) return false;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 120 * 1000)
  const res = NextResponse.next();
  res.cookies.set({
    name:sessionType,
    value:await encrypt(parsed),
    httpOnly:false,
    expires:parsed.expires
  })
  return true;
}

export async function checkSession(request,sessionType){
  const session = request.cookies.get(sessionType)?.value;
  if(!session) return false;
  const parsed = await decrypt(session);
  return parsed;
}