import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
export const authOptions= {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID as string,
      clientSecret: process.env.GOOGLE_CLIENTSECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID as string,
      clientSecret: process.env.GITHUB_CLIENTSECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENTID as string,
      clientSecret: process.env.FACEBOOK_CLIENTSECRET as string,
    })
  ],
  secret:process.env.NEXTAUTH_SECRET as string,

}

export default NextAuth(authOptions)