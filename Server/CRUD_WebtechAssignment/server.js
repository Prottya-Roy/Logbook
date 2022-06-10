const http = require('http');
const app = require('./app');
const sequelize = require('./api/database/database');


const port = process.env.PORT || 1111;
const server = http.createServer(app);

const User = require('./api/models/user');
const Blog = require('./api/models/blog');


const startServer = async(server)=>{
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(port,()=>{
        console.log(`Server started on port ${port}`);
    });
};

startServer(server);