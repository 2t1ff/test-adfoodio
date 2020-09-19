import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import Redis from "ioredis";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { ServingResolver } from "./resolvers/serving";
import { Serving } from "./entities/Serving";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";

const RedisStore = connectRedis(session);
const redis = new Redis({ host: "redis" });

const port = process.env.NODE_PORT || 4848;

//We didn't really need to export the main (renamed it from run) function since we're just executing it here.
const main = async () => {
	//TypeORM database Connection.
	await createConnection({
		type: "mysql",
		host: "mysql",
		database: "adfoodio",
		username: "root",
		password: "root",
		logging: true,
		synchronize: true,
		migrations: [],
		entities: [Serving, User],
	});

	
	const app = express();

	app.set("trust proxy", 1);

	app.get("/", function (_, res) {
		res.type("text/plain").send("Food can be served");
	});

	app.use(
		cors({
			origin: "http://api.adfoodio.site:3000",
			credentials: true,
		})
	);

	//Redis Cookie
	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({ client: redis, disableTouch: true }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
				httpOnly: true,
				secure: false,
				sameSite: "lax",
				domain: ".adfoodio.site"
				
			},
			saveUninitialized: false,
			secret: "between you and me, this should be hidden",
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [ServingResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
			redis,
		}),
	});

	apolloServer.applyMiddleware({ app, cors: false });

	return app.listen(port, function () {
		// Port is forwarded by docker to 80.
		console.log(`Listen on http://localhost:${port}`);
	});
};

if (process.env.NODE_ENV !== "testing") {
	main();
}
