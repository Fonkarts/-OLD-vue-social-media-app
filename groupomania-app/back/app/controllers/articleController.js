const db = require("../models");
const Article = db.article;
const User = db.user;
const Likes = db.likes;
const Comment = db.comment;
const fs = require("fs");
const { sequelize } = require("../models");

// Crée et sauvegarde un article (POST)
exports.createArticle = (req, res) => { // PENSER à faire vérifs required dans FRONT !!
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
                article.setUsers(user);
                res.status(201).json(articleObject + user);
                // res.send({user});
                // res.send({message: "Article créé !"});
            })
            .catch(error => res.status(400).json({ error }));
            // User.findAll({where: {username: {[Op.or]: req.body.username}
            // }})
            // .then(user => {
            //   article.setUser(user)
            //   .then(() => {
            //     res.status(200).json(articleObject);
            //     console.log(user);
            //     res.send({message: "Article créé !"});
            //   });
            // });
        })
        .catch(error => res.status(500).json({ error }));
};

// Met à jour les informations d'un article (UPDATE)
// exports.modifyArticle = (req, res) => {
//     Article.findOne({where: {id: req.params.id}})
//     .then(article => {
//         if(!article) { // Si l'article n'existe pas...
//             return res.status(404).json({message: "Article non trouvé !"});
//         }
//         if(article.userId != req.body.data.userId) { // Si la requête n'est pas envoyée par la personne ayant créé l'article...
//             return res.status(403).json({message: "Requête non autorisée !"});
//         } 
//         const ArticleObject = req.file ? // La requête contient-elle un fichier ?
//         // Si oui:
//         {
//             ...JSON.parse(req.body.data.article),
//             imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
//         } : /*Si non: */ {...req.body.data};
//         Article.update({...ArticleObject}, {where: {id: req.params.id}})
//             .then(() => res.status(200).json({message: "Article modifié !"}))
//             .catch(error => res.status(400).json({error}));
//     })
//     .catch(error => res.status(500).json({ error }));
// };

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
            // imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            imageUrl: req.body.data.imageUrl
        } : /*Si non: */ {...req.body.data};
        Article.update({...ArticleObject}, {where: {id: req.params.id}})
            .then(() => res.status(200).json({message: "Article modifié !"}))
            .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({ error }));
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
    })
    .catch(() => res.status(500).json({message: "Problème de suppression de l'article !"}));
};


// REFLECHIR A COMMENT INTEGRER LE GET ONE (title, username,etc.) !!!

// Renvoie un article par son ID (GET)
exports.getOneArticle = (req, res) => {
    Article.findOne({id: req.params.id}) 
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error }));
};

// Renvoie tous les articles de la BDD (GETALL)
exports.getAllArticles = (req, res) => {
    Article.findAll({order: [["id", "DESC"]]})
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({error}));
};

exports.likeArticle = (req, res) => {
    Article.findOne({where: {id: req.params.id}})
    .then(article => {
        if(!article) { // Si l'article n'existe pas...
            return res.status(404).json({message: "Article non trouvé !"});
        }
        Likes.findOne({where: {articleId: req.params.id, userId: req.body.data.userId}})
        // Likes.findAll({where: {articleId: req.params.id}})
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
                    .catch(error => res.status(500).json({ error })); 
                })
                .catch(() => res.status(400).json({ message: "Likes/Dislikes de l'article non modifiés !" }));
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
                    .catch(error => res.status(500).json({ error })); 
                })
                .catch(() => res.status(400).json({ message: "Likes/Dislikes de l'article non modifiés !" }));
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
                    .catch(error => res.status(500).json({ error })); 
                })
                .catch(() => res.status(400).json({ message: "Likes/Dislikes de l'article non modifiés !" }));
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
                    .catch(error => res.status(500).json({ error }));    
                })
                .catch(() => res.status(400).json({ message: "Likes/Dislikes de l'article non modifiés !" }));
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
                    .catch(error => res.status(500).json({ error })); 
                })
                .catch(() => res.status(400).json({ message: "Likes/Dislikes de l'article non modifiés !" }));
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
                    .catch(error => res.status(500).json({ error }));    
                })
                .catch(() => res.status(400).json({ message: "Likes/Dislikes de l'article non modifiés !" }));
            }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};