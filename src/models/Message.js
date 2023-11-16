function Message(db) {
	db.run(
		`
			CREATE TABLE IF NOT EXISTS "Message" (
				message_id INTEGER PRIMARY KEY AUTOINCREMENT,
				group_id INTEGER,
				user_id INTEGER,
				message TEXT,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY(group_id) REFERENCES "Group"(group_id),
				FOREIGN KEY(user_id) REFERENCES "User"(user_id)
			);
		`,
		err => {
			if (err) console.error(err.message);
		}
	);
}

export { Message };
