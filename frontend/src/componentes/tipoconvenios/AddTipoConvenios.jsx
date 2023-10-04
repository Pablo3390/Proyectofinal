import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function AddTipoconvenios(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [tipo_conveniocol, setTipoconveniocol] = useState('')
 


    const guardarTipoconvenios = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddTipoconvenios({nombre, tipo_conveniocol})
        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/tipoconvenios'
            }, 2000)
        }
        return;
        
 }
    
    return(
        <>
        Aqui va el form agregar
        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={guardarTipoconvenios}>
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

                    <div className="form-floating">
                      <input
                      type="text" 
                      value={tipo_conveniocol}
                      onChange={(event)=>setTipoconveniocol(event.target.value)}
                      className="form-control" 
                      placeholder="tipo_conveniocol"/>
                      <label htmlFor="floatingInput">Tipo Convenio col</label>
                    </div>
                  

                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link to="/tipoconvenios" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}