import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Bypass (Development)',
      credentials: {
        email: { label: "Email Dummy", type: "email", placeholder: "tester@tugasmu.com" },
        name: { label: "Nama Dummy", type: "text", placeholder: "Tester" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        
        // Ciptakan ID unik statis berdasarkan email agar konsisten
        const generateId = (email: string) => {
          let hash = 0;
          for (let i = 0; i < email.length; i++) {
            hash = email.charCodeAt(i) + ((hash << 5) - hash);
          }
          return `dev-usr-${Math.abs(hash)}`
        }

        return {
          id: generateId(credentials.email),
          email: credentials.email,
          name: credentials.name || 'Tester',
          image: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
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
