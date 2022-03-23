const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;
const Role = db.role;
// const Op = db.Sequelize.Op;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

// Création du compte utilisateur
exports.signUp = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    // Le mot de passe est encrypté et salé pour être stocké de manière sécurisée dans la BDD
    password: bcrypt.hashSync(req.body.password, 10),
    photo: req.body.photo
  })
    .then(user => {
      // Création d'une entrée dans la table "user_roles"
      if (req.body.role) {
        // Si un "role" est précisé à la création... (uniquement pour le modérateur pour l'instant)
        Role.findAll({where: {name: req.body.role}})
        .then(role => {
          user.setRoles(role)
          .then(() => {
            res.status(200).json({message: "Utilisateur enregistré !"});
          })
          .catch(() => res.status(500).json({message: "Echec de l'attribution de rôle !"}));
        })
        .catch(() => res.status(404).json({message: "Rôle non trouvé !"}));
        // ...sinon, attribution du rôle "utilisateur"
      } else {
        user.setRoles([1]).then(() => {
          res.status(200).json({message: "Echec de l'attribution de rôle !"});
        });
      }
    })
    .catch(() => res.status(500).json({message: "Echec de la création de compte !"}));
  };

  // Connexion de l'utilisateur à sa session
  exports.logIn = (req, res) => {
    User.findOne({where: {username: req.body.username}})
      .then(user => {
        if (!user) {
          return res.status(404).json({message: "Utilisateur non trouvé !"});
        }
        // Comparaison du mot de passe entré au hash de la BDD
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        // Si le password n'est pas valide...
        if (!passwordIsValid) {
          return res.status(401).json({
            accessToken: null,
            message: "Mot de passe Invalide !"
          });
        }
        // ...sinon, attribution du token
        let token = jwt.sign(
            { id: user.id }, 
            config.secret, 
            {expiresIn: "24h"}
          );
        // Définition du rôle de l'utilisateur depuis la table "user_roles"
        let authorities = [];
        user.getRoles()
        .then(role => {
          for (let i = 0; i < role.length; i++) {
            authorities.push(role[i].name);
          }
          // Renvoie des informations de l'utilisateur
          res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            photo: user.photo,
            role: authorities,
            accessToken: token,
          });
        })
        .catch(() => res.status(404).json({message: "Echec de l'attribution de rôle !"}));
      })
      .catch(() => res.status(400).json({message: "Echec de la connexion au compte utilisateur !"}));
  };

