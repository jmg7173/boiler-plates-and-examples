import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import MainView from './views/MainView'
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<MainView />} />
      </Routes>
    </Router>
  )
}

export default App
