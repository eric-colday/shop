import  express  from "express";
import { verifyUser } from "../utils/verifyToken.js";  
import {
    createArticle,
    deleteArticle,
    getAllArticles,
    getArticle,
    updateArticle,
} from "../controllers/article.js";



const router = express.Router(); 



// @route   Article api/articles
router.post("/", verifyUser, createArticle);

// @route   GET api/Articles/:id
router.get("/find/:id", verifyUser, getArticle);

// @route   PUT api/Articles/:id
router.put("/:id", verifyUser, updateArticle);

// @route   DELETE api/Articles/:id
router.delete("/:id", verifyUser, deleteArticle);

// @route   GET api/Articles
router.get("/", getAllArticles);


export default router;


