import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { axiosPrivate } from "../axios";
import { api } from "../routes/api";
import { page } from "../routes/pages";

export const authOptions: NextAuthOptions = {
  debug: true,
  secret: process.env.AUTHSECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        type: { label: "Type", type: "text", placeholder: "type" },
        username: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
        phone: { label: "Phone", type: "number", placeholder: "Phone" },
        otp: { label: "OTP", type: "number", placeholder: "OTP" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const loginType = credentials?.type || "Email";
        let payload = {};
        if (loginType === "Email") {
          payload = {
            email: credentials?.username,
            password: credentials?.password,
          };
        } else {
          payload = {
            phone: credentials?.phone,
            otp: credentials?.otp,
          };
        }
        try {
          const response = await axiosPrivate.post(
            loginType === "Email" ? api.login : api.login_phone,
            {
              ...payload,
            }
          );
          return { ...response.data.user, token: response.data.token };
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
    async jwt({ token, user, trigger, session }) {
      if (token && user) {
        token.id = user.id;
        token.verified = user.verified;
        token.phone = user.phone;
        token.token = user.token;
      }
      if (trigger === "update") {
        if (session?.verified) {
          token.verified = "VERIFIED";
        }
        if (session?.profile) {
          token.name = session.profile.name;
          token.email = session.profile.email;
          token.phone = session.profile.phone;
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token && session.user) {
        session.user.phone = token.phone;
        session.user.verified = token.verified;
        session.user.id = token.id;
        session.user.token = token.token;
      }
      return session;
    },
  },
  events: {
    async signOut(message: { session: Session; token: JWT }) {
      await axiosPrivate.post(
        api.logout,
        {},
        {
          headers: { Authorization: `Bearer ${message.token.token}` },
        }
      );
    },
  },
  pages: {
    signIn: page.auth.login,
    newUser: page.auth.register, // New users will be directed here on first sign in (leave the property out if not of interest)
    // signOut: "/signout",
    error: page.auth.login, // Error code passed in query string as ?error=
    // verifyRequest: "/verify-request", // (used for check email message)
  },
  session: {
    strategy: "jwt",
  },
};
