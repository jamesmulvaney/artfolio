import "reflect-metadata";
import "dotenv/config";
import express from "express";
import connectRedis from "connect-redis";
import session from "express-session";
import redis from "redis";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { TestResolver } from "./resolver/TestResolver";
import { UserResolver } from "./resolver/UserResolver";
import { COOKIE_NAME } from "./const";
import { PostResolver } from "./resolver/PostResolver";
import { databaseSrc } from "./data-source";
import { ReplyResolver } from "./resolver/ReplyResolver";
import { FollowResolver } from "./resolver/FollowResolver";

const main = async () => {
  //Connect to the database using typeorm. Configure in /server/data-source.tsx
  await databaseSrc.initialize();

  //Express
  const app = express();

  //Redis
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  //express-session
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, //1Y
        httpOnly: true,
        //secure: __prod__, //HTTPS
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  );

  //CORS
  app.use(
    cors({
      origin: process.env.CORS_URL!,
      credentials: true,
    })
  );

  //Setup ApolloServer
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        TestResolver,
        UserResolver,
        PostResolver,
        ReplyResolver,
        FollowResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
  });

  //Start ApolloServer
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  //Tells express to run on the specified port
  app.listen(process.env.PORT || 4000, () => {
    console.log(
      `[LOG] Express server started on port ${process.env.PORT || "4000"}!`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
