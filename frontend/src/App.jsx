import { useState } from 'react'


import './App.css'
import { Menu } from './Menu'
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'


function App() {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)

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
