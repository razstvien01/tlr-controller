import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import GoogleProvider from "next-auth/providers/google";
import { useUserDataAtom } from "@/hooks/user-data-atom";
// import { FirestoreAdapter } from "@next-auth/firebase-adapter";
// import { cert } from "firebase-admin/app";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        
        // return profile.email_verified && profile.email.endsWith("@example.com");
      }
      if (account.provider === "credentials") {
        
        
      }
      return true;
    },
    
    async session({ session, user, token }: any) {
      
      return session
    },
    
    async jwt({ token, user, account, profile, isNewUser }: any) {
      
      return token
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.log(error))
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
          });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // adapter: FirestoreAdapter({
  //   credential: cert({
  //     projectId: process.env.FIREBASE_PROJECT_ID,
  //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //     privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  //   }),
  // }),
};

export const getAuth = () => getServerSession(authOptions);

export default NextAuth(authOptions);
