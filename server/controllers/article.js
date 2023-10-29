import Article from "../models/Article.js";

//create a article
export const createArticle = async (req, res, next) => {
  const newArticle = new Article(req.body);

  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (err) {
    next(err);
  }
};

//get article
export const getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
};

//update a article
export const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article.username === req.body.username) {
      try {
        const updatedArticle = await Article.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedArticle);
      } catch (err) {
        next(err);
      }
    } else {
      res.status(401).json("You can update only your article!");
    }
  } catch (err) {
    next(err);
  }
};

//delete a article
export const deleteArticle = async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  try {
    await article.delete();
    res.status(200).json("Article has been deleted");
  } catch (err) {
    next(err);
  }
};

// get all articles
export const getAllArticles = async (req, res, next) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let articles;
    if (username) {
      articles = await Article.find({ username });
    } else if (catName) {
      articles = await Article.find({ categories: { $in: [catName] } });
    } else {
      articles = await Article.find();
    }
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};




