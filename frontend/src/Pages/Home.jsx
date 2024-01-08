import React, { useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutsForm from '../components/WorkoutsForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';



const Home = () => {
  const {workouts,dispatch}=useWorkoutsContext()
  const {user}=useAuthContext()
  useEffect(()=>{
   const fetchWorkouts=async()=>{
      const response=await fetch('/api/workouts',{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json=await response.json()

      if(response.ok){
        dispatch({type:"SET_WORKOUTS",payload:json})
      }
   }
   if(user){
    fetchWorkouts()
   }
  },[dispatch,user])
  
  // if(!user){
  //   return redirect('/login');
  // }
  return (
      <>
     
      <div className='pages'>
      <div className='home'>
      <div className="">
        {
          workouts && workouts.map((workout)=>(
           <WorkoutDetails key={workout._id} workout={workout}/>
          ))
        }
      </div>
      <WorkoutsForm/>
      </div>
      </div>
      </>

  )
}

export default Home
