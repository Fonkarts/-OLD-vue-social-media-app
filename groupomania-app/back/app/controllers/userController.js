const db = require("../models");
const User = db.user;
const Article = db.article;
const fs = require("fs");

// exports.userBoard = (req, res) => {
//     res.status(200).json({message:"Contenu Utilisateur"});
//   };
// exports.adminBoard = (req, res) => {
//     res.status(200).json({message:"Contenu Administrateur"});
//   };
// exports.moderatorBoard = (req, res) => {
//     res.status(200).json({message:"Contenu Modérateur"});
// };

// Renvoie les informations relatives à un utilisateur (hash et token non renvoyés)
exports.getUser = (req, res) => {
    User.findOne({where: {id: req.params.id}})
      .then(user => {
        if(!user) {
          return res.status(404).json({message: "Utilisateur non trouvé !"});
        }
          res.status(200).json({
            userId: user.id,
            username: user.username,
            userEmail: user.email,
            userPhoto: user.photo,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          })
      })
      .catch(() => res.status(500).json({message: "Problème avec le renvoi des informations utilisateur !"}));
};

// Renvoie un tableau contenant les informations relatives aux utilisateurs
// Ce middleware n'est pas encore en service, mais peut servir à de futures mises à jour
// (droits modérateur par exemple)
exports.getAllUsers = (req, res) => {
  User.findAll()
  .then(users => {
    if(!users) {
      return res.status(404).json({message: "Utilisateur non trouvé !"});
    }
    res.status(200).json(users.id, users.email, users.username, users.createdAt, users.updatedAt) 
  })
  .catch(() => res.status(400).json({message: "Problème avec le renvoi des informations utilisateur !"}));
}

exports.modifyUser = (req, res) => {
  User.findOne({where: {id: req.params.id}})
  .then(user => {
      if(!user) { // Si l'utilisateur n'existe pas...
          return res.status(404).json({message: "Utilisateur non trouvé !"});
      }
      if(user.id != req.params.id) { // Si la requête n'est pas envoyée par l'utilisateur...
          return res.status(403).json({message: "Requête non autorisée !"});
      } 
        const UserObject = req.file ? // La requête contient-elle un fichier ?
        // Si oui:
        {
            ...JSON.parse(req.body.data),
            photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : /*Si non: */ {...req.body.data};
        User.update({...UserObject}, {where: {id: req.params.id}})
            .then(() => {
              if(req.body.data.username) {
                // Trouve les articles dont l'utilisateur est l'auteur
                Article.findAll({where: {userId: req.params.id}})
                .then(() => {
                  // Met à jour le nom de l'utilisateur pour les articles concernés
                  Article.update(req.body.data, {where: {userId: req.params.id}})
                  .then(() => res.status(200).json({message: "Nom de l'auteur bien mis à jour dans Articles !"}))
                  .catch(() => res.status(500).json({message: "Problème avec la mise à jour du nom de l'auteur de l'article !"}));
                })
              } else {
                res.status(200).json({message: "Nom de l'utilisateur bien mis à jour !"})
              }
            })
            .catch(() => res.status(400).json({message: "Problème avec la mise à jour des données utilisateur !"}));
  })
  .catch(() => res.status(400).json({message: "Problème avec la modification des informations utilisateur !"}));
};

exports.deleteUser = (req, res) => {
  User.findOne({where: {id: req.params.id}})
  .then(user => {
      if(!user) { // Si l'utilisateur n'existe pas...
          return res.status(404).json({message: "Utilisateur non trouvé !"});
      };
      if(user.username != req.body.username) { // Si la requête n'est pas envoyée par l'utilisateur...
          return res.status(403).json({message: "Requête non autorisée !"});
      } 
      User.findOne({id: req.params.id})
      .then(user => {
          const filename = user.photo.split("/images/")[1]; // Récupération du nom du fichier
          fs.unlink(`images/${filename}`, () => { // Supprime le fichier du stockage.
              User.destroy({where: {id: req.params.id}}) 
              .then(() => res.status(200).json({message: "Utilisateur supprimé !"}))
              .catch(() => res.status(400).json({message: "Echec de la suppression du compte utilisateur !"}));
          });
      })
      .catch(() => res.status(404).json({message: "Utilisateur non trouvé !"}));
  })
  .catch(() => res.status(500).json({message: "Echec de la suppression du compte utilisateur !"}));
};
