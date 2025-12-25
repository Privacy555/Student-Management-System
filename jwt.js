const jwt=require('jsonwebtoken');

require('dotenv').config();

const jwtAuthMiddleware=(req,res,next)=>{

    //first check request header has authorization or not
    const authHeader= req.headers.authorization

    if(!authHeader || !(authHeader.startsWith('Bearer '))){
        return res.status(401).json({error:"Token missing or incorrect format."});
    };

    //extract jwt token from req headers
    const token= req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({error:"Unauthorized."});
    }

    try{
        //verify that token
        const decoded=jwt.verify(token,process.env.JWT_SECRET, { expiresIn: "24h" });
        req.user=decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error:"Invalid token."});
    }
}



//function to generate jwt token
const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}


module.exports={jwtAuthMiddleware,generateToken};