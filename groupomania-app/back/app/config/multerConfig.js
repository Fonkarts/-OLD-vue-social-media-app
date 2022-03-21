const multer = require("multer");

/*--------------------------------------------------------------*/
/*-----------------CHECK SI MODIFS A FAIRE !!!!!!!--------------*/
/*--------------------------------------------------------------*/


const MIME_TYPES = {
    'image/jpg': "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif"
} // Création un dictionnaire pour pouvoir définir les extensions des fichiers via leur MIME_TYPE

const storage = multer.diskStorage({
    // disk.storage indique que l'on sauvegarde les fichiers sur disque dur
    // Il prend deux fonctions: DESTINATION et FILENAME

    destination: (req, file, callback) => {
        callback(null, "images")
        // Apparemment, avec le premier argument on indique qu'il n'y a pas d'erreur (CHECK)
        // et avec le 2ème on indique le répertoire de destination
    },
    filename: (req, file, callback) => {
        const name= file.originalname.split(" ").join("_");
        // On décompose le nom original du fichier autour des " " et on "recolle" tout ça
        // avec des "_", puisque les espaces sont problématiques pour les serveurs

        const extension = MIME_TYPES[file.mimetype];
        // On définit l'extension du fichier via son MIME_TYPE
        callback(null, name + Date.now() + "." + extension);
        // On génère un nom de fichier le plus unique possible avec l'ajout 
        // d'un TIMESTAMP avec Date.now()
    }
});

module.exports = multer({storage: storage}).single("image");
// On exporte ce middleware en précisant qu'il s'agit d'un fichier unique
// de type IMAGE