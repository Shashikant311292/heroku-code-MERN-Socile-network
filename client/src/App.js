import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter ,Route, Routes, useNavigate} from "react-router-dom"
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import {Profile} from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Createpost from './components/screens/Createpost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducers/userReducer';
import { UserProfile } from './components/screens/UserProfile';
import {SubscribedUserPost} from './components/screens/SubscribedUseePost';
export const userContext = createContext()
const Routing = ()=>{
  const navigator = useNavigate();
  const {state, dispatch} = useContext(userContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user)
    {
      dispatch({type:"USER",payload:user})
    }
    else{
      navigator("/signin");
    }
  },[])
 return(
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route path="signin"  element={<Signin/>} />       
    <Route path="signup"  element={<Signup/>} />
    <Route exact path="profile" element={<Profile/>} />
    <Route path="createpost" element={<Createpost/>} />
    <Route path="profile/:userid" element={<UserProfile/>} />
    <Route path="myfollowerspost" element={<SubscribedUserPost/>} />
    </Routes>
 )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <userContext.Provider value={{state,dispatch}}> 
    <BrowserRouter>
        <Navbar />
        <Routing />
    </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
