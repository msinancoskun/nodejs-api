import { expect, test } from "vitest";

test("Test endpoint responses", () => {
	(async () => {
		const baseRoute = "http://localhost:3000/api/groups";
		const routes = {
			[baseRoute]: {
				method: "GET",
			},
		};

		for (const [key, value] of Object.entries(routes)) {
			const res = await (await fetch(key, { method: value.method })).json();
			expect(res.success).toBe(true);
		}
	})();
});
