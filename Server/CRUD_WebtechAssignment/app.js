const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./api/routes/user');
const blogRoutes = require('./api/routes/blog');
const req = require('express/lib/request');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const catchAsync = fn =>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch((error)=>{
        next(error);
    });
}

app.use('/user',catchAsync(userRoutes));
app.use('/blog',catchAsync(blogRoutes));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
    next();
});




module.exports = app;