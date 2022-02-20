const { signUpCheck } = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/auth/signup",
    [signUpCheck.checkExistingNameOrEmail, signUpCheck.checkExistingRole],
    controller.signUp
  );
  app.post("/api/auth/login", controller.logIn);
};