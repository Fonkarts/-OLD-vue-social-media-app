const db = require("../models");
const Article = db.article;
const User = db.user;
const Likes = db.likes;
const Comment = db.comment;
const fs = require("fs");
const { sequelize } = require("../models");

// Crée et sauvegarde un article (POST)
exports.createArticle = (req, res) => {
    const articleObject = req.file ? // La requête contient-elle un fichier ?
    // Si oui:
    {
        ...JSON.parse(req.body.article),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : /*Si non: */ {...req.body};
        Article.create(articleObject)
        .then(article => {
            User.findOne({where: {id: req.body.userId}})
            .then(user => {
                // Ajout d'une entrée dans la table de liaison "user_articles"
                // Cette table n'est pas encore en service, mais peut servir à de futures mises à jour
                // (droits modérateur par exemple)
                article.setUsers(user);
                res.status(201).json(articleObject + user);
            })
            .catch(() => res.status(400).json({message: "Utilisateur non trouvé !"}));
        })
        .catch(() => res.status(500).json({message: "Echec de la création de l'article !"}));
};

exports.modifyArticle = (req, res) => {
    Article.findOne({where: {id: req.params.id}})
    .then(article => {
        if(!article) { // Si l'article n'existe pas...
            return res.status(404).json({message: "Article non trouvé !"});
        }
        if(article.userId != req.body.data.userId) { // Si la requête n'est pas envoyée par la personne ayant créé l'article...
            return res.status(403).json({message: "Requête non autorisée !"});
        } 
        const ArticleObject = req.file ? // La requête contient-elle un fichier ?
        // Si oui:
        {
            ...JSON.parse(req.body.data),
            imageUrl: req.body.data.imageUrl
        } : /*Si non: */ {...req.body.data};
        Article.update({...ArticleObject}, {where: {id: req.params.id}})
            .then(() => res.status(200).json({message: "Article modifié !"}))
            .catch(() => res.status(400).json({message: "Echec de la modification d'article ou Requête mal formulée !"}));
    })
    .catch(() => res.status(500).json({message: "Problème lors de la modification de l'article !"}));
};

// Supprime un article grâce à son ID (DELETE)
exports.deleteArticle = (req, res) => {
    Article.findOne({where: {id: req.params.id}})
    .then(article => {
        console.log(article);
        if(!article) { // Si l'article n'existe pas...
            return res.status(404).json({message: "Article non trouvé !"});
        }
        if(article.userId != req.body.userId) { // Si la requête n'est pas envoyée par l'auteur de l'article...
            return res.status(403).json({message: "Requête non autorisée !"});
        } 
        const filename = article.imageUrl.split("/images/")[1]; // Récupération du nom du fichier
        fs.unlink(`images/${filename}`, () => { // Supprime le fichier du stockage.
            Article.destroy({where: {id: req.params.id}}) 
        .then(() => {
            // Suppression des entrées associées dans la table "likes"
            Likes.destroy({where: {articleId: req.params.id}})
            .then(() => {
                // Suppression des entrées associées dans la table "comments"
                Comment.destroy({where: {articleId: req.params.id}})
                .then(() => res.status(200).json({message: "Article, likes et commentaires supprimés !"}))
                .catch(() => res.status(400).json({message: "Problème de suppression des commentaires associés !"}));
            })
            .catch(() => res.status(500).json({message: "Problème de suppression des likes associés !"}));
        })
        .catch(() => res.status(500).json({message: "Problème de suppression de l'article !"}));
        })
    })
    .catch(() => res.status(500).json({message: "Problème de suppression de l'article !"}));
};

// Renvoie un article par son ID (GET)
// Ce middleware n'est pas encore en service, mais peut servir à de futures mises à jour
// (droits modérateur ou recherche utilisateur par exemple)
exports.getOneArticle = (req, res) => {
    //
    Article.findOne({id: req.params.id}) 
    .then(article => res.status(200).json(article))
    .catch(() => res.status(404).json({message: "Article non trouvé !"}));
};

// Renvoie tous les articles de la BDD du plus récent au plus ancien (GETALL)
exports.getAllArticles = (req, res) => {
    Article.findAll({order: [["id", "DESC"]]})
    .then(articles => res.status(200).json(articles))
    .catch(() => res.status(404).json({message: "Articles non trouvés !"}));
};

// Modifie le compteur de likes/dislikes d'un article et met à jour la table "likes"
exports.likeArticle = (req, res) => {
    Article.findOne({where: {id: req.params.id}})
    .then(article => {
        if(!article) { // Si l'article n'existe pas...
            return res.status(404).json({message: "Article non trouvé !"});
        }
        Likes.findOne({where: {articleId: req.params.id, userId: req.body.data.userId}})
        .then(like => {

            // Si l'utilisateur vote pour cet article pour la première fois et que son vote est positif...
            if(!like && req.body.data.like == 1) { 
                Article.update({likes: sequelize.literal("likes + 1")}, {where: {id: req.params.id}})
                .then(() => {
                    Likes.create({
                        articleId: req.params.id,
                        userId: req.body.data.userId,
                        userLikes: req.body.data.likeEntries.userLikes,
                        userDislikes: req.body.data.likeEntries.userDislikes
                    })
                    .then(() => {
                        res.status(201).json({message: "Informations relatives au vote utilisateur créées !"});
                    })
                    .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" })); 
                })
                .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" }));
            }

            // Si l'utilisateur vote pour cet article pour la première fois et que son vote est négatif...
            else if(!like && req.body.data.dislike == 1) { 
                Article.update({dislikes: sequelize.literal("dislikes + 1")}, {where: {id: req.params.id}})
                .then(() => {
                    Likes.create({
                        articleId: req.params.id,
                        userId: req.body.data.userId,
                        userLikes: req.body.data.likeEntries.userLikes,
                        userDislikes: req.body.data.likeEntries.userDislikes
                    })
                    .then(() => {
                        res.status(201).json({message: "Informations relatives au vote utilisateur créées !"});
                    })
                    .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" })); 
                })
                .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" }));
            }

            // Si l'utilisateur retire son like...
            else if(like.userLikes == 1 && like.userDislikes == 0 && req.body.data.like == 0) {
                Article.update({likes: sequelize.literal("likes - 1")}, {where: {id: req.params.id}})
                .then(() => {
                    Likes.update({
                        userLikes: req.body.data.likeEntries.userLikes,
                        userDislikes: req.body.data.likeEntries.userDislikes
                    }, {where: {articleId: req.params.id, userId: req.body.data.userId}})
                    .then(() => {
                        res.status(200).json({message: "Informations relatives au vote utilisateur modifiées !"});
                    })
                    .catch(() => res.status(500).json({message: "Echec de la mise à jour de la table likes !"})); 
                })
                .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" }));
            }

            // Si l'utilisateur retire son dislike...
            else if(like.userLikes == 0 && like.userDislikes == 1 && req.body.data.dislike == 0) {
                Article.update({dislikes: sequelize.literal("dislikes - 1")}, {where: {id: req.params.id}})
                .then(() => {
                    Likes.update({
                        userLikes: req.body.data.likeEntries.userLikes,
                        userDislikes: req.body.data.likeEntries.userDislikes
                    }, {where: {articleId: req.params.id, userId: req.body.data.userId}})
                    .then(() => {
                        res.status(200).json({message: "Informations relatives au vote utilisateur modifiées !"});
                    })
                    .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" }));    
                })
                .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" }));
            }

            // Si, après avoir retiré son vote, l'utilisateur soumet un like...
            else if(like.userLikes == 0 && like.userDislikes == 0 && req.body.data.like == 1) {
                Article.update({likes: sequelize.literal("likes + 1")}, {where: {id: req.params.id}})
                .then(() => {
                    Likes.update({
                        userLikes: req.body.data.likeEntries.userLikes,
                        userDislikes: req.body.data.likeEntries.userDislikes
                    }, {where: {articleId: req.params.id, userId: req.body.data.userId}})
                    .then(() => {
                        res.status(200).json({message: "Informations relatives au vote utilisateur modifiées !"});
                    })
                    .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" }));
                })
                .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" }));
            }

            // Si, après avoir retiré son vote, l'utilisateur soumet un dislike...
            else if(like.userLikes == 0 && like.userDislikes == 0 && req.body.data.dislike == 1) {
                Article.update({dislikes: sequelize.literal("dislikes + 1")}, {where: {id: req.params.id}})
                .then(() => {
                    Likes.update({
                        userLikes: req.body.data.likeEntries.userLikes,
                        userDislikes: req.body.data.likeEntries.userDislikes
                    }, {where: {articleId: req.params.id, userId: req.body.data.userId}})
                    .then(() => {
                        res.status(200).json({message: "Informations relatives au vote utilisateur modifiées !"});
                    })
                    .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" }));    
                })
                .catch(() => res.status(500).json({ message: "Echec de la mise à jour de la table likes !" }));
            }
        })
        .catch(() => res.status(400).json({message: "Requête mal formulée !"}));
    })
    .catch(() => res.status(400).json({message: "Requête mal formulée !"}));
};