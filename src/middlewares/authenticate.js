import casual from "casual";
import { db } from "../models/instance.js";
import { randomUUID } from "node:crypto";

function authenticate(req, res, next) {
	let sessionID = req.cookies.sid;
	let shouldCreate = false;

	if (sessionID) {
		db.all(`SELECT * FROM "User" WHERE session_id = ?;`, [sessionID], (err, user) => {
			if (err) return res.status(500).json(err.message);

			if (!user) {
				shouldCreate = true;
			}

			return next();
		});
	} else {
		shouldCreate = true;
	}

	if (shouldCreate) {
		sessionID = randomUUID();
		const username = casual.username + (Math.floor(Math.random() * 900) + 100).toString();

		db.run(
			`INSERT INTO "User" (username, session_id) VALUES (?, ?)`,
			[username, sessionID],
			err => {
				if (err) return res.status(500).json(err.message);

				res.cookie("sid", sessionID);
				return next();
			}
		);
	}
}

export { authenticate };
