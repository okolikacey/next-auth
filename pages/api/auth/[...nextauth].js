import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const client = await connectToDatabase();
        const users = client.db().collection("users");
        const user = await users.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found");
        }
        const isValid = await verifyPassword(credentials.password, user.password);

        // If no error and we have user data, return it
        if (isValid && user) {
          return { email: user.email };
        }
        // Return null if user data could not be retrieved
        throw new Error("could not log you in");
      },
    }),
  ],
};

export default NextAuth(authOptions);
