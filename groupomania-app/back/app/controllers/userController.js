const db = require("../models");
const User = db.user;

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
  User.findOne({id: req.params.id})
  .then(user => {
    res.status(200).json({
      userId: user.id,
      username: user.username,
      userEmail: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  })
  .catch(error => res.status(400).json({ error }));
};
exports.getAllUsers = (req, res) => {
  User.findAll()
  .then(users => {
    res.status(200).json({users}) // ATTENTION RENVOIE AUSSI LES HASH !!!!!!
  })
  .catch(error => res.status(400).json({ error }));
}
