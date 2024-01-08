import {
  BrowserRouter,Routes,Route,Navigate
} from "react-router-dom";


import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import NavBar from "./components/NavBar";




function App() {
  const {user}=useAuthContext();
  return (
 
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <div className="pages">
        <Routes>
          <Route
          path="/"
          element={user?<Home/>:<Navigate to={"/login"}/>}/>
          <Route
          path="/login"
          element={!user ?<Login/>:<Navigate to={'/'}/>}/>
          <Route
          path="/signup"
          element={!user ?<SignUp/>:<Navigate to={'/'}/>}/>

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
