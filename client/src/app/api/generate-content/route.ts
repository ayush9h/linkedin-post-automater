import { NextResponse } from "next/server";


export async function POST(req:Request){
    const {query, is_web_search} = await req.json()

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/generate-content`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({query:query, is_web_search:is_web_search})
    })

    const data = await res.json()
    return NextResponse.json(data)
}