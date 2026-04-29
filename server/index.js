const express =require('express')
const cors = require('cors')
const dotenv= require('dotenv')
const mongoose= require('mongoose')
const authRoutes = require('./routes/auth.routes.js');
const eventRoutes = require('./routes/event.routes.js');
const bookingRoutes = require('./routes/booking.routes.js');

//const PORT = process.env.PORT || 8000
dotenv.config();

const app = express()
app.use(express.json());

const PORT = 5000
//Routes

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);



//connect top mongobd
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to mongodb")

    app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
})

})
.catch((error)=>{
    console.log("Error connecting to MongoDb",error );
})


//const PORT = 5000


// app.listen(PORT,()=>{
//     console.log(`server is running ${PORT}`);
// })





