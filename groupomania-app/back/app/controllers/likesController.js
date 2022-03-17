const db = require("../models");
// const Article = db.article;
// const User = db.user;
const Likes = db.likes;


// exports.createLikeEntry = (req, res) => {
//     Likes.create({
//         articleId: req.params.id,
//         userId: req.body.data.userId,
//         userLikes: req.body.data.likeEntries.userLikes,
//         userDislikes: req.body.data.likeEntries.userDislikes
//     })
//     .then(() => {
//         res.status(201).json({message: "Informations relatives au vote utilisateur créées !"});
//     })
//     .catch(error => res.status(500).json({ error }));    
// }

// exports.modifyLikeEntry = (req, res) => {
//     Likes.update({
//         userLikes: req.body.data.likeEntries.userLikes,
//         userDislikes: req.body.data.likeEntries.userDislikes
//     }, {where: {articleId: req.params.id, userId: req.body.data.userId}})
//     .then(() => {
//         res.status(200).json({message: "Informations relatives au vote utilisateur modifiées !"});
//     })
//     .catch(error => res.status(500).json({ error }));    
// }

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