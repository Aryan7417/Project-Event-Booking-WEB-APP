const User= require('../models/User.model.js');
const { sendOTPEmail } = require('../utils/email.utils.js');
const OTP = require('../models/OTP.models.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const {sendOTPEmail} = require('../utils/email.utils.js')

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
//-----------------------------register user----------------------------------------------

exports.regiterUser= async(req,res)=>{
    const {name,email,password}= req.body;

    let userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({error:'user is already exist'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashahdpassword= await bcrypt.hash(password,salt)

    try{
        const user= await User.create({name,email,password:hashahdpassword,roler:'user', isverify:false});
        

        const otp = Math.floor(100000+ Math.random()*900000).toString();
        console.log(`OTP for${email}: ${otp}`);
        
        await OTP.create({email,otp,action:'account_verification'})
        await sendOTPEmail(email,otp,'account_verification');

        res.status(201).json({
            message:'user registered successfully. please check your email for OTP verifyed',
            email:user.email
        })

        
  
        }
     catch(error){
        res.status(400).json({error:error.message})
     }
};


//-----------------------------login user--------------------------------------


exports.loginUser = async (req,res)=>{
    const {email, password}= req.body;
    let user = await User.findOne({email})

    if(!user){
        return res.status(400).json({error:'Invalid crendienaial plase enter valid email'})
    }

    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({error:'invalid crendentials'})
    }

    if(!user.isverify && user.role === 'user'){
        const otp = Math.floor(10000 +Math.random() * 900000).toString();
        await OTP.deleteMany({email,action:"account_verification"})

        await OTP.create({email,otp,actions:'account_verification'})
        await sendOTPEmail(email,otp,'account_verifiaction')
        return res.status(400).json({
            error:'Acocunt not verified . A new OTP has been sent  to your email.'
        })

        res.json({
            message:'logion successful',
            _id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:genertaeToken(user._id,user.role)

        })



            }
    
}

// VERIFY OTP


exports.verifyOtp=async (req, res) =>{
    const {email,otp} = req.body;
    const otpRecord = await OTP.findOne({email,otp,action:"accunt_vberifaication"});
    if(!otpRecord){
        return res.status(400).json({error:'Invalid or expire OTP'})
    }

    const user = await User.findOneAndUpdate({email},{isverify:true});
    await OTP.deleteMany({email,action:'account_verification'})
    res.josn({message:'account verifieed successfuly . You can now log in',
        _id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:genertaeToken(user._id,user.role)
    })
}

