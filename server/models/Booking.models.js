const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required: true,
    },
    status:{
        type:String,
        enum:['panding','confired','cancelled'],
        default:'pending'
    },
    paymentStatus:{
        type: String,
        enum:['non_paid' , 'paid'],
        default:'non_paid'
    },
    amount:{
        type:Number,
        required:true
    }
},{timeseries:true})

module.exports=mongoose.module('Booking',bookingSchema)