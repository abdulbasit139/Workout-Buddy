const express = require('express');
const router = express.Router();

// importing controller routes
const {
    postWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
    getWorkout
} = require('../Controllers/workoutController')

// GET all workouts
router.get('/', getWorkouts)

// GET single workout
router.get('/:id', getWorkout)

// POST workout
router.post('/', postWorkout)

// DELETE workout
router.delete('/:id', deleteWorkout)

// UPDATE workout
router.patch('/:id', updateWorkout)

module.exports = router