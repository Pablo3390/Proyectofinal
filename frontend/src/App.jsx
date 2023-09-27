import { useState } from 'react'


import './App.css'

import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Principal } from './Principal'
import { Registro } from './Registro'

import { Convenios } from './componentes/convenios/Convenios'
import { Actividades } from './componentes/actividades/Actividades'
import { Organismos } from './componentes/organismos/Organismos'
import { Resolucion } from './componentes/resolucion/Resolucion'
import { AddConvenios } from './componentes/convenios/AddConvenios'
import { AddOrganismos } from './componentes/organismos//AddOrganismos'
import { Tipoorganismos } from './componentes/tipo-organismo/TipoOrganismos'
import { AddTipoorganismos } from './componentes/tipo-organismo/AddTipoOrganismos'
import { AddResolucion } from './componentes/resolucion/AddResolucion'




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
        <Route path='/Actividades' element={<Actividades/>}></Route>
        <Route path='/Organismos' element={<Organismos/>}></Route>
        <Route path='/Resolucion' element={<Resolucion/>}></Route>
        <Route path='/agregarconvenios' element={<AddConvenios/>}></Route>
        <Route path='/agregarorganismos' element={<AddOrganismos/>}></Route>
        <Route path='/tipoorganismos' element={<Tipoorganismos/>}></Route>
        <Route path='/agregartipoorganismos' element={<AddTipoorganismos/>}></Route>
        <Route path='/agregarresolucion' element={<AddResolucion/>}></Route>
        
      </Routes>

    </>
  )
}

export default App
