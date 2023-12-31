import express from "express";
import { createMessage, getMessages } from "../controllers/message.js";

const router = express.Router();

router.post("/", createMessage);

router.get("/:conversationId", getMessages);

export default router;   
