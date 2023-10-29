import Post from "../models/Post.js";
import User from "../models/User.js"

//create a post
export const createPost = async (req, res, next) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

//update a post
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    next(err);
  }
};

//delete a post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    next(err);
  }
};

//like / dislike a post
export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    next(err);
  }
};

//get post
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

//get timeline posts
export const timelinePost = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    next(err);
  }
};

//get user's all posts
export const userPosts = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};


// get all posts
export const getAllPosts = async (req, res, next) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
