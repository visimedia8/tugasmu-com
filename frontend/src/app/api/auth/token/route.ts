import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { SignJWT } from 'jose'
import { NextResponse } from 'next/server'

// Default to a dummy secret if undefined so build doesn't fail during export/dev, but will fail validation naturally
const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'dummy_secret_do_not_use_in_prod_123')

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ token: null })
  }

  const token = await new SignJWT({
    sub: (session.user as any).id,
    email: session.user.email,
    name: session.user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(JWT_SECRET)

  return NextResponse.json({ token })
}
