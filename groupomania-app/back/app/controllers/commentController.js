const db = require("../models");
const Comment = db.comment;
// const User = db.user;
// const Article = db.article; 
// const fs = require("fs");
// const Op = db.Sequelize.Op;


// Crée et sauvegarde un commentaire (POST)
exports.createComment = (req, res) => { 
    Comment.create({...req.body})
    .then(() => {
        res.status(201).json({message: "Commentaire créé !"});
    })
    .catch(() => res.status(500).json({message: "Echec de la création de commentaire !"}));
};

// Met à jour les informations d'un commentaire (UPDATE)
exports.modifyComment = (req, res) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
        // Si le commentaire n'existe pas...
        if(!comment) { 
            return res.status(404).json({message: "Commentaire non trouvé !"});
        } // Si la requête n'est pas envoyée par l'auteur du commentaire...
        if(comment.userId != req.body.data.userId) { 
            return res.status(403).json({message: "Requête non autorisée !"});
        } 
        Comment.update(req.body.data, {where: {id: req.params.id}})
            .then(() => res.status(200).json({message: "Commentaire modifié !"}))
            .catch(() => res.status(400).json({message: "Echec de la mise à jour du commentaire !"}));
    })
    .catch(() => res.status(500).json({message: "Echec de la mise à jour du commentaire !"}));
};

// Supprime un commentaire grâce à son ID (DELETE)
exports.deleteComment = (req, res) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
        // Si le commentaire n'existe pas...
        if(!comment) { 
            return res.status(404).json({message: "Commentaire non trouvé !"});
        };
        // Si la requête n'est pas envoyée par l'auteur du commentaire...
        if(comment.userId != req.body.userId) { 
            return res.status(403).json({message: "Requête non autorisée !"});
        } 
        Comment.destroy({where: {id: req.params.id}}) 
        .then(() => res.status(200).json({message: "Commentaire supprimé !"}))
        .catch(() => res.status(400).json({message: "Echec de la suppression du commentaire !"}));
    })
    .catch(() => res.status(400).json({message: "Echec de la suppression du commentaire !"}));
};

// Renvoie un commentaire par son ID (GET)
// Ce middleware n'est pas encore en service, mais peut servir à de futures mises à jour
// (signalement au modérateur par exemple)
exports.getOneComment = (req, res) => {
    Comment.findOne({where: {id: req.params.id}}) 
    .then(comment => res.status(200).json(comment))
    .catch(() => res.status(404).json({message: "Commentaire non trouvé !"}));
};

// Renvoie tous les commentaires associé à un article (GETALL)
exports.getAllCommentsFromAnArticle = (req, res) => { 
    Comment.findAll({where: {articleId: req.params.id}})  
    .then((comments) => res.status(200).json(comments))
    .catch(() => res.status(400).json({message : "Commentaires non trouvés !"}));
};
