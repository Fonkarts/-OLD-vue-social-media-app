const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkExistingNameOrEmail = (req, res, next) => {
  // Username
  User.findOne({where: {username: req.body.username}})
  .then(user => {
    if (user) {
      return res.status(400).json({message: "Cet identifiant est déjà utilisé !"});
    }
    // Email
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

checkExistingRole = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({message: "Ce rôle n'existe pas = " + req.body.roles[i]});
        return;
      }
    }
  }
  next();
};

const signUpCheck = {
    checkExistingNameOrEmail: checkExistingNameOrEmail,
    checkExistingRole: checkExistingRole
};

module.exports = signUpCheck;