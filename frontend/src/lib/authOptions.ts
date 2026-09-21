import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.sub = profile.sub ?? token.sub
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub
      }
      return session
    },
  },
  pages: { signIn: '/masuk' },
}
