
import React from 'react';
import './App.css'
import Login from './Components/Login'
import Registration from './Components/Registration'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home';

function App() {
  return (
    <Router>
            <div>
             <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Registration/>}></Route>
                <Route path='/' element={<Home/>}></Route>
             </Routes>
            </div>
    </Router>)
}

export default App
