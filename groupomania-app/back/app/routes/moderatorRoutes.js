const auth = require("../middlewares/authJwt");

module.exports = app => {
    const moderator = require("../controllers/moderatorController.js");
    let router = require("express").Router();

    // Suppression article modérateur
    router.delete("/articles/:id", 
    [auth.verifyToken, auth.isModerator], 
    moderator.moderatorDeleteArticle);

    // Suppression commentaire modérateur
    router.delete("/comments/:id", 
    [auth.verifyToken, auth.isModerator], 
    moderator.moderatorDeleteComment);

    // Obtention de l'adresse mail de l'utilisateur
    router.get("/users/:id", 
    [auth.verifyToken, auth.isModerator],
    moderator.getUserMail);
    
    app.use('/api/moderator', router);
  };