const db = require("../models");
const User = db.user;
const fs = require("fs");

exports.userBoard = (req, res) => {
    res.status(200).json({message:"Contenu Utilisateur"});
  };
exports.adminBoard = (req, res) => {
    res.status(200).json({message:"Contenu Administrateur"});
  };
exports.moderatorBoard = (req, res) => {
    res.status(200).json({message:"Contenu Modérateur"});
};
exports.getUser = (req, res) => {
  User.findOne({where: {username: req.params.id}})
  .then(user => {
    res.status(200).json( {
      userId: user.id,
      username: user.username,
      userEmail: user.email,
      userPhoto: user.photo,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  })
  .catch(error => res.status(400).json({ error }));
};
exports.getAllUsers = (req, res) => {
  User.findAll()
  .then(users => {
    res.status(200).json(users.id, users.email, users.createdAt, users.updatedAt) 
  })
  .catch(error => res.status(400).json({ error }));
}

exports.modifyUser = (req, res) => {
  User.findOne({where: {username: req.params.id}})
  .then(user => {
      if(!user) { // Si l'utilisateur n'existe pas...
          return res.status(404).json({message: "Utilisateur non trouvé !"});
      }
      if(user.username != req.body.data.userId) { // Si la requête n'est pas envoyée par l'utilisateur...
          return res.status(403).json({message: "Requête non autorisée !"});
      } 
        const UserObject = req.file ? // La requête contient-elle un fichier ?
        // Si oui:
        {
            ...JSON.parse(req.body.data),
            photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : /*Si non: */ {...req.body.data};
        User.update({...UserObject}, {where: {username: req.params.id}})
            .then(() => res.status(200).json({message: "Informations de compte modifiées !"}))
            .catch(error => res.status(400).json({error}));
  })
  .catch(error => res.status(400).json({error}));
};

exports.deleteUser = (req, res) => {
  User.findOne({where: {username: req.params.id}})
  .then(user => {
      if(!user) { // Si l'utilisateur n'existe pas...
          return res.status(404).json({message: "Utilisateur non trouvé !"});
      };
      if(user.username != req.body.userId) { // Si la requête n'est pas envoyée par la personne ayant créé la sauce...
          return res.status(403).json({message: "Requête non autorisée !"});
      } 
      User.findOne({id: req.params.id})
      .then(user => {
          const filename = user.photo.split("/images/")[1]; // Récupération du nom du fichier
          fs.unlink(`images/${filename}`, () => { // Supprime le fichier du stockage.
              User.destroy({where: {username: req.params.id}}) 
              .then(() => res.status(200).json({message: "Utilisateur supprimé !"}))
              .catch(error => res.status(400).json({ error}));
          });
      })
      .catch(error => res.status(400).json({error}));
  })
  .catch(error => res.status(400).json({error}));
};
