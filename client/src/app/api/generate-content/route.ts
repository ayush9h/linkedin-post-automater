import { NextResponse } from "next/server";
import {z} from 'zod'

const schema = z.object({
    query: z.string().min(4),
    is_web_search: z.boolean(),
})

export async function POST(req:Request){
    try{
        const body = await req.json()
        const parsed = schema.safeParse(body)

        if(!parsed.success){
            return NextResponse.json({
                message:'Invalid request payload'
            },{status: 400},)
        }

        const controller = new AbortController()
        const timeout =  setTimeout(()=>controller.abort(),30000);


        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/generate-content`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(parsed.data),
            signal:controller.signal
        })

        clearTimeout(timeout)

        const data = await res.json()
        return NextResponse.json(data)
    }
    catch{
        return  NextResponse.json({
                message:'Internal Server Error'
            },{status: 400},
        )
    }
}