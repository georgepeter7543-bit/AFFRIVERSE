import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@afriverse.co.tz" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password, role } = credentials;
        const env = process.env;

        // CEO admin check
          if (
            role === "admin" && password === env.CEO_PASSWORD
          ) {
          return { id: "admin", name: "CEO Admin", email: email || "admin@afriverse.co.tz", role: "admin" };
        }
        // Demo mode for seller/buyer
        if (role === "seller" || role === "buyer") {
          return { id: `${role}-${email}`, name: role, email, role };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "afriverse-secret-key-2026",
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
