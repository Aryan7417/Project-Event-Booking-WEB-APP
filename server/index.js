const express =require('express')
const cors = require('cors')
const dotenv= require('dotenv')
const mongoose= require('mongoose')
const authRouts = require('./routes/auth.router.js')


dotenv.config();

 const authRoutes = require('./routes/auth');
// const eventRoutes = require('./routes/events');
// const bookingRoutes = require('./routes/bookings');

const app = express()
app.use(express.json());


//Routes

 app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/bookings', bookingRoutes);



//connect top mongobd
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to mongodb")
})
.catch(()=>{
    console.log("Error connecting to MongoDb",error );
})


//const PORT = 5000

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
})

