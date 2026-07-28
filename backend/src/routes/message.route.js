import express from "express";
import {
  getUsersForSidebar,
  getConversationsForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const messageRouter = express.Router();

messageRouter.use(protectRoute);

messageRouter.get("/users", getUsersForSidebar);
messageRouter.get("/conversation", getConversationsForSidebar);
messageRouter.get("/:id", getMessages);
messageRouter.post("/send/:id", upload.single("media"), sendMessage);

export default messageRouter;
