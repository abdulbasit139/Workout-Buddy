const express = require('express');
const workoutsRouter = require('./Routes/workouts');
const userRoutes = require('./Routes/userRoutes')
const mongoose = require('mongoose');
require("dotenv").config();

// express app
const app = express();


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for request
        app.listen(process.env.PORT, () => {
            console.log("Connecting to Database and Listening to the port", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
});


app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


// Workout Routes
app.use('/api/workouts', workoutsRouter);

// user Routes
app.use('/api/user', userRoutes)

process.env