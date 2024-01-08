require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose')

const workoutRoutes=require('./routes/workouts')
const userRoutes=require('./routes/users')


// express app 
const app=express();
// middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)


// connect to db

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Connected to db and Listening at port 4000")
    })
})
.catch((error)=>{
    console.log(error)
})

