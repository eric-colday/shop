import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import users2Route from "./routes/users2.js";
import productsRoute from "./routes/products.js";
import cartsRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import articleRoute from "./routes/article.js";
import categoryRoute from "./routes/categoriesProduct.js";
import categoryPostRoute from "./routes/categoriesPost.js";
import postRoute from "./routes/post.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/message.js";
import stripeRoute from "./routes/stripe.js";
import multer from "multer";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "images")));

//stripe
dotenv.config({ path: "./.env" });

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("error", (err) => {
  console.log("mongoDB error!", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

/** MIDDLEWARE */
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/users-2", users2Route);
app.use("/api/orders", orderRoute);
app.use("/api/articles", articleRoute);
app.use("/api/categories-product", categoryRoute);
app.use("/api/categories-post", categoryPostRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/checkout", stripeRoute);

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

/** ERROR HANDLING */

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

/** SERVER */

app.listen(5500, () => {
  connect();
  console.log("Connected to backend.");
});
