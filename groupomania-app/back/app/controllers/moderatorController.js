const db = require("../models");
const Article = db.article;
const Likes = db.likes;
const User = db.user;
const Comment = db.comment;
const fs = require("fs");

// Supprime un article grâce à son ID (DELETE)
exports.moderatorDeleteArticle = (req, res) => {
    Article.findOne({where: {id: req.params.id}})
    .then(article => {
        console.log(article);
        if(!article) { // Si l'article n'existe pas...
            return res.status(404).json({message: "Article non trouvé !"});
        }
        if(req.body.isModerator === true) { // Si l'utilisateur est un modérateur...
            const filename = article.imageUrl.split("/images/")[1]; // Récupération du nom du fichier
            fs.unlink(`images/${filename}`, () => { // Supprime le fichier du stockage.
            Article.destroy({where: {id: req.params.id}}) 
            
            .then(() => {
                Likes.destroy({where: {articleId: req.params.id}})
                .then(() => {
                    Comment.destroy({where: {articleId: req.params.id}})
                    .then(() => res.status(200).json({message: "Article, likes et commentaires supprimés !"}))
                    .catch(() => res.status(400).json({message: "Problème de suppression des commentaires associés !"}));
                })
                .catch(() => res.status(500).json({message: "Problème de suppression des likes associés !"}));
            })
            .catch(() => res.status(500).json({message: "Problème de suppression de l'article !"}));
            })
        } 
    })
    .catch(() => res.status(500).json({message: "3333333333333333333333333333 !"}));
};

exports.moderatorDeleteComment = (req, res) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
        if(!comment) { // Si le commentaire n'existe pas...
            return res.status(404).json({message: "Commentaire non trouvé !"});
        };
        if(req.body.isModerator === true) { // Si la requête est envoyée par le modérateur...
            Comment.destroy({where: {id: req.params.id}}) 
            .then(() => res.status(200).json({message: "Commentaire supprimé !"}))
            .catch(error => res.status(400).json({error}));
        } 
    })
    .catch(error => res.status(500).json({error}));
};

exports.getUserMail = (req, res) => {
    User.findOne({where: {username: req.params.id}})
    .then(user => {
        if(!user) { // Si le commentaire n'existe pas...
            return res.status(404).json({message: "Commentaire non trouvé !"});
        };
        res.status(200).json({userEmail: user.email});
    })
    .catch(error => res.status(500).json({error}));
};