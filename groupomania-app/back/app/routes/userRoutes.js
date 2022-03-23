// Import du module de vérification de token
const auth = require("../middlewares/authJwt");
const controller = require("../controllers/userController");

module.exports = function(app) {
  // Renvoie les données d'un utilisateur (ne renvoie pas les hashs, ni le token)
  app.get("/api/users/:id",
    [auth.verifyToken],
    controller.getUser);
  // Renvoie un tableau contenant les données de tous les utilisateurs. 
  // Cette route n'est pas encore utilisée à ce stade de développement.
  app.get("/api/users",
    [auth.verifyToken],
    controller.getAllUsers);
  // Mets à jour les données utilisateur
  app.put("/api/users/:id",
    [auth.verifyToken],
    controller.modifyUser);
  // Supprime le compte de l'utilisateur
  app.delete("/api/users/:id",
    [auth.verifyToken],
    controller.deleteUser);
};


