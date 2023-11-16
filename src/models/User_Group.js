function User_Group(db) {
	db.run(
		`
			CREATE TABLE IF NOT EXISTS "User_Group" (
				user_group_id INTEGER PRIMARY KEY AUTOINCREMENT,
				user_id INTEGER NOT NULL,
				group_id INTEGER NOT NULL,

				FOREIGN KEY(user_id) REFERENCES "User"(user_id),
				FOREIGN KEY(group_id) REFERENCES "Group"(group_id),

				UNIQUE(user_id, group_id)
			);
        `,
		err => {
			if (err) console.error(err.message);
		}
	);
}

export { User_Group };
