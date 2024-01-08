const express=require('express');
const {createWorkout,getWorkouts,getSingleWorkout,deleteWorkout,updateWorkout}=require('../controllers/workoutControllers')
const requireAuth=require('../middleware/requireAuth')
const router=express.Router();
// requireAuth for all routes
router.use(requireAuth)
// get all workouts
router.get('/',getWorkouts)

// get a single workout

router.get("/:id",getSingleWorkout)

// post a new workout

router.post('/',createWorkout)

// Delete a workout

router.delete('/:id',deleteWorkout)

// update a workout

router.patch('/:id',updateWorkout)

module.exports=router