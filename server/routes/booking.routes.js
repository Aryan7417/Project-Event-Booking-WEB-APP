const express = require('express')
const {protect, admin} = require('../middlewere/auth.middlewere.js');
const { verifyOtp } = require('../controllers/auth.controller.js');
const router = express.Router();
const{bookEvent,sendBookingOTP,getMyBooking,conformBooking,cancelBooking} =require('../controllers/bookingController.js')

router.post('/',protect,bookEvent);
router.post('/send-otp', protect,sendBookingOTP)
router.get('/my',protect,getMyBooking);
router.put('/:id/conform',protect, admin ,conformBooking);
router.delete('/:id',protect,cancelBooking)



module.exports = router