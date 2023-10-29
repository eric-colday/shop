import  express  from "express";
import { verifyUser } from "../utils/verifyToken.js";  
import {
    createPost,
    deletePost,
    getAllPosts,
    getPost,
    updatePost,
    likePost,
    timelinePost,
    userPosts
} from "../controllers/post.js";



const router = express.Router(); 


// @route   Post api/Posts
router.post("/", createPost);

// @route   PUT api/Posts/:id
router.put("/:id", updatePost);

// @route   DELETE api/Posts/:id
router.delete("/:id", deletePost);

// @route   GET api/Posts/:id
router.get("/:id", getPost);

//like / dislike a post
router.put("/:id/like", likePost);

//get timeline posts
router.get("/timeline/:userId", timelinePost); 

//get user's all posts
router.get("/profile/:username", userPosts); 

//get all posts
router.get("/", getAllPosts);


export default router;


