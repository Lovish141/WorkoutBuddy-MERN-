const Workout=require('../models/WorkoutModel')
const mongoose=require('mongoose')

// get all workouts
const getWorkouts=async(req,res)=>{
    const workouts=await Workout.find({user_id:req.user._id}).sort({createdAt:-1})
    res.status(200).json(workouts) 
}
// get a single workout

const getSingleWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No Such Workout"})
    }
    
    const singleWorkout=await Workout.findById(id)

    if(!singleWorkout){
       return res.status(400).json({error:"No such Workout"})
    }
    res.status(200).json(singleWorkout)
}
// create new workout
const createWorkout=async(req,res)=>{
    const {title,load,reps}=req.body;

    try{
        const user_id=req.user._id
        const workout=await Workout.create({
            title,
            load,
            reps,
            user_id
              
        })
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({err:err.message})
    }
}

// delete a workout
const deleteWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:"Can't delete undefined workout"})
    }
    

    const workout=await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return res.status(400).json({error:"No such Workout"})
     }

     res.status(200).json(workout)
}

// update a workout
const updateWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:"Can't update undefined workout"})
    }
    

    const workout=await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error:"No such Workout"})
     }

     res.status(200).json(workout)
}


module.exports={
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}
