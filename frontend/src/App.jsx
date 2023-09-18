
import { useState } from 'react'

import './App.css'
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Principal } from './Principal'
import { Registro } from './Registro'

function App() {

  return (
    <>    
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/principal' element={<Principal/>}></Route>
      <Route path='/registro' element={<Registro/>}></Route>


    </Routes>

    </>
  )
}

export default App
