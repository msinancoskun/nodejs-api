import express, { json } from "express";
import cookieParser from "cookie-parser";
import { groups } from "./routes/groups/index.js";
import { db } from "./models/instance.js";
import { authenticate } from "./middlewares/authenticate.js";

const server = express();

server
	.use("/api/groups", cookieParser(), json(), authenticate, groups)
	.all("*", (_, res) => res.status(404).json("Not found"))
	.listen(3000, () => console.info("API live on http://localhost:3000."));

process
	.on("uncaughtException", err => {
		console.error(err);
		db.close();
		process.exit(1);
	})
	.on("unhandledRejection", err => {
		console.error(err);
		db.close();
		process.exit(1);
	});

export { server };
