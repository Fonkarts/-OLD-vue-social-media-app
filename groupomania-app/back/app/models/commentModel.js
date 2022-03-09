module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        text: {
            type: Sequelize.STRING(500)
        },
        userId: {
            type: Sequelize.STRING
        },
        articleId: {
            type: Sequelize.INTEGER
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
    });
    return Comment;
};