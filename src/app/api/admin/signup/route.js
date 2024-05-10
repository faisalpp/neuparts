import { NextResponse } from "next/server";

export async function GET(){
    try {
       return  NextResponse.json({message: "Login successful",success: true})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}