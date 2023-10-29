import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getSecondUser,
    getUsers,
    userFollow,
    userUnfollow,
    getFriends,
    getStats
} from "../controllers/user.js";
import { uploadProfil } from "../controllers/upload.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


/** 
//9-4-APRÈS SES TESTS, ALLER ACTIVER VERIFYTOKEN ET LES AUTRES TOKEN EN BAS 9-4

 //9-1 Test en lien avec utils/VerifyToken.js
 //9-1-Dans Postman, regarder: Test verifyToken 
 router.get("/checkauthentication", verifyToken, (req,res,next)=>{
   res.send("hello user, you are logged in")
 })
 
 //9-2 Test2 en lien avec utils/VerifyToken.js => va regarder
 //9-2 Test2 dans Postman avec les id de Atlas, un avec un cookie et l'autre sans cookie
 router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
   res.send("hello user, you are logged in and you can delete your account")
 })
 
 //9-3 Test3 en lien avec utils/VerifyToken.js => va regarder
 //9-3 Pour tester dans Postman, il faut ajouter true à isAdmin dans un user de Altas
 //Puis venir supprimer l'ancien cookie sans Admin et se reconnecter 
 router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
   res.send("hello admin, you are logged in and you can delete all accounts")
 })

**/


router.get("/stats", verifyAdmin, getStats)

//UPDATE
//9
//router.put("/:id", updateUser);

//9-4
router.put("/:id", verifyAdmin, updateUser);  

//DELETE
//9
router.delete("/:id", verifyAdmin, deleteUser);

//9-4
router.delete("/:id", verifyAdmin, deleteUser);


//GET
//9
//router.get("/:id", getUser);

//9-4
router.get("/:id", verifyAdmin, getUser);  

//get a second user (mettre en veille pour admin)
//router.get("/", getSecondUser)


//9-4 regarder également routes/hotels.js (décommenter pour admin)
router.get("/", getUsers);

//get friends
router.get("/friends/:userId", getFriends);  

//follow a user
router.put("/:id/follow", verifyUser, userFollow);

//unfollow a user
router.put("/:id/unfollow", verifyUser, userUnfollow);


export default router;