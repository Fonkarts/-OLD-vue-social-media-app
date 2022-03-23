// Import du module de vérification du signUp
const { signUpCheck } = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function(app) {
  // Route signUp et modules de vérification du nom, du mail et du rôle
  app.post("/api/auth/signup",
    [signUpCheck.checkExistingNameOrEmail, signUpCheck.checkExistingRole],
    controller.signUp
  );
  // Route logIn et modules de vérification du nom, du mail et du rôle
  app.post("/api/auth/login", controller.logIn);
};