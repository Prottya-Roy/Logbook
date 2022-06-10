const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.header.authorization;
    console.log(token);

    try{
        const decoded =  jwt.verify(token, process.env.JWT_KEY);
        const userID = decoded.userID;
        console("Decoded",userID);

        if(!userID){
            return res.status(401).json({message: 'You are not authorized to access !!!'});
        }
        req.userID = userID;
        req.userName = decoded.userName;
    }catch(error){
        return res.status(401).json({message:'You are not authorized to access !!!'})
    }

    next();
}