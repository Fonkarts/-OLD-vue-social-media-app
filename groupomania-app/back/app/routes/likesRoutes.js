const auth = require("../middlewares/authJwt");

module.exports = app => {
    const likes = require("../controllers/likesController.js");
    let router = require("express").Router();

    // Crée une entrée relative au vote d'un utilisateur sur un article
    // router.post("/", auth.verifyToken, likes.createLikeEntry);

    // Met à jour les informations relatives au vote d'un utilisateur sur un article
    // router.put("/:id", auth.verifyToken, likes.modifyLikeEntry);

    // Vérifie si l'utilisateur a déjà voté pour un article
    router.get("/:id", auth.verifyToken, likes.getAllLikesFromAnUser);

    app.use('/api/likes', router);
  };