const db = require("../models");
const Comment = db.comment;
const User = db.user;
const Article = db.article; 
const fs = require("fs");
// const Op = db.Sequelize.Op;


// Crée et sauvegarde un commentaire (POST)
exports.createComment = (req, res) => { // PENSER à faire vérifs required dans FRONT !!
    Comment.create({...req.body})
    .then(() => {
        res.status(201).json({message: "Commentaire créé !"});

        // User.findOne({where: {username: req.body.userId}})
        // .then(user => {
        //     comment.setUsers(user);
        //     console.log("TEST2");
        //     res.status(201).json(comment + user + "Commentaire créé !");
        //     Article.findOne({where: {id: req.body.articleId}})
        //     .then(article => {
        //         console.log("TEST4");
        //         comment.setArticles(article);
        //         res.status(201).json(comment + user + article + "Commentaire créé !");
        //     })
        //     .catch(error => res.status(401).json({ error }));
        // })
        // .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Met à jour les informations d'un commentaire (UPDATE)
exports.modifyComment = (req, res) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
        if(!comment) { // Si le commentaire n'existe pas...
            return res.status(404).json({message: "Commentaire non trouvé !"});
        }
        if(comment.userId != req.body.data.userId) { // Si la requête n'est pas envoyée par la personne ayant posté le commentaire...
            
            return res.status(403).json({message: "Requête non autorisée !"});
        } 
        Comment.update(req.body.data, {where: {id: req.params.id}})
            .then(() => res.status(200).json({message: "Commentaire modifié !"}))
            .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({ error }));
};

// Supprime un commentaire grâce à son ID (DELETE)
exports.deleteComment = (req, res) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
        if(!comment) { // Si le commentaire n'existe pas...
            return res.status(404).json({message: "Commentaire non trouvé !"});
        };
        if(comment.userId != req.body.userId) { // Si la requête n'est pas envoyée par la personne ayant créé la sauce...
            return res.status(403).json({message: "Requête non autorisée !"});
        } 
        Comment.destroy({where: {id: req.params.id}}) 
        .then(() => res.status(200).json({message: "Commentaire supprimé !"}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(400).json({error}));
};

// Renvoie un commentaire par son ID (GET)
exports.getOneComment = (req, res) => {
    Comment.findOne({where: {id: req.params.id}}) 
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({error}));
};

// Renvoie tous les commentaires de la BDD (GETALL)
exports.getAllCommentsFromAnArticle = (req, res) => { 
    Comment.findAll({where: {articleId: req.params.id}})  
    .then((comments) => res.status(200).json(comments))
    .catch(error => res.status(400).json({error}));
};
