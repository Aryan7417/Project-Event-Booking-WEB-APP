const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Event = require("./models/Event.models");

dotenv.config();

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// Dummy Event Data
const events = [

    {
        title: "Tech Fest 2026",
        description: "Biggest tech event",
        location: "Delhi",
        date: "2026-09-10",
        price: 499
    },

    {
        title: "Music Concert",
        description: "Live concert night",
        location: "Mumbai",
        date: "2026-10-05",
        price: 999
    },

    {
        title: "Coding Hackathon",
        description: "24 hour coding challenge",
        location: "Noida",
        date: "2026-11-15",
        price: 299
    }

];


// Insert Seed Data
const seedData = async () => {

    try {

        // Purana data delete
        await Event.deleteMany();

        // Naya data insert
        await Event.insertMany(events);

        console.log("Seed Data Inserted Successfully 🌱");

        process.exit();

    } catch (error) {

        console.log(error);
        process.exit(1);
    }
};

seedData();