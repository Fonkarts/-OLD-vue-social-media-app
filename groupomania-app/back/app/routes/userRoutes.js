const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

module.exports = function(app) {
  app.get(
    "/api/users/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  app.get(
    "/api/users/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/users/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/users/:id",
    [authJwt.verifyToken],
    controller.getUser
  );
  app.get(
    "/api/users",
    [authJwt.verifyToken],
    controller.getAllUsers
  );
};


