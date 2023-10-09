/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function AddResponsable(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [id_organismo, setIdorganismo] = useState('')
    const [organismos, setOrganismos] = useState([])
   
    useEffect(()=>{
        API.getOrganismos().then(setOrganismos)
    }, [] )



    const guardarResponsable = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddResponsable({nombre, id_organismo})
        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/responsable'
            }, 2000)
        }
        return;
        
 }
    
    return(
        <>
        Aqui va el form agregar
        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={guardarResponsable}>
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
                      type="number" 
                      value={id_organismo}
                      onChange={(event)=>setIdorganismo(event.target.value)}
                      className="form-control" 
                      placeholder="id_organismo"/>
                      <label htmlFor="floatingInput">Id Organismo</label>
                    </div>


                  
                      {/* <select onChange={(event)=>setIdorganismo(event.target.value)} className="form-control">
                      <option selected value="">Seleccione un organismo</option>
                      {organismos.map((organismos)=>(
                      
                        <option value={organismos.id_organismo}>{organismos.nombre}</option>

                        ))}
                      </select> */}
                    

                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link to="/responsable" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}