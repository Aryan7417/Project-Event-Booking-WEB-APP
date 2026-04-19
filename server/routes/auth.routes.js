const express = require('express')
const router = express.Router()
const {regiterUser, loginUser, verifyOtp}= require('../controllers/auth.controller.js')


router.post('/register',regiterUser)
router.post('/login',loginUser);
router.post('/verifyOTP',verifyOtp)

module.exports =router;

