/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import viteLogo from '/vite.svg'
import { Link } from "react-router-dom";
import './Login.css'
export function Login(){
const[username,setUsername] = useState('')
const[password,setPassword] = useState('')
    return(
        <>
          <main className="form-signin w-100 m-auto">
             <form>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                              <img src={viteLogo} className="logo" alt="Vite logo" />
                              </a>
                    <h1 className="h3 mb-3 fw-normal">Por favor ingresar </h1>

                    <div className="form-floating">
                      <input type="email" 
                      value={username}
                      onChange={(event)=>setUsername(event.target.value)}
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="email@gmail.com"/>
                      <label htmlFor="floatingInput">Usuario</label>
                    </div>
                    <div className="form-floating">
                      <input type="password" 
                      value={password}
                      onChange={(event)=>setPassword(event.target.value)}
                      className="form-control" 
                      id="floatingPassword" 
                      placeholder="Password"/>
                      <label htmlFor="floatingPassword">Contraseña</label>
                    </div>

                    <Link to="../principal" className="btn btn-primary w-100 py-2" href="dashboard.html" type="button">Ingresar</Link>
                  
                    <p className="Letra_roja"> En el caso de no tener cuenta <a href="registro.html" type="button" className="btn btn-link">Registrarse</a></p>
                  </form>
              </main>
        </>
    )
}