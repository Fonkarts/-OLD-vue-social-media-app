const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const db = require("../models");
const User = db.user;

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