const db = require("../models");
const Article = db.article;
const Likes = db.likes;
const User = db.user;
const Comment = db.comment;

// Supprime un article grâce à son ID
exports.moderatorDeleteArticle = (req, res) => {
    Article.findOne({where: {id: req.params.id}})
    .then(article => {
        if(!article) { // Si l'article n'existe pas...
            return res.status(404).json({message: "Article non trouvé !"});
        }
        if(req.body.isModerator === true) { // Si l'utilisateur est un modérateur...
        Article.destroy({where: {id: req.params.id}}) 
        .then(() => {
            // Suppression des entrées de la table "likes" associées à l'article
            Likes.destroy({where: {articleId: req.params.id}})
            .then(() => {
                // Suppression des entrées de la table "comments" associées à l'article
                Comment.destroy({where: {articleId: req.params.id}})
                .then(() => res.status(200).json({message: "Article, likes et commentaires supprimés !"}))
                .catch(() => res.status(400).json({message: "Problème de suppression des commentaires associés !"}));
            })
            .catch(() => res.status(500).json({message: "Problème de suppression des likes associés !"}));
        })
        .catch(() => res.status(500).json({message: "Problème de suppression de l'article !"}));
        } 
    })
    .catch(() => res.status(500).json({message: "Problème de suppression de l'article !"}));
};

// Supprime un commentaire grâce à son ID
exports.moderatorDeleteComment = (req, res) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
        if(!comment) { // Si le commentaire n'existe pas...
            return res.status(404).json({message: "Commentaire non trouvé !"});
        };
        if(req.body.isModerator === true) { // Si la requête est envoyée par le modérateur...
            Comment.destroy({where: {id: req.params.id}}) 
            .then(() => res.status(200).json({message: "Commentaire supprimé !"}))
            .catch(() => res.status(400).json({message: "Echec de la suppression du commentaire !"}));
        } 
    })
    .catch(() => res.status(500).json({message: "Echec de la suppression du commentaire !"}));
};

// Renvoie l'adresse mail de l'utilisateur pour contact
exports.getUserMail = (req, res) => {
    User.findOne({where: {username: req.params.id}})
    .then(user => {
        if(!user) { // Si le commentaire n'existe pas...
            return res.status(404).json({message: "Utilisateur non trouvé !"});
        };
        res.status(200).json({userEmail: user.email});
    })
    .catch(() => res.status(500).json({message: "Utilisateur non trouvé !"}));
};