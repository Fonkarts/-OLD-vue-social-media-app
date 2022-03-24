const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const corsOptions = {
  origin: "http://localhost:8080", 
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
};

// Utilise les options de requêtes définies ci-dessus
app.use(cors(corsOptions));

// Parse les requêtes de content-type - application/json
app.use(express.json());
// Parse les requêtes de content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));

// Indique la manière de gérer les dossiers d'images.
app.use("/images", express.static(path.join(__dirname, "images")));

// Utilisation des routes par l'app
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require("./routes/articleRoutes")(app);
require("./routes/commentRoutes")(app);
require("./routes/likesRoutes")(app);
require("./routes/moderatorRoutes")(app);

const db = require("./models");
const Role = db.role; 
db.sequelize.sync(
  // Si décommentées, les lignes ci-dessous vont réinitialiser la BDD au redémarrage du Node 
  // (donc au ctrl+s avec nodemon)
  // Commentées, elles permettent une persistance des données

  // {force: true})
  // .then(() => {
  // console.log("Drop et re-sync BDD");
  // initial();
  // })
  // .catch(error => console.log(error)
  );

// Définition de deux niveaux de privilèges
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
}

// Définit le port à écouter pour les requêtes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ce serveur fonctionne sur le port ${PORT}.`);
});




