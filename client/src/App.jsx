import { useState, useEffect } from 'react'
import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import { FaUserPlus } from "react-icons/fa6";
import { FaHome, FaSignOutAlt  } from "react-icons/fa";

import CharSheet from './CharSheet/CharSheet'
import MyChars from './MyChars/MyChars';
import NewChar from './NewChar/NewChar';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';
import './App.css'


const client = axios.create({
  baseURL: "http://localhost:3000" 
});

function App() {
  const [userID, setUserID] = useState("")
  const [loginIssue, setLoginIssue] = useState("")
  const [sound, setSound] = useState(true)

  useEffect(() => {
    const cookieID = Cookies.get('userID');
    if (cookieID) setUserID(cookieID.slice(3, -1))
  }, [])

  const login = (username, password) => {
    client.post(`login`, {username, password} , {withCredentials: true}).then((response) => {
      if (response.data == 'Wrong connection details' || response.data == 'User Already exists') setLoginIssue(response.data)
      else setUserID(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const signup = (username, password) => {
    client.post(`signup`, {username, password} , {withCredentials: true}).then((response) => {
      if (response.data == 'Wrong connection details') setLoginIssue(response.data)
      else setUserID(response.data)
    })
  }

  const logout = () => {
    client.post(`logout`, {}, {withCredentials: true}).then(() => {
      setUserID("")
    })
  }

  const toggleSound = () => {
    setSound(sound => ! sound)
  }

  return (
    <>
    <BrowserRouter>
      { userID.length ? <NavBar logout={logout} toggleSound={toggleSound} sound={sound} />: ""}
        <Routes>
          <Route path="/" element={userID.length ? 
            <MyChars userID={userID} client={client}/> : 
            <Login login={login} signup={signup} client={client} loginIssue={loginIssue} />
          }/>
          <Route path="/NewCharacter" element={<NewChar userID={userID} client={client}/>} />
          <Route path="/CharacterSheet" element={<CharSheet client={client} sound={sound}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App