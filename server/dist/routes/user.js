import express from 'express';
import { deleteUser, getAllUsers, getUser, newUser } from '../controlllers/user.js';
import { adminOnly } from '../middlewares/auth.js';
const app = express.Router();
app.post("/new", newUser);
app.get("/all", adminOnly, getAllUsers);
// dynamicID
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);
export default app;
