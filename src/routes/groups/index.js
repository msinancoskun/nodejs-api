import express from "express";
import {
	listGroups,
	createGroup,
	listGroupMessages,
	insertGroupMessage,
} from "../../controllers/index.js";

const groups = express.Router();

groups
	// ...
	.get("/", listGroups)
	.post("/", createGroup)
	.get("/:name", listGroupMessages)
	.post("/:name/message", insertGroupMessage);

export { groups };
