// const express = require("express");
// const router = express.Router();

// const articleCtrl = require("../controllers/articleController");
// const auth = require("../middlewares/authJwt");
// const multer = require("../config/multerConfig");

// router.get("/", auth, articleCtrl.getAllArticles);
// router.get("/:id", auth, articleCtrl.getOneArticle);
// router.post("/", auth, multer, articleCtrl.createArticle);
// router.put("/:id", auth, multer, articleCtrl.modifyArticle);
// router.delete("/:id", auth, articleCtrl.deleteArticle);
// router.post("/:id/like", auth, articleCtrl.likeArticle);
// // Toutes les routes "article" sont soumises au middleware d'authentification utilisateur
// // et utilisent les controllers article.

// module.exports = router; 

const auth = require("../middlewares/authJwt");

module.exports = app => {
    const articles = require("../controllers/articleController.js");
    let router = require("express").Router();
    // Create a new Tutorial
    router.post("/", articles.createArticle);
    // Retrieve all Tutorials
    router.get("/", articles.getAllArticles);
    // Retrieve a single Tutorial with id
    router.get("/:id", articles.getOneArticle);
    // // Update a Tutorial with id
    router.put("/:id", articles.modifyArticle);
    // Delete a Tutorial with id
    router.delete("/:id", articles.deleteArticle);

    app.use('/api/articles', router);
  };