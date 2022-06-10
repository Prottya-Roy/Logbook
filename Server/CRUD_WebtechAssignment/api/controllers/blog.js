const res = require('express/lib/response');
const Blog = require('../models/blog');


exports.addBlog = async (req, res) => {
    try {
        const blog = await Blog.create({
            title: req.body.title,
            uploader: req.userId,
            uploader_Name: req.userName,
            body: req.body.body,
            uploaded_On: new Date().getTime()
        });
        res.status(201).json({id: blog.id});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}

exports.getAllBlogs = async(req,res)=>{
    try{
        const blogs= await Blog.findAll({attributes:['id']});
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.getBlogsById = async(req,res)=>{
    const id = req.params.blog;
    try{
        const blog = await Blog.findByPk(id);

        if(blog){
            res.status(200).json(blog);
        }
        else{
            res.status(500).json({message: 'no stories were found'});
        }
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.EditBlog = async(req,res)=>{
    const id = req.params.blog;
    try{
        await Blog.update({
            title: req.body.title,
            body: req.body.body
        }, {where : {id}});
        res.status(200).json({message: 'Blog Edited and updated successfully !!!'});
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.getBlogsByUser = async(req,res)=>{
    const user = req.params.uploader;
    try{
        const blogs = await Blog.findAll({
            attributes:['id'],
            where: {user}
        });
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.deleteBlog = async (req,res)=>{
    const id = req.params.blog;
    try{
        await Blog.destroy({
            where: {id}
        });
        res.status(204).json({message:'Blog Deleted Successfully...'});
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
}