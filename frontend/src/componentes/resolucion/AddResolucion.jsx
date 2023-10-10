/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
export function AddResolucion(){
    const [mensaje, setMensaje] = useState('')
    const [numero, setNumero] = useState('')
    const [ano, setAno] = useState('')


    const guardarResolucion = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddResolucion({numero, ano})
        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/resolucion'
            }, 2000)
        }
        return;
        
 }
    
    return(
        <>
        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={guardarResolucion}>
                <div>
                    {mensaje}
                </div>
             <h1 className="h3 mb-3 fw-normal">Por favor completar datos </h1>
                    <div className="form-floating">
                      <input
                      type="number" 
                      value={numero}
                      onChange={(event) => {
                        setNumero((event.target.value < 0)?event.target.value * -1:event.target.value);
                      }}
                      className="form-control" 
                      placeholder="nombre"/>
                      <label htmlFor="floatingInput">Numero</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="number" 
                      value={ano}
                      onChange={(event) => {
                        setAno((event.target.value < 0)?event.target.value * -1:event.target.value);
                      }}
                      className="form-control" 
                      placeholder="año"/>
                      <label htmlFor="floatingInput">Año</label>
                    </div>
                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link to="/resolucion" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}