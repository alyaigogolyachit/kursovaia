import { getServerSession, type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb"
import bcrypt from "bcrypt"

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "your email",
        },
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials")
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials")
        }
        const isCorrectedPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        )
        if (!isCorrectedPassword) {
          throw new Error("Invalid Credentials")
        }
        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const getAuthSession = () => getServerSession()
