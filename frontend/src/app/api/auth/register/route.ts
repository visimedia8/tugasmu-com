import { NextResponse } from 'next/server'

const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://api.tugasmu.com"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const res = await fetch(`${apiBase}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()
    if (!res.ok || !data.success) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Register API Error:', err)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
