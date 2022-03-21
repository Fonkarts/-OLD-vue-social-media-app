const auth = require("../middlewares/authJwt");
const controller = require("../controllers/userController");

module.exports = function(app) {

  app.get(
    "/api/users/:id",
    [auth.verifyToken],
    controller.getUser
  );
  app.get(
    "/api/users",
    [auth.verifyToken],
    controller.getAllUsers
  );
  app.put(
    "/api/users/:id",
    [auth.verifyToken],
    controller.modifyUser
  );
  app.delete(
    "/api/users/:id",
    [auth.verifyToken],
    controller.deleteUser
  );
};


