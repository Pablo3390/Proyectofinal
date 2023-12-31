/* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars

import React, { useState } from "react";
import miLogo from './Logo.png'
import './Registro.css'
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'

export function Registro(){
    
    const [apellido, setApellido]= useState('')
    const [nombre, setNombre]= useState('')
    const [dni, setDni]= useState('')
    const [user, setUser]= useState('')
    const [pass, setPass]= useState('')
    const [nick, setNick]= useState('')
    const [pass2, setPassDos]= useState('')
    const [mensajeAlerta, setMensajeAlerta]= useState('')
    const [mensajeAlertaNick, setMensajeAlertaNick]= useState('')
    const [correo, setCorreo]= useState('')
    // eslint-disable-next-line no-unused-vars
    const [id_rol, setIdRol]= useState('1')

    const [mensajeAlertaNombre, setMensajeAlertaNombre]= useState('')



    const registro = async(event)=>{
      event.preventDefault();
      if(pass == pass2){
        const registro = await API.Registro({apellido, user, nombre, dni, pass, correo, id_rol})
        if(registro.status){
           alert(registro.mensaje)
           window.location.href='/login'
        }else{
          alert(registro.mensaje)
         
        }
       return;
      }else{
        setMensajeAlerta('Las contraseñas deben ser iguales.')
        setTimeout(()=>{
          setMensajeAlerta('')
          setPassDos('')
            
            }, 2000)
      }
    }

    // eslint-disable-next-line no-unused-vars
    const validarNick = async(event)=>{
          // event.preventDefault();
          
          const validacion = await API.ValidarNick({user})
          console.log(validacion)
            if(validacion.status){
              setMensajeAlertaNick(validacion.mensaje)
              setNick('')
              setTimeout(()=>{
                setMensajeAlertaNick('')
                  setUser('')
                  
                  }, 2000)
              
            }else{
              
              setNick('ok')
            }
         
    }


    const validarDni = async(event)=>{
      // event.preventDefault();
      
      const validacion = await API.ValidarDni({dni})
      console.log(validacion)
        if(validacion.status){
          setMensajeAlertaNombre(validacion.mensaje)
          setDni('')
          setTimeout(()=>{
              setMensajeAlertaNombre('')
              setDni('')
              
              }, 2000)
          
        }else{
          
          setDni(dni)
        }
     
}

    return(
        <>
        <main className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
              <form onSubmit={registro}>
                  <a>
                    <img src={miLogo} className="logo" alt="Mi Logo" />
                  </a>
                <h1 className="h3 mb-3 fw-normal">Complete los datos</h1>
                
                <div className="mt-2 form-floating">
                  <input 
                  type="text" 
                  value={apellido}
                  onChange={(event)=>setApellido(event.target.value)}
                  className="form-control" 
                  placeholder="apellido" 
                  />
                  <label htmlFor="apellido">Apellido</label>
                </div>
                <div className="mt-2 form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="nombre"
                  />
                  <label htmlFor="nombre">Nombre</label>
                </div>

                {/* <div className="mt-2 form-floating">
                  <input 
                  required
                  type="text" id="dni" name="dni" pattern="[0-9]{8}" title="El DNI debe contener 8 dígitos numéricos" 
                  value={dni}
                  onChange={(event) => {
                    setDni((event.target.value < 0)?event.target.value * -1:event.target.value);
                  }}
                  className="form-control" 
                  placeholder="documento"
                  />
                  <label htmlFor="dni">DNI</label>
                </div> */}

                <div className="mt-2 form-floating">
                  <input 
                  required
                  type="text" id="dni" name="dni" pattern="[0-9]{8}" title="El DNI debe contener 8 dígitos numericos"  
                  value={dni}
                  onChange={(event) => {
                    setDni((event.target.value < 0)?event.target.value * -1:event.target.value);
                  }}
                  onBlur={(event)=>validarDni(event.target.value)}
                  className="form-control" 
                  placeholder="nombre"
                  />
                  {
                 nombre? 
                
                 <i className="bi bi-check-circle"></i>
                
                :<></>
                  }
                  <label htmlFor="actividades">DNI:</label>
                </div>

                {
                 mensajeAlertaNombre? 
                <div className="alert alert-danger" role="alert">
                 {mensajeAlertaNombre}
                </div>
                :<></>
                  }


                <div className="mt-2 form-floating">
                <input 
                  type="email" 
                  value={correo}
                  onChange={(event)=>setCorreo(event.target.value)}
                  className="form-control" 
                  placeholder="documento" 
                  />
                  <label htmlFor="correo">Correo</label>
                </div>
                
                <div className="mt-2 form-floating">
                  <input 
                  required
                  type="text" 
                  value={user}
                  onChange={(event)=>setUser(event.target.value)}
                  onBlur={(event)=>validarNick(event.target.value)}
                  className="form-control" 
                  placeholder="documento" 
                  />
                  {
                 nick? 
                
                 <i className="bi bi-check-circle"></i>
                
                :<></>
                  }
                  <label htmlFor="usuario">Usuario</label>
                </div>
                {
                 mensajeAlertaNick? 
                <div className="alert alert-danger" role="alert">
                 {mensajeAlertaNick}
                </div>
                :<></>
                  }
                <div className="mt-2 form-floating">
                  <input 
                  required
                  type="password" 
                  value={pass}
                  onChange={(event)=>setPass(event.target.value)}
                  className="form-control" 
                  placeholder="documento" 
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                {
                 mensajeAlerta? 
                <div className="alert alert-danger" role="alert">
                 {mensajeAlerta}
                </div>
              :<></>
                  }
                <div className="mt-2 form-floating">
                  <input 
                  required
                  type="password" 
                  value={pass2}
                  onChange={(event) => {
                    setPassDos((event.target.value < 0)?event.target.value * -1:event.target.value);
                  }}
                  className="form-control" 
                  placeholder="documento"
                  />
                  <label htmlFor="password">Repita Contraseña</label>
                </div>
                <button className="mt-3 btn btn-success" type="submit" >Registrarme</button>
                <p className="mt-3 mb-3 text-body-secondary"> Ya tengo cuenta <Link to="/login">Ingresar</Link></p>
              </form>
          </main>
        </>
    )
}