import type { NextAuthOptions } from "next-auth";
import LinkedIn, {LinkedInProfile} from "next-auth/providers/linkedin";

export const authOptions: NextAuthOptions = {
  providers: [
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID as string,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET as string,
      issuer: "https://www.linkedin.com",
      authorization: {
        params: { scope: "openid profile w_member_social email" },
      },
      wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      profile: (profile: LinkedInProfile) => ({
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }),
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
