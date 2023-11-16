import { db } from "../models/instance.js";

function listGroups(req, res) {
	db.all(
		`
        SELECT * FROM "Group";
        `,
		(err, row) => {
			if (err)
				return res.status(500).json({ data: null, success: false, message: err.message });

			return res.json({ data: row || null, success: true });
		}
	);
}

function createGroup(req, res) {
	db.run(
		`
            INSERT INTO "Group" (name)
            VALUES (?);
        `,
		[req.body.name],
		err => {
			if (err)
				return res.status(500).json({ data: null, success: false, error: err.message });

			return res.json({
				data: { name: req.body.name },
				success: true,
			});
		}
	);
}

function listGroupMessages(req, res) {

	db.all("SELECT * FROM \"Group\" WHERE \"name\" = ? LIMIT 1;", [req.params.name], (err, row) => {

		if (err) return res.status(500).json({ data: null, success: false, error: err.message });
		if (row.length === 0) return res.json(`Group "${req.params.name}" does not exist.`);
		db.all(
			`
                SELECT "User"."username", "message", "created_at" FROM "Group"
                JOIN "Message" ON "Message"."group_id" = "Group"."group_id"
                JOIN "User" ON "User"."user_id" = "Message"."user_id"
                WHERE "Group"."name" = ?
                ORDER BY "Message"."created_at" DESC;
            `,
			[req.params.name],
			(err, row) => {
				if (err)
					return res.status(500).json({ data: null, success: false, error: err.message });

				return res.json({ data: row || null, success: true });
			}
		);
	});
}

function insertGroupMessage(req, res) {
	db.all(
		"SELECT * FROM \"Group\" WHERE \"name\" = ? LIMIT 1;",
		[req.params.name],
		(err, groupData) => {
			if (err)
				return res.status(500).json({ data: null, success: false, error: err.message });

			const groupID = groupData[0]?.group_id;
			if (!groupID) return res.json(`Group "${req.params.name}" does not exist.`);

			db.all(
				"SELECT \"user_id\" FROM \"User\" WHERE \"session_id\" = ? LIMIT 1;",
				[req.cookies.sid],
				(err, userData) => {
					if (err)
						return res
							.status(500)
							.json({ data: null, success: false, error: err.message });

					const userID = userData[0]?.user_id;

					db.all(
						`
							INSERT OR IGNORE INTO "User_Group" (user_id, group_id) VALUES (?, ?);
						`,
						[userID, groupID],
						err => {
							if (err)
								return res
									.status(500)
									.json({ data: null, success: false, error: err.message });

							db.all(
								`
									INSERT INTO "Message" (group_id, user_id, message)
									VALUES (?, ?, ?);
								`,
								[groupID, userID, req.body.message],
								err => {
									if (err)
										return res.status(500).json({
											data: null,
											success: false,
											error: err.message,
										});

									return res.json({ data: "Message sent.", success: true });
								}
							);
						}
					);
				}
			);
		}
	);
}

export { listGroups, createGroup, listGroupMessages, insertGroupMessage };
