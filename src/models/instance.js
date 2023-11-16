import sqlite from "sqlite3";
import { User, Group, Message, User_Group } from "./index.js";
const db = new sqlite.Database("./sqlite.db");

// create default tables
User(db);
Group(db);
User_Group(db);
Message(db);

export { db };
