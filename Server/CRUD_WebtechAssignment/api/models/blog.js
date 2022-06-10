const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Blog = sequelize.define('blog',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey : true
    },
    title: {
        type: Sequelize.STRING,
        allowNull :false
    },
    uploaded_On: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    edited_on:{
        type: Sequelize.BIGINT,
        allowNull:true
    },
    uploader: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'users',
            key: 'id'
        }
    },
    uploader_Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
    
});

module.exports= Blog;