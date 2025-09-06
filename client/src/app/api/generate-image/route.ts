import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {query} = await req.json()

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/generate-image`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({query})
    })

    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(arrayBuffer, {
        headers:{
            "Content-Type":"image/png"
        }
    })
}