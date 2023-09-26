const Workout = require('../Models/workoutModel')
const mongoose = require('mongoose')


// Get workouts

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })

    if (!workouts) {
        return res.status(404).json({mssg: "No workout foun"})
    }

    res.status(200).json(workouts)
}

// Get single Workout

const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid ID"})
    }
    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(400).json({mssg: "No such workout"})
    } 
    res.status(200).json(workout)
}

// Post new Workout

const postWorkout = async (req, res) => {

    const {title, reps, load } = req.body

    let emptyField = []

    if (!title) {
        emptyField.push('title')
    } 
    if (!reps) {
        emptyField.push('reps')
    }
    if (!load) {
        emptyField.push('load')
    }

    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: "Please fill out all the fields", emptyField})
    }   
} 

// Delete Workout

const deleteWorkout = async (req, res) => {

    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No Workout Found"});
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
        return res.status(400).json({mssg: "No Workout Found"});
    }
    res.status(200).json(workout);

}

// Update Workout

const updateWorkout = async (req, res) => {
    const { id } = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: "No Workout Found"})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!workout) {
        return res.status(400).json({error: "No Workout Found"})
    }

    res.status(200).json(workout)
}

module.exports = {
    postWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
    getWorkout
}

