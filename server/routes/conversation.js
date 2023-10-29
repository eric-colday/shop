import express from "express";
import {
  createConversation,
  deleteConversation,
  getConversation,
  getConversationTwoUsers,
} from "../controllers/conversation.js";  

const router = express.Router();

router.post("/", createConversation);

router.delete("/:id", deleteConversation); 

router.get("/:userId", getConversation);


router.get("/find/:firstUserId/:secondUserId", getConversationTwoUsers);

export default router;
