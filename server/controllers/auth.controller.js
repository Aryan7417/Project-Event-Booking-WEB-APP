const User= require('../models/User.model.js');
const { sendOTPEmail } = require('../utils/email.utils.js');
const OTP = require('../models/OTP.models.js')
const bcrypt = require('bcrypt')
const {sendOTPEmail} = require('../utils/email.utils.js')

exports.regiterUser= async(req,res)=>{
    const {name,email,password}= req.body;

    let userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({error:'user is already exist'})
    }

    const salt = await byrypt.genSalt(10);
    const hashahdpassword= await bcrypt.hash(password,salt)

    try{
        const user= new User.create({name,email,password:hashahdpassword,roler:'user', isverify:'false'});
        

        const otp = math.floor(100000+ Math.random()*900000).toString();
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




exports.loginUser = async (req,res)=>{
    const {email, password}= req.body;
    let user = await User.findOne({email})

    if(!user){
        return res.status(400).json({error:'Invalid crendial plase enter valid email'})
    }

    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({error:'invalid crendentials'})
    }

    if(!user.isverify){
        const otp = Math.floor(10000 +Math.random() * 900000).toString();
        const OTP.deleteMany({email,action:""})

        await OTP.create({email,otp,actions:'account_verification'})
        return res.status(400).json({
            error:'Acocunt not verified . A new OTP has been sent  to your email.'
        })

            }
    res.status(200).json({
        user:{
            id:user_id,
            name:user.name,
            email:user.email
        }
    })
}

