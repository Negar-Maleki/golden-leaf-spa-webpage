import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        if (!user?.email) return false;

        await prisma.customer.upsert({
          where: { email: user.email },
          update: {
            name: user.name ?? "Unknown User",
          },
          create: {
            email: user.email,
            name: user.name ?? "Unknown User",
          },
        });

        return true;
      } catch (error) {
        console.error("SIGNIN DB ERROR:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (!token.email) return token;

      if (user) {
        const dbUser = await prisma.customer.findUnique({
          where: { email: token.email },
        });

        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
