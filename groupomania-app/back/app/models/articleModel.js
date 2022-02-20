module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING(500)
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.STRING
        },
        likes: { 
            type: Sequelize.INTEGER, default: 0
        },
        dislikes: {
            type: Sequelize.INTEGER, default: 0
        }
        // FAIRE TABLE INTERMEDIAIRE POUR LISTE UTILISATEURS LIKED ET DISLIKED !
    });
    return Article;
};