import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/setavatar' Component={SetAvatar}/>
        <Route path='/' Component={Chat}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App