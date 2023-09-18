/* eslint-disable react/jsx-no-target-blank */

// eslint-disable-next-line no-unused-vars
import { useState } from 'react'

import './App.css'
import { Home } from './Home'
import { Menu } from './Menu'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Menu/>
    
    <Routes>
      <Route path='/' element={<Home/>}></Route>


    </Routes>

    </>
  )
}

export default App
