// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import viteLogo from '/vite.svg'
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'


export function Registro(){

    const[apellido, setApellido] = useState('')
    const[nombre, setNombre] = useState('')
    const[dni, setDni] = useState('')
    const[user, setUser] = useState('')
    const[pass, setPass] = useState('')
    const[correo, setCorreo] = useState('')
    // eslint-disable-next-line no-unused-vars
    const[id_rol, setIdrol] = useState('1')

    const registro = async(event)=>{
      event.preventDefault();      
      const registro = await API.Registro({apellido, nombre, dni, user, pass, correo, id_rol})
        console.log(registro)               
        if(registro.status){
          alert(registro.mensaje)   
          window.location.href='/login'  
        
         }else{
          alert(registro.mensaje)
         }
        return;      
      }

    return(
        <>
        <main className="form-signin w-100 m-auto">
             <form onSubmit={registro}>
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
                      id="apellido" 
                      placeholder="apellido"
                      />
                      <label htmlFor="apellido">Apellido</label>
                    </div>
                    <div className="form-floating">
                    <input 
                      type="text" 
                      value={nombre}
                      onChange={(event)=>setNombre(event.target.value)}
                      className="form-control" 
                      id="nombre"
                      placeholder="nombre"
                      />
                      <label htmlFor="apellido">Nombre</label>
                      </div>
                      <div className="form-floating">
                    <input 
                      type="number" 
                      value={dni}
                      onChange={(event)=>setDni(event.target.value)}
                      className="form-control" 
                      id="dni"
                      placeholder="dni"
                      />
                      <label htmlFor="dni">Dni</label>               
                    
                    </div>
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={user}
                      onChange={(event)=>setUser(event.target.value)}
                      className="form-control" 
                      id="user" 
                      placeholder="user"
                      />
                      <label htmlFor="user">Usuario</label>
                    </div>
                    <div className="form-floating">
                    <input 
                      type="password" 
                      value={pass}
                      onChange={(event)=>setPass(event.target.value)}
                      className="form-control" 
                      id="pass" 
                      placeholder="pass"
                      />
                      <label htmlFor="pass">Contraseña</label>
                    </div>

                    <div className="form-floating">
                      <input
                      type="text" 
                      value={correo}
                      onChange={(event)=>setCorreo(event.target.value)}
                      className="form-control" 
                      id="correo" 
                      placeholder="correo"
                      />
                      <label htmlFor="correo">Correo</label>
                    </div>                  
                    <button className="btn btn-primary" type="submit" >Registrarse</button>                  
                    <p className="mt-5 mb-3 text-body-secondary Letra_roja"> En el caso de tener cuenta <Link to="/login">Ingresar</Link></p>
                  </form>
              </main>
        </>
    )
}