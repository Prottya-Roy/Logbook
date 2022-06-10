const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.headers.authorization;
  
    try{
        console.log(token);
        const decoded =  jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded);
        const userId = decoded.userId;
        console.log("decoded",userId);
        if(!userId){
            return res.status(401).json({message: 'You are not authorized to access !!!'});
        }
        req.userId = userId;
        req.userName = decoded.username;
    }catch(error){
        return res.status(401).json({message:'You are not authorized to access !!!'})
    }

    next();
}