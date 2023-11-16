import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: ["test/**/*.test.js"],
		coverage: {
			provider: "istanbul",
			reporter: ["text"],
		},
		passWithNoTests: true,
	},
});
