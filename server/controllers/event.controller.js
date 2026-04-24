const event = require("../models/Event.models.js")

exports.getAllEvenst = async(req, res)=>{
    try{

        const filters ={};
        if(req.query.category){
            filters.category = res.query.category;
        }
        if(req.query.TicketPrice){
            filters.TicketPrice = res.query.TicketPrice;
        }


        const events = await Event.find();
        res.json(events);

}
catch(error){
    res.status(500).json({error:error.messgae})
}
}


exports.getEventById = async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({error:'Event not found'})
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

exports.creteEvent = async (req, res)=>{
    const{tital,description,date,location,category,totalSeats,availableSeats,TicketPrice,imageUrl,createdBy}=req.body
    try{
        const event = await Event.create({
            tital,
            description,
            date,
            location,
            category,
            totalSeats,
            TicketPrice,
            imageUrl
        })
        res.status(201).json(event);
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
exports.updateEvent =async(req,res)=>{
    const{tital,description,date,location,category,totalSeats,availableSeats,TicketPrice,imageUrl,createdBy}=req.body

    try{
        const event = await Event.findByIdAndUpdate(req.params.id,{
            tital,
            description,
            date,
            location,
            category,
            totalSeats,
            TicketPrice,
            imageUrl
        },{new:true})
        if(!event){
            return res.status(404).json({error:'Event not found'})
        }
        res.json(event);
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.deleteEvent = async(req,res)=>{
    try{
        const event = await Event.findByIdAndDelete(req.prams.id);
        if(!event){
            return res.status(404).json({error:'Event not found'})
        }
        resjson({message:'event deleted successfully'})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
