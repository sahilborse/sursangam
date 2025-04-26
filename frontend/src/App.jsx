import { useState } from 'react'

import './App.css'
import SurSagamLanding from './pages/SurSangam'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './pages/ProtectedRoute'
import Layout from './pages/Layout'
// import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import FluteLearning from './components/flute/FluteHome'
import Lessons from './components/Lessons'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import Progress from './components/Progress'
import Tabla from './components/tabla/TablaHome'
import AudioStream from './components/AudioStream'
import AudioMatcher from './components/AudioMatcher'
import SitarComponent from './components/sitar/SitarHome'

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<SurSagamLanding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path='/audioCheck' element={<AudioStream/>} />
            <Route path='/progress' element={<Progress />} />
            <Route path = '/tabla' element={<Tabla />} />
            <Route path='sitar' element={<SitarComponent />} />
            <Route path="/flute" element={<FluteLearning />} />
            <Route path="/practice/:instrument" element={<Lessons />} /> 
          </Route>
        </Route>
      </Routes>
      </Router>
    </>
  )
}

export default App
