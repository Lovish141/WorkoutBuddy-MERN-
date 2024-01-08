import React from 'react'
import { Link } from 'react-router-dom'
import { useLogOut } from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {
  const {logOut}=useLogOut();
  const {user}=useAuthContext();
  const handleLogoutClick=()=>{
    logOut();
  }
  return (
    <header>
        <div className="container">
            <Link to='/'>
                <h1>Workout Buddy</h1>
            </Link>
            <nav>
              {user && (<div>
                <span>{user.email}</span>
                <button onClick={handleLogoutClick}>Logout</button>
              </div>)}
              {!user &&
              (<div>
                <Link to={'/login'}>Login</Link>
                <Link to={'/signUp'}>Signup</Link>
              </div>)}
            </nav>
        </div>

    </header>
  )
}

export default NavBar
