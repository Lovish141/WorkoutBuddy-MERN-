import { useState } from "react"
import { useSignUp } from "../hooks/useSignUp";

const SignUp = () => {
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const {signUp,isLoading,error}=useSignUp();

 const handleSubmit=async (e)=>{
    e.preventDefault();
    await signUp(email,password);


 }
 return (
    <>
   
     <form  className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <label htmlFor="email">Email:</label>
        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} id="email"/>
        <label htmlFor="password">Password:</label>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} id="password" />

        <button type="submit" disabled={isLoading}>Sign Up</button>
        {error && <div className="error">{error}</div>}

    </form>
    </>
   
 )

 
}

export default SignUp
