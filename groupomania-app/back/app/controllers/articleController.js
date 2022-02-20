const db = require("../models");
const Article = db.article;
const fs = require("fs");
// const Op = db.Sequelize.Op;


// Crée et sauvegarde un article (POST)
exports.createArticle = (req, res) => { // PENSER à faire vérifs required dans FRONT !!
    const articleObject = req.file ? // La requête contient-elle un fichier ?
    // Si oui:
    {
        ...JSON.parse(req.body.article),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : /*Si non: */ {...req.body};
    Article.create(articleObject)
    .then(() => {
        res.status(201).json(articleObject);
        res.send({message: "Article créé !"});
    })
    .catch(error => res.status(500).json({error}))
};

// Met à jour les informations d'un article (UPDATE)
exports.modifyArticle = (req, res) => {
    Article.findOne({id: req.params.id})
    .then(article => {
        if(!article) { // Si l'article n'existe pas...
            return res.status(404).json({message: "Article non trouvé !"});
        }
        if(article.userId !== req.auth.userId) { // Si la requête n'est pas envoyée par la personne ayant créé l'article...
            return res.status(403).json({message: "Requête non autorisée !"});
        } 
        const ArticleObject = req.file ? // La requête contient-elle un fichier ?
        // Si oui:
        {
            ...JSON.parse(req.body.article),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : /*Si non: */ {...req.body};
        Article.update({id: req.params.id}, {...ArticleObject, id: req.params.id})
            .then(() => res.status(200).json({message: "Article modifié !"}))
            .catch(error => res.status(400).json({error}));
    })
};

// Supprime un article grâce à son ID (DELETE)
exports.deleteArticle = (req, res) => {
    Article.findOne({id: req.params.id})
    .then(article => {
        if(!article) { // Si l'article n'existe pas...
            return res.status(404).json({message: "Article non trouvé !"});
        };
        if(article.userId !== req.auth.userId) { // Si la requête n'est pas envoyée par la personne ayant créé la sauce...
            return res.status(403).json({message: "Requête non autorisée !"});
        } 
        Article.findOne({id: req.params.id})
        .then(article => {
            const filename = article.imageUrl.split("/images/")[1];
            // Récupération du nom du fichier
            fs.unlink(`images/${filename}`, () => { // Supprime le fichier du stockage.
                Article.destroy({ _id: req.params.id}) 
                .then(() => res.status(200).json({message: "Sauce supprimée !"}))
                .catch(error => res.status(400).json({error}));
            });
        })
    })
};


// REFLECHIR A COMMENT INTEGRER LE GET ONE (title, username,etc.) !!!

// Renvoie un article par son ID (GET)
exports.getOneArticle = (req, res) => {
    Article.findOne({id: req.params.id}) 
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({error}));
};

// Renvoie tous les articles de la BDD (GETALL)
exports.getAllArticles = (req, res) => {
    Article.findAll()
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({error}));
};


