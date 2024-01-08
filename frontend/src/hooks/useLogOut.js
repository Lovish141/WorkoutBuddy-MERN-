import {useWorkoutsContext} from './useWorkoutsContext'
import { useAuthContext } from "./useAuthContext";

export const useLogOut=()=>{
   const {dispatch}=useAuthContext();
   const {dispatch:workoutsDispatch}=useWorkoutsContext(); 

    const logOut=()=>{
        // remove user from local storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({type:'LOGOUT'})
        workoutsDispatch({type:"SET_WORKOUTS",payload:null})

    }

    return {logOut};

}