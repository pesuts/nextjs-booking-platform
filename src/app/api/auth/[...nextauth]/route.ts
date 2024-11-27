import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "secret",
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log("bomba");
        console.log(credentials);
        const data: {
          id: string,
          email: string,
          password: string,
          role?: string
        } = {
          id: "123",
          email: "mom@mail.com",
          password: "123"
        }
        const { email, password } = credentials as {
          email: string,
          password: string,
        }
        if (email === data.email && password === data.password) {
          data.role = "admin";
          return data;
        } else return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") { 
        token.name = user.name;
        token.name = user.name;
        if ('role' in user) {
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) { 
        if (token.name) { 
          session.user.name = token.name
        }
        if (token.email) { 
          session.user.email = token.email
        }
        if (token.role) { 
          session.user.role = token.role as string;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
