import React, { useState } from "react";
import viteLogo from '/vite.svg'
import { Link } from "react-router-dom";


export function Registro(){
    const[apellido, setApellido] = useState('')
    const[nombre, setNombre] = useState('')
    const[dni, setDni] = useState('')
    const[user, setUser] = useState('')
    const[pass, setPass] = useState('')
    const[correo, setCorreo] = useState('')
    const[id_rol, setIdrol] = useState('1')
    return(
        <>
        <main className="form-signin w-100 m-auto">
             <form>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                   <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                    <h1 className="h3 mb-3 fw-normal">Por favor completar los datos </h1>

                    <div className="form-floating">
                    <input 
                      type="text" 
                      value={apellido}
                      onChange={(event)=>setApellido(event.target.value)}
                      className="form-control" 
                      id="floatingPass" 
                      placeholder="Apellido"
                      />
                      <label htmlFor="floatingPass">Apellido</label>
                    </div>
                    <div className="form-floating">
                    <input 
                      type="text" 
                      value={nombre}
                      onChange={(event)=>setNombre(event.target.value)}
                      className="form-control" 
                      id="floatingPass" 
                      placeholder="Nombre"
                      />
                      <label htmlFor="floatingPass">Nombre</label>
                      </div>
                      <div className="form-floating">
                    <input 
                      type="number" 
                      value={dni}
                      onChange={(event)=>setDni(event.target.value)}
                      className="form-control" 
                      id="floatingPass" 
                      placeholder="Dni"
                      />
                      <label htmlFor="floatingPass">Dni</label>               
                    
                    </div>
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={user}
                      onChange={(event)=>setUser(event.target.value)}
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="email@gmail.com"/>
                      <label htmlFor="floatingInput">Usuario</label>
                    </div>
                    <div className="form-floating">
                    <input 
                      type="password" 
                      value={pass}
                      onChange={(event)=>setPass(event.target.value)}
                      className="form-control" 
                      id="floatingPass" 
                      placeholder="Pass"
                      />
                      <label htmlFor="floatingPass">Contraseña</label>
                    </div>

                    <div className="form-floating">
                      <input
                      type="text" 
                      value={correo}
                      onChange={(event)=>setCorreo(event.target.value)}
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="email@gmail.com"/>
                      <label htmlFor="floatingInput">Correo</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="number" 
                      value={id_rol}
                      onChange={(event)=>setIdrol(event.target.value)}
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="rol"/>
                      <label htmlFor="floatingInput">Rol</label>
                    </div>

                    <button className="btn btn-primary" type="submit" >Registrarse</button>                  
                    <p className="mt-5 mb-3 text-body-secondary Letra_roja"> En el caso de tener cuenta <Link to="/login">Ingresar</Link></p>
                  </form>
              </main>
        </>
    )
}