// Import du module de vérification de token
const auth = require("../middlewares/authJwt");

module.exports = app => {
  const comments = require("../controllers/commentController.js");
  let router = require("express").Router();

  // Crée un nouveau commentaire
  router.post("/", auth.verifyToken, comments.createComment);
  // Renvoie tous les commentaires d'un article spécifique
  router.get("/:id", auth.verifyToken, comments.getAllCommentsFromAnArticle);
  // Renvoie un commentaire spécifique, selon son id dans la table "comments"
  router.get("/:id", auth.verifyToken, comments.getOneComment);
  // Met à jour un commentaire
  router.put("/:id", auth.verifyToken, comments.modifyComment);
  // Supprime un commentaire
  router.delete("/:id", auth.verifyToken, comments.deleteComment);

  app.use('/api/comments', router);
};