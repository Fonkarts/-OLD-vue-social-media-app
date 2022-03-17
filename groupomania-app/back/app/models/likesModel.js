module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define("likes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        articleId: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.STRING
        },
        userLikes: { 
            type: Sequelize.INTEGER, 
            defaultValue: 0,
            allowNull: false
        },
        userDislikes: { 
            type: Sequelize.INTEGER, 
            defaultValue: 0,
            allowNull: false
        }
    });
    return Likes;
};