const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

exports.signUp = (req, res) => {
  // const userObject = req.file ? // La requête contient-elle un fichier ?
  // // Si oui:
  // {
  //     ...JSON.parse(req.body.user),
  //     photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  // } : /*Si non: */ {...req.body};
  //     User.create(userObject)
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      photo: req.body.photo
    })
      .then(user => {
        if (req.body.roles) {
          Role.findAll({where: {name: {[Op.or]: req.body.roles}
          }})
          .then(roles => {
            user.setRoles(roles)
            .then(() => {
              res.status(200).json({message: "Utilisateur enregistré !"});
            })
            .catch(error => res.status(400).json({error}));
          })
          .catch(error => res.status(400).json({error}));
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.status(200).json({message: "Utilisateur enregistré !"});
          });
        }
      })
      .catch(error => res.status(500).json({error}));
  };

  exports.logIn = (req, res) => {
    User.findOne({where: {username: req.body.username}})
      .then(user => {
        if (!user) {
          return res.status(404).json({message: "Utilisateur non trouvé !"});
        }
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).json({
            accessToken: null,
            message: "Mot de passe Invalide !"
          });
        }
        let token = jwt.sign(
            { id: user.id }, 
            config.secret, 
            {expiresIn: "24h"}
          );
        // req.headers.authorization = token;
        let authorities = [];
        user.getRoles()
        .then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            photo: user.photo,
            roles: authorities,
            accessToken: token,
          });
        })
        .catch(error => res.status(400).json({error}));
      })
      .catch(error => res.status(400).json({error}));
  };

