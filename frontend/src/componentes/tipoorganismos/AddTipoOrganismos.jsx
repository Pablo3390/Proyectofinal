// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function AddTipoorganismos(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')

   /* useEffect(()=>{
      API.getResolucion().then(setResolucion)
  }, [] )*/



    const guardarTipoorganismos = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddTipoorganismos({nombre})
        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/tiposorganismos'
            }, 2000)
        }
        return;
        
 }
    
    return(
        <>
        Aqui va el form agregar
        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={guardarTipoorganismos}>
                <div>
                    {mensaje}
                </div>
             <h1 className="h3 mb-3 fw-normal">Por favor completar los datos </h1>
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
                    <Link to="/tipo_organismos" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}