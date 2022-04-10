import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./features/login/Login"
import Messages  from "./features/messages/Messages"
import Users from "./features/users/Users"
import Signin from './features/signin/Signin'

//import { Counter } from './features/counter/Counter';

import "./css/customBS.min.css"

function App() {
  return (
    <Router>
      <Routes>
        < Route path="/" element={ <Login /> } />
        < Route path="Signin" element={ <Signin /> } />
        < Route path="Messages" element={ <Messages /> } />
        < Route path="Users" element={ <Users /> } />
      </Routes>
    </Router>
  );
}

export default App;
