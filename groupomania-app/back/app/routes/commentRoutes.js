const auth = require("../middlewares/authJwt");

module.exports = app => {
    const comments = require("../controllers/commentController.js");
    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", auth.verifyToken, comments.createComment);
    // Retrieve all Tutorials
    // router.get("/", auth.verifyToken, comments.getAllComments);

    router.get("/:id", auth.verifyToken, comments.getAllCommentsFromAnArticle);
    // Retrieve a single Tutorial with id
    router.get("/:id", auth.verifyToken, comments.getOneComment);
    // // Update a Tutorial with id
    router.put("/:id", auth.verifyToken, comments.modifyComment);
    // Delete a Tutorial with id
    router.delete("/:id", auth.verifyToken, comments.deleteComment);

    app.use('/api/comments', router);
  };