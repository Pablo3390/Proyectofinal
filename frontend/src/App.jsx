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
import { AddResolucion } from './componentes/resolucion/AddResolucion'
import { EditConvenios } from './componentes/convenios/EditConvenios'
import { EditOrganismos } from './componentes/organismos/EditOrganismos'
import { AddActividades } from './componentes/actividades/AddActividades'
import { EditActividades } from './componentes/actividades/EditActividades'
import { TipoOrganismos } from './componentes/tipoorganismos/TipoOrganismos'
import { AddTipoorganismos } from './componentes/tipoorganismos/AddTipoOrganismos'
import { EditTipoorganismos } from './componentes/tipoorganismos/EditTipoOrganismos'
import { TipoConvenios } from './componentes/tipoconvenios/TipoConvenios'
import { AddTipoconvenios } from './componentes/tipoconvenios/AddTipoConvenios'
import { EditTipoconvenios } from './componentes/tipoconvenios/EditTipoConvenios'
import { Responsable } from './componentes/responsable/Responsable'
import { AddResponsable } from './componentes/responsable/AddResponsable'
import { EditResponsable } from './componentes/responsable/EditResponsable'
import { Usuarios } from './componentes/usuarios/Usuarios'
import { EditResolucion } from './componentes/resolucion/EditResolucion'
import { Roles } from './componentes/roles/Roles'
import { EditContraseña } from './Editpass'






function App() {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
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
        <Route path='/agregarresolucion' element={<AddResolucion/>}></Route>
        <Route path='/editconvenios/:id_convenio' element={<EditConvenios/>}></Route>
        <Route path='/editorganismos/:id_organismo' element={<EditOrganismos/>}></Route>
        <Route path='/agregaractividades' element={<AddActividades/>}></Route>
        <Route path='/editactividades/:id_actividad' element={<EditActividades/>}></Route>
        <Route path='/Tipo_organismos' element={<TipoOrganismos/>}></Route>
        <Route path='/agregartipoorganismos' element={<AddTipoorganismos/>}></Route>
        <Route path='/edittipoorganismos/:id_tipo_organismo' element={<EditTipoorganismos/>}></Route>
        <Route path='/Tipo_convenios' element={<TipoConvenios/>}></Route>
        <Route path='/agregartipoconvenios' element={<AddTipoconvenios/>}></Route>
        <Route path='/edittipoconvenios/:id_tipo_convenio' element={<EditTipoconvenios/>}></Route>
        <Route path='/Responsable' element={<Responsable/>}></Route>
        <Route path='/agregarresponsable' element={<AddResponsable/>}></Route>
        <Route path='/editresponsable/:id_responsable' element={<EditResponsable/>}></Route>
        <Route path='/Usuarios' element={<Usuarios/>}></Route>
        <Route path='/editresolucion/:id_resolucion' element={<EditResolucion/>}></Route>
        <Route path='/roles' element={<Roles/>}></Route>
        <Route path='/editpass/:id_usuario' element={<EditContraseña/>}></Route>
      </Routes>
      </div>  
      
      

    </>
  )
}

export default App
