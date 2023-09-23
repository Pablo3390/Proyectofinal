import { useState } from 'react'


import './App.css'

import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Principal } from './Principal'
import { Registro } from './Registro'
import { Convenios } from './Convenios'


function App() {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)

  return (
    <>
        
      
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Principal' element={<Principal/>}></Route>
        <Route path='/Registro' element={<Registro/>}></Route>
        <Route path='/Convenios' element={<Convenios/>}></Route>
        
      </Routes>

    </>
  )
}

export default App
