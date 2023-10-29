import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    userFollow,
    userUnfollow,
    getFriends,
    getStats
} from "../controllers/user2.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


router.get("/stats", verifyToken, getStats)


router.put("/:id", verifyUser, updateUser);  

//DELETE
//9
//router.delete("/:id", deleteUser);

//9-4
router.delete("/:id", verifyUser, deleteUser); 


//GET
//9
//router.get("/:id", getUser);

//9-4
//router.get("/:id", verifyUser, getUser);  

//get a second user (mettre en veille pour admin)
router.get("/", getUser)

//get friends
router.get("/friends/:userId", getFriends);  

//follow a user
router.put("/:id/follow", userFollow);

//unfollow a user
router.put("/:id/unfollow", userUnfollow);


export default router;