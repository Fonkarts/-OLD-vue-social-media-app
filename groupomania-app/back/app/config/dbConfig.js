module.exports = {
    // Définition des paramètres de la BDD
    HOST: "localhost",
    USER: "root",
    PASSWORD: "46Fta2J@k1nOs8",
    DB: "groupomaniadb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};