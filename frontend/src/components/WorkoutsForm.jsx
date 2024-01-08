import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutsForm = () => {
    const [title,setTitle]=useState('');
    const [reps,setReps]=useState('');
    const [load,setLoad]=useState('');
    const [error,setError]=useState(null);
    const {dispatch}=useWorkoutsContext();
    const {user}=useAuthContext();

    const handleSubmit=async(event)=>{
        event.preventDefault();
        
        if(!user){
            setError("You must be logged in")
            return;
        }
        const workout={title,reps,load}

        const response=await fetch('/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
                  
            }
        })

        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            console.log("Error",error)
        }
        if(response.ok){
            setError(null)
            console.log("New Workout added",json)
            setTitle('');
            setLoad('');
            setReps('');
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }
    }
  return (
   <form  className="create" onSubmit={handleSubmit}>
    <h3>Add a New Workout</h3>
    <label htmlFor="title">Exercize Title:</label>
    <input 
    type="text"
    onChange={(event)=>{
        setTitle(event.target.value)
    }}
    value={title} 
    id='title'
    />
    <label htmlFor="load">Load (kg):</label>
    <input 
    type="number"
    onChange={(event)=>{
        setLoad(event.target.value)
    }}
    value={load} 
    id='load'
    />
    <label htmlFor="reps">Reps:</label>
    <input 
    type="number"
    onChange={(event)=>{
        setReps(event.target.value)
    }}
    value={reps} 
    id='reps'
    />
    <button type='submit'>Add Workout</button>
    {error && <div className='error'>{error}</div>}
   </form>
  )
}

export default WorkoutsForm
