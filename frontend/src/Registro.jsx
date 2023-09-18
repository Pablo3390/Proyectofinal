import React, { useState } from "react";
import viteLogo from '/vite.svg'
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'

export function Registro(){
    
    const [apellido, setApellido]= useState('')
    const [nombre, setNombre]= useState('')
    const [dni, setDni]= useState('')
    const [user, setUser]= useState('')
    const [pass, setPass]= useState('')
    const [correo, setCorreo]= useState('')
    const [id_rol, setIdRol]= useState('1')

    const registro = async(event)=>{
        event.preventDefault();
        const registro = await API.Registro({apellido, nombre, dni, user, pass, correo, id_rol})
        
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
        <main className="htmlForm-signin w-100 m-auto">
              <htmlForm onSubmit={registro}>
                  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" >
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                  </a>
                <h1 className="h3 mb-3 fw-normal">Por favor completar los datos</h1>
                
                <div className="htmlForm-floating">
                  <input 
                  type="text" 
                  value={apellido}
                  onChange={(event)=>setApellido(event.target.value)}
                  className="htmlForm-control" 
                  id="apellido" 
                  />
                  <label htmlFor="apellido">Apellido</label>
                </div>
                <div className="htmlForm-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="htmlForm-control" 
                  id="nombre" 
                  />
                  <label htmlFor="nombre">Nombre</label>
                </div>

                <div className="htmlForm-floating">
                  <input 
                  type="number" 
                  value={dni}
                  onChange={(event)=>setDni(event.target.value)}
                  className="htmlForm-control" 
                  id="dni" 
                  />
                  <label htmlFor="dni">DNI</label>
                </div>
                <div className="htmlForm-floating">
                <input 
                  type="email" 
                  value={correo}
                  onChange={(event)=>setCorreo(event.target.value)}
                  className="htmlForm-control" 
                  id="correo" 
                  />
                  <label htmlFor="correo">Correo</label>
                </div>
                <div className="htmlForm-floating">
                  <input 
                  type="text" 
                  value={user}
                  onChange={(event)=>setUser(event.target.value)}
                  className="htmlForm-control" 
                  id="user" 
                  />
                  <label htmlFor="usuario">Usuario</label>
                </div>
                <div className="htmlForm-floating">
                  <input 
                  type="password" 
                  value={pass}
                  onChange={(event)=>setPass(event.target.value)}
                  className="htmlForm-control" 
                  id="pass" 
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button className="btn btn-primary" type="submit" >Registrarme</button>
                <p className="mt-5 mb-3 text-body-secondary letra_roja"> En el caso de tener cuenta <Link to="/login">Ingresar</Link></p>
              </htmlForm>
          </main>
        </>
    )
}



// const URL ='http://localhost:1990';

// //esta es mi funcion para loguearme
// export async function Login(datos){
    
//     const Options={
//         method:'POST',
//         body: JSON.stringify(datos),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }
//     const respuesta = await fetch(`${URL}/login`, Options);
//     const data= await respuesta.json();
//     return data
// }