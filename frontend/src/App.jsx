import { useState } from 'react'


import './App.css'
import { Menu } from './Menu'
import { Home } from './Home'


function App() {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)

  return (
    <>
        
      <Menu/>
      <Home/>

    </>
  )
}

export default App
