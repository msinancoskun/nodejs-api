function Group(db) {
	db.run(
		`
		CREATE TABLE IF NOT EXISTS "Group" (
			group_id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT UNIQUE
		);
		`,
		err => {
			if (err) console.error(err.message);
		}
	);
}

export { Group };
