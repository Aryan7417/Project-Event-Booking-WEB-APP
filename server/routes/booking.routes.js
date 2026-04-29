const express = require('express')

const router = express.Router();


router.get('/',(req,res)=>{
    res.status(200).json({Message: "Booking router are available"})
})


module.exports = router