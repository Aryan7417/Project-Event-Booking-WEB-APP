const Booking = require('../models/Booking.models.js')
const OTP= require('../models/OTP.models.js')
const Event = require('../models/Event.models.js')
const {sendOTPEmail , sendBookingEmail} = require('../utils/email.utils.js')

const generateOtp=()=>{
    return Math.floor(100000 + Math.random() * 900000).toString()
}

exports.sendBookingOTP = async(req,res)=>{
    const otp = generateOtp();
    await OTP.findByIdAndDelete({email:req.user.email, action:'event_booking'});
    await OTP.create({email:req.user.email, otp:otp, action:'event_booking'})
    await sendOTPEmail(req.user.email,otp,'event_booking');
    res.json({message:'OTP sent to email'})
}

exports.bookEvent = async (req, res) => {
    const {eventID,otp}= req.body;

    const otpRecord = await OTP.findOne({email:req.user.email,otp,action:'event otp'})

    if(!otpRecord){
        return res.status(400).json({error:'Invalid or expired OTP'})
    }

    const event = await Event.findById(eventID);

    if(!event){
        return res.status(404).json({error:'Event not found'})
    }

    if(event.totalSeats <= 0){
        return res.status(400).json({error:'NO seat available'})
    }

    const existingBooking = await Booking.findOne({userId:req.user._id,eventId})
    if(existingBooking){
        return res.status(400).json({error:'you have alreeady bookked thi event'})
    }

    const booking = await Booking.create({
        userId:req.user_id,
        eventId,
        status:'pending',
        PaymentStaus:'non_paid',
        amount:event.TicketPrice,
    })

    await OTP.deleteMany({email:req.user.email,action:'evant_booking'})
    await sendBookingEmail(res.user.email,event.tital,booking._id);
    res.status(201).json({message:'booking created .Please check your email'})
}

exports.conformBooking = async(req,res)=>{
    const paymentStatus = req.body.paymentStatus;
    if(!['paid','non_paid'].includes(paymentStatus)) {
        return res.status(400).json({error:'Invalid payment status'})
    }

    const  booking = await Bokking.findById(req.params.id).popilate('eventId')
    if(!booking){
        return res.status(404).json({error:'Booking not found'})
    }

    if (booking.status ='confirmed'){
        return res.status(400).json({error:'Booking is already confirmed'})
    }

    const event = await Event.findById(booking.eventID._id);
    if(event.totalSeats <= 0){
        return res.status(400).json({error:'No seats availale'})
    }

    booking.status = 'confirmed';
    if(paymentStatus){
        booking.paymentStatus = paymentStatus;   
    }
    await booking.save()
    event.tatalSeats -=1;
    await event.save();
    await sendBookingEmail(req.user.email,event.tital,booking._id);

    res.json({message:'Booking confirmed'})
}


exports.getMyBooking =async(req,res)=>{
    const bookings = await Booking.find({userid:req.user._id}).popilate('eventId')
    res.json(booking)
}

exports.cancelBooking =async (req,res)=>{
    const booking = await Booking.findbyid(req.params.id).popilate('eventId')
    if(!booking){
        return res.status(404).json({error:'Booking not found'})
    }

    if(booking.userId.toString()!==req.user._Id.toString()){
        return res.status(403).json({erro:'Unathorized'})
    }

    booking.status= 'canclled';
    await booking.save();



    if(booking.status === 'confimed'){
        const event = await Event.findById(booking.eventId._id);
        event.totalSeats += 1;
        await event.save()
    }
    await booking.remove();
    res.json({message:'Booking cancelled'})
}

