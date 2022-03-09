const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const corsOptions = {
  origin: "http://localhost:8080", 
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
};

app.use(cors(corsOptions));

// Parse les requêtes de content-type - application/json
app.use(express.json());
// Parse les requêtes de content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));

// Indique la manière de gérer les dossiers d'images.
app.use("/images", express.static(path.join(__dirname, "images")));

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require("./routes/articleRoutes")(app);
require("./routes/commentRoutes")(app);

const db = require("./models");
const Role = db.role; // >> !!!!!!!!!!!!! ANY !!!!!!!!!!!!!!!!!!! CHECK !!
db.sequelize.sync(
  // {force: true})
  // .then(() => {
  // console.log("Drop et re-sync BDD");
  // initial();
  // }
);

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "admin"
  });
}

// Définit le port à écouter pour les requêtes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ce serveur fonctionne sur le port ${PORT}.`);
});




