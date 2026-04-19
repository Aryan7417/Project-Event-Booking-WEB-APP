const jwt = require('jsonwebtoken')
const User = require('../models/User.model.js')

//user authontication middlewere

const protect = async (req ,res, next)=>{
    let token = req.header.authorization && req.header.authorization.startWith('Bearer') ? req.header.authorization.split(' ')[1]: null
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password');
            if(! req.user){
                return res.status(401).json({ message:'Not authorized , user not found' })
            }
            next();
        }
        catch(error){
            return res.status(401).json({
                message:'Not authorized , token faild'
            })
        }
    }
    else{
        return res.status(401).json({message:'NOt authorized , no token'})
}
}



const admin = (req,res,next)=>{
    if(req.user && req.user.role === 'admin'){
        next()
    }
    else{
        return res.status(403).json({message:'forbidden , admin access required'})
    }
}

module.exports = {protect,admin}


