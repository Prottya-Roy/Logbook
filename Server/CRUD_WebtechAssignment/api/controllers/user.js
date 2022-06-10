const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.getAllUsers = async(req,res)=>{
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({msg:"Internal server error"});
    }
}

exports.registerUser = async(req,res)=>{

    console.log(`inside register`);
    try{
        if(invalidEmail(req.body.email)||  invalidUsername(req.body.username) || invalidPassword(req.body.password))
        {
            res.status(400).json({message: 'Invalid information'});
        }

        else{
            const hash = await bcrypt.hash(req.body.password,saltRounds);
            const user = await User.create({
                name : req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash
            });
            res.status(201).json({id : user.id});
        }

    }catch(err){
        if(err.parent.errno === 1062){
            res.status(409).json({
                message: "Username or email already in use"
            });
        }
        else{
            res.status(500).json({msg:"Internal server error"});        }
    }
}

exports.loginUser = async(req,res)=>{
    try{
        const user = await User.scope('withPassword').findOne({
            where : {username : req.body.username}
        });

        if(user){
            const flag = await bcrypt.compare(req.body.password, user.password);
            console.log(user);
            if(flag){
                const token = jwt.sign({
                    username: user.username,
                    userId : user.id
                }, process.env.JWT_KEY,{
                    expiresIn: '3h'
                });
                res.status(200).json({
                    message:'Login successfull...',
                    id: user.id,
                    token: token
                });
            }
            else{
                res.status(401).json({
                    message: 'Username or Password are not correct'
                });
            }
        }
        else res.status(401).json({
            message: 'Username or Password are not correct'
        });
    }catch(error){
        res.status(500).json({message:'Internal Server Error!!!'});
    }
}

exports.getuserById = async(req,res)=>{
    try{
        const user = await User.findByPk(req.params.userId);
        if(user){
            res.status(200).json(user);
        }
        else
        {
            res.status(404).json({message:'User not found...'});
        }
    }catch(error){
        res.status(500).json({message:'Internal Server Error!!!'});
    }
}


exports.updateUser = async (req, res) => {
    try{
        if(invalidEmail(req.body.email)) {
            res.status(400).json({msg:"Invalid email"});
        }
        else{
            await User.update({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username
            }, { where: {id: req.userId} });
            res.status(204).json({msg:"User info Updated successful !!!"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

exports.authUser = (req, res) => {
    res.status(200).json({
        message: 'You are authenticated',
        username: req.userName,
        id: req.userId
    });
}


exports.userNameAvailable = async (req, res) => {
    try{
        const user = await User.findOne({
            where: {username: req.body.username}
        });
        if(user){
            res.status(409).json({msg:"Username already exists"});
        }
        else{
            res.status(200).json({msg:"Username available"});
        }
    } catch(error){
        res.status(500).json({msg:"Internal server error"});
    }
}


const invalidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
}
const invalidUsername = (username) => {
    const re = /^[a-zA-Z0-9_]{6,25}$/;
    return !re.test(username);
}
const invalidPassword = (password) => {
    const re = /^[a-zA-Z0-9_]{6,25}$/;
    return !re.test(password);
}