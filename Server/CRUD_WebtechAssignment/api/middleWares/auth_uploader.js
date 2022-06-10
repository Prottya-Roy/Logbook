const Blog = require('../models/blog');

module.exports = (req,res,next)=>{
    const blogID = req.params.blog;
    const uploader = req.userId;
    Blog.findByPk(blogID).then(blog=>{
        if(blog.uploader !== author){
            return res.status(403).json({
                message : 'You are not Authorized to edit this blog'
            });
        }
        next();
    }).catch(err=>{
        res.status(500).json({
            error: 'Not the author of the blog'
        });
    });
}