import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import SchedulePage from './pages/SchedulePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">📋 Task Manager</h1>
            <ul className="nav-menu">
              <li>
                <Link to="/" className="nav-link">TODO</Link>
              </li>
              <li>
                <Link to="/schedule" className="nav-link">Schedule</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
