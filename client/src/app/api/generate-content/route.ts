import { NextResponse } from "next/server";


export async function POST(req:Request){
    const {query} = await req.json()

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/generate-content`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({query})
    })

    const data = await res.json()
    return NextResponse.json(data)
}