const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const db = require("../models");
const User = db.user;

  // Vérification du token de l'utilisateur
verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).json({message: "Token inexistant !"});
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({message: "Utilisateur non autorisé !"});
    }
    req.userId = decoded.id;
    next();
  });
};
// Vérification du status de modérateur
isModerator = (req, res, next) => {
  User.findByPk(req.userId)
  .then(user => {
    user.getRoles()
    .then(roles => {
      // Si le rôle de l'utilisateur est "moderator", exécution du middleware suivant
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      // Sinon, erreur 403
      res.status(403).json({message: "Droits Modérateur requis !"});});
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isModerator: isModerator
};

module.exports = authJwt;