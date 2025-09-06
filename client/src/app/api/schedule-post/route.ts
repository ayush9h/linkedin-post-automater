import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { content, accessToken } = await req.json()

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/post-linkedin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      generated_content: content,
      delay: 0,
      access_token: accessToken,
    }),
  })

  const data = await res.json()
  return NextResponse.json(data)
}
