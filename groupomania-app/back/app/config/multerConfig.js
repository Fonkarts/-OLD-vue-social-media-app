const multer = require("multer");

const MIME_TYPES = {
    'image/jpg': "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif"
} // Définit les extensions des fichiers via leur MIME_TYPE

const storage = multer.diskStorage({
    // Configuration du storage
    destination: (req, file, callback) => {
        callback(null, "images")
        // Définition du répertoire de destination
    },
    filename: (req, file, callback) => {
        const name= file.originalname.split(" ").join("_");
        // Décomposition du nom original du fichier autour des " " et jointure avec des "_"

        const extension = MIME_TYPES[file.mimetype];
        // Définition de l'extension du fichier via son MIME_TYPE
        callback(null, name + Date.now() + "." + extension);
        // Génération d'un nom de fichier unique avec l'ajout d'un TIMESTAMP
    }
});

module.exports = multer({storage: storage}).single("image");
// Export du middleware en précisant qu'il s'agit d'un fichier unique de type IMAGE