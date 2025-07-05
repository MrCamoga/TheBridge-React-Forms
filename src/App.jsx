import {  } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Contact from './components/Contact.jsx'
import Reserve from './components/Reserve.jsx'
import Home from './components/Home.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/reserve' element={<Reserve/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
