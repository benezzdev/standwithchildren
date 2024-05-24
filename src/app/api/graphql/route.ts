import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export type MyContext = {
  activeUserEmail: string | null;
};

const server = new ApolloServer<MyContext>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    let activeUserEmail = null;
    const token = cookies().get("token")?.value;
    const secret = process.env.JWT_SECRET;
    //console.log("tokenCookie :>> ", token);
    if (token && secret) {
      try {
        const { sub } = jwt.verify(token, secret) as JwtPayload;
        console.log("sub :>> ", sub);
        if (sub) {
          activeUserEmail = sub;
        }
      } catch (error) {
        console.log(error);
        cookies().delete("token");
      }
    }

    return { activeUserEmail };
  },
});

export { handler as GET, handler as POST };
