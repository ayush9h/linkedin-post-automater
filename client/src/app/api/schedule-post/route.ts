import { NextResponse } from "next/server"
import {z} from 'zod'

const schema = z.object({
  content:z.string().min(5),
  access_token:z.string().min(1),
  schedule_times: z.array(z.string())
})

export async function POST(req: Request) {
  try{ 
        const body = await req.json()
        const parsed = schema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
              { message: "Invalid request payload" },
              { status: 400 }
            );
          }
        
        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/post-linkedin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        })
      
        const data = await res.json()
        return NextResponse.json(data);
    }     
    catch{
       return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    }}
