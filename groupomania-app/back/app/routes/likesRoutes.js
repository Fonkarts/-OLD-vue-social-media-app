const auth = require("../middlewares/authJwt");

module.exports = app => {
    const likes = require("../controllers/likesController.js");
    let router = require("express").Router();

    // Renvoie tous les likes/dislikes de l'utilisateur
    router.get("/:id", auth.verifyToken, likes.getAllLikesFromAnUser);

    app.use('/api/likes', router);
  };