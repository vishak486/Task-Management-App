import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import TaskList from './pages/TaskList'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true} />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
