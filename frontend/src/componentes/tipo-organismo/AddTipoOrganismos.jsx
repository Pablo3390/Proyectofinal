/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
export function AddTipoorganismos(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')


    const guardarTipoorganismo = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddTipoorganismos({nombre})
        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/tipoorganismos'
            }, 2000)
        }
        return;
        
 }
    
    return(
        <>
        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={guardarTipoorganismo}>
                <div>
                    {mensaje}
                </div>
             <h1 className="h3 mb-3 fw-normal">Por favor completar dato </h1>
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={nombre}
                      onChange={(event)=>setNombre(event.target.value)}
                      className="form-control" 
                      placeholder="nombre"/>
                      <label htmlFor="floatingInput">Nombre</label>
                    </div>
                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link to="/tipoorganismos" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}