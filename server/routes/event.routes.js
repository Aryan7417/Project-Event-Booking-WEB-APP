const express = require('express')
const router = express.Router();
const {protect , admin} =require('../middlewere/auth.middlewere.js')
const {getAllEvenst,getEventById,createEvent,updateEvent,deleteEvent}= require('../controllers/event.controller.js')

//get all event 

router.get('/',getAllEvenst);


//get event id
router.get('/:id',getEventById);

//crete new event (Admin Only)

router.post('/',protect,admin,createEvent)

//update Evnet (Admin only)
router.put('/:id',protect,admin,updateEvent)

//delete Event (Admin only)
router.delete('/:id',protect, admin,deleteEvent)

module.exports = router;

//noyhing