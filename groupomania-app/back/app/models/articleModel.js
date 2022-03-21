module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        },
        likes: { 
            type: Sequelize.INTEGER, 
            defaultValue: 0,
            allowNull: false
        },
        dislikes: {
            type: Sequelize.INTEGER, 
            defaultValue: 0,
            allowNull: false
        }
        // FAIRE TABLE INTERMEDIAIRE POUR LISTE UTILISATEURS LIKED ET DISLIKED !
    });
    return Article;
};