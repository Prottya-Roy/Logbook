const Sequelize = require('sequelize');

const sequelize = new Sequelize('Crud_Blog','root','11805011',{
    dialect:'mysql'
});

module.exports = sequelize;