import NextAuth from "next-auth";

import { authOptions } from "./auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// import NextAuth, { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/globals/db";
// import { compare } from "bcryptjs";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             return null;
//           }

//           const user = await prisma.user.findUnique({
//             where: { email: credentials.email },
//           });
//           if (!user) {
//             return null;
//           }

//           const isPasswordValid = await compare(
//             credentials.password,
//             user.password
//           );
//           if (!isPasswordValid) {
//             return null;
//           }

//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//           };
//         } catch (error) {
//           console.error("Authorization error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   debug: process.env.NODE_ENV === "development",
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
