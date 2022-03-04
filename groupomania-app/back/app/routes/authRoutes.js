const { signUpCheck } = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function(app) {
  app.post("/api/auth/signup",
    [signUpCheck.checkExistingNameOrEmail, signUpCheck.checkExistingRole],
    controller.signUp
  );
  app.post("/api/auth/login", controller.logIn);
};