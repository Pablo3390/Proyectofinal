/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import miLogo from './componentes/logo/Logo.png'
import { Link } from "react-router-dom";
import './Login.css'
import * as API from './servicios/servicios'

export function Login(){
const[user,setUser] = useState('')
const[pass,setPass] = useState('')
const [mensaje, setMensaje]= useState('')
const [mitoken, setToken]= useState('')

const ingresar = async(event)=>{
event.preventDefault();
const usuario = await API.Login({user, pass})  
if(usuario.status){
  setToken(usuario.token)
  window.localStorage.setItem('usuario',JSON.stringify(usuario.datos[0]) )
  window.localStorage.setItem('token', JSON.stringify(usuario.token))
  window.location.href='/principal';
 }else{
  setMensaje(usuario.mensaje)
  setTimeout(()=>{
      setMensaje('')
      
      }, 2000)
 }
return;

}

    return(
        <>
          <main className="form-signin w-100 m-auto">
             <form onSubmit={ingresar}>
                <a>
                   <img src={miLogo} className="logo" alt="Mi Logo" />
                </a>
                    <h1 className="h2 mb-3 fw-normal">Ingrese sus datos </h1>

                    {
                 mensaje? 
                <div className="alert alert-warning" role="alert">
                 {mensaje}
                </div>
              :<></>
                  }

                    <div className="mt-2 form-floating">
                      <input
                      required
                      type="text" 
                      value={user}
                      onChange={(event)=>setUser(event.target.value)}
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="email@gmail.com"/>
                      <label htmlFor="floatingInput">Usuario</label>
                    </div>
                    <div className="mt-2 form-floating">
                      <input 
                      required
                      type="password" 
                      value={pass}
                      onChange={(event)=>setPass(event.target.value)}
                      className="form-control" 
                      id="floatingPass" 
                      placeholder="Pass"
                      />
                      <label htmlFor="floatingPass">Contraseña</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">Ingresar</button>                 
                    <p className="mt-5 mb-3 text-body-secondary"> Si no tiene cuenta <Link to="/registro">Registrarse</Link></p>
                    <p className="mt-5 mb-3 text-body-secondary">&copy; A.P 2023</p>
                  </form>
              </main>
        </>
    )
}