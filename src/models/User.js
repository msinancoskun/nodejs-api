function User(db) {
	db.run(
		`
				CREATE TABLE IF NOT EXISTS "User" (
					user_id INTEGER PRIMARY KEY AUTOINCREMENT,
					username TEXT NOT NULL,
					session_id TEXT NOT NULL
				);
        `,
		err => {
			if (err) console.error(err.message);
		}
	);
}

export { User };
