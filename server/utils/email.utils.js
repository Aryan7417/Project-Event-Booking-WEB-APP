const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config();

const transpoter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

const sendBookingEmail = async(userEmail,userName,evenTital)=>{
    try {
        const mailOptions ={
            from:process.env.EMAIL_USER,
            to:userEmail,
            subject:`Booking confimed :${evenTital}`,
            
        }-
        await transpoter.sendMail(mailOptions);
        console.log('Email send successfully to ',userEmail)
        
    } catch (error) {
        console.log('Error sending email:',error)
        
    }

}


exports.sendOTPEmail = async (email,otp,type)=>{
    try{

        const mailOptions ={
            from:process.env.EMAIL_USER,
            to:email,
            subject:'your OTP code',
            text:`Your OTP is :${otp}`
            
        }
        await transpoter.sendMail(mailOptions)
        console.log(`OTP email send to ${email} from ${type} `)
    }
    catch{
        console.log(`Error sending OTP to ${email} for ${type} :`,error);
        
        }
};