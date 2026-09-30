import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id_please_change_in_prod',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret_please_change_in_prod',
      // Jika butuh refresh token
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Email/Password',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://api.tugasmu.com";
          const res = await fetch(`${apiBase}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
          });
          
          const data = await res.json();
          if (res.ok && data.success && data.user) {
            return { id: data.user.id, name: data.user.name, email: data.user.email };
          }
          return null;
        } catch (e) {
          console.error("Credentials login error:", e);
          return null;
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = token.sub
        session.user.email = token.email as string
      }
      return session
    },
  },
  pages: { signIn: '/masuk' },
}
