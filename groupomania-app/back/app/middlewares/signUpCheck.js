const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkExistingNameOrEmail = (req, res, next) => {
  // Vérifie que le nom entré par l'utilisateur n'est pas déjà utilisé
  User.findOne({where: {username: req.body.username}})
  .then(user => {
    if (user) {
      return res.status(400).json({message: "Cet identifiant est déjà utilisé !"});
    }
    // Vérifie que l'adresse mail entrée par l'utilisateur n'est pas déjà utilisée
    User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (user) {
        res.status(400).json({message: "Ce mail est déjà utilisé !"});
        return;
      }
      next();
    });
  });
};
// Vérifie si les données du signUp contiennent un champ "role"
// (ce qui pour l'instant n'est vrai que lors de la création d'un compte modérateur vie Postman ou SQL)
// et vérifie que le rôle en question existe bien
checkExistingRole = (req, res, next) => {
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) {
      res.status(400).json({message: "Ce rôle n'existe pas = " + req.body.role});
      return;
    }
  }
  next();
};

const signUpCheck = {
    checkExistingNameOrEmail: checkExistingNameOrEmail,
    checkExistingRole: checkExistingRole
};

module.exports = signUpCheck;