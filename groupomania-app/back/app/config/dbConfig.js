module.exports = {
    // Définition des paramètres de la BDD
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "groupomaniadb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};