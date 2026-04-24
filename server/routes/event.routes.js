const express = require('express')
const router = express.Router();
const {protect , admin} =require('../middlewere/auth.middlewere.js')
const {getAllEvent,getEventtById,creteEvent,updateEvent,deleteEvent}= require('../controllers/event.controller.js')

//get all event 

router.get('/',getAllEvent);


//get event id
router.get('/:id',getEventtById);

//crete new event (Admin Only)

router.post('/',protect,admin,creteEvent)

//update Evnet (Admin only)
router.put('/:id',protect,admin,updateEvent)

//delete Event (Admin only)
router.delete('/:id',protect, admin,deleteEvent)

module.exports = router;
//nothing

