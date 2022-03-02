const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  // let token = req.headers["x-access-token"];
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
    // try {
    //     const token = req.headers.authorization.split(" ")[1]; 
    //     // Récupération du token dans le header "Authorization".
    //     const decodedToken = jwt.verify(token, config.secret);
    //     // Décodage des informations du token avec jsonwebtoken.
    //     const userId = decodedToken.userId; 
    //     // Définition de l'userId (du token).
    //     req.auth = {userId}; 
    //     // Définition d'un paramètre de requête valant l'userId.
    //     if(req.body.userId && req.body.userId !== userId) { 
    //         // Si l'userId de la requête ne correspond pas à l'userId du token...
    //         throw "User ID non valable !";
    //     } else { // Sinon, exécute le middleware suivant.
    //         next(); 
    //     }
    // } catch (error) {
    //     res.status(401).json({error: error | "Requête non authentifiée !"});
    // }
};
isAdmin = (req, res, next) => {
  User.findByPk(req.userId)
  .then(user => {
    user.getRoles()
    .then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).json({message: "Droits Administrateur requis !"});
      return;
    });
  });
};
isModerator = (req, res, next) => {
  User.findByPk(req.userId)
  .then(user => {
    user.getRoles()
    .then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).json({message: "Droits Modérateur requis !"});});
  });
};
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId)
  .then(user => {
    user.getRoles()
    .then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({message: "Droits Modérateur ou Administrateur requis !"});
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;