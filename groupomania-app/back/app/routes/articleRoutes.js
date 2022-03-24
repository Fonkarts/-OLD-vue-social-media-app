// Import du module de vérification de token
const auth = require("../middlewares/authJwt");

module.exports = app => {
  const articles = require("../controllers/articleController.js");
  let router = require("express").Router();

  // Crée un nouvel article
  router.post("/", auth.verifyToken, articles.createArticle);
  // Renvoie tous les articles de la BDD
  router.get("/", auth.verifyToken, articles.getAllArticles);
  // Renvoie un article spécifique, selon son id
  router.get("/:id", auth.verifyToken, articles.getOneArticle);
  // Met un article à jour
  router.put("/:id", auth.verifyToken, articles.modifyArticle);
  // Supprime un article
  router.delete("/:id", auth.verifyToken, articles.deleteArticle);
  // Mets à jour les likes/dislikes d'un article
  router.put("/likes/:id", auth.verifyToken, articles.likeArticle);

  app.use('/api/articles', router);
};