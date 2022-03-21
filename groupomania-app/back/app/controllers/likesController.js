const db = require("../models");
const Likes = db.likes;

exports.getAllLikesFromAnUser = (req, res) => {
    Likes.findAll({where: {userId: req.params.id}})
    .then(articlesLiked => {
        if(!articlesLiked) {
            res.status(200).json({message: "L'utilisateur n'a pas encore soumis de vote !"});
        }
        res.status(200).json({articlesLiked});
    })
    .catch(error => res.status(500).json({ error }));  
}