const db = require("../models");
const Likes = db.likes;

// Renvoie tous les votes de l'utilisateur
exports.getAllLikesFromAnUser = (req, res) => {
    Likes.findAll({where: {userId: req.params.id}})
    .then(articlesLiked => {
        if(!articlesLiked) {
            res.status(200).json({message: "L'utilisateur n'a pas encore soumis de vote !"});
        }
        res.status(200).json({articlesLiked});
    })
    .catch(() => res.status(500).json({message: "Votes utilisateur non trouvés !"}));  
}