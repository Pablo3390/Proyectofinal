/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'



export function EditResponsable(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [id_organismo, setIdorganismo] = useState('')
   


    const {id_responsable} = useParams()
    
    useEffect(()=>{
      traer_datos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // eslint-disable-next-line no-unused-vars
    const traer_datos = async(event)=>{
      const datos_responsable= await API.getResponsableByID(id_responsable);
      setNombre(datos_responsable.nombre)
      setIdorganismo(datos_responsable.id_organismo)
      
    }

 //funcion Onsubmit
    const editarResponsable = async(event)=>{
        event.preventDefault();
        const respuesta = await API.EditResponsable({nombre,id_organismo}, id_responsable)

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
        <main className="form-signin w-100 m-auto">
             <form onSubmit={editarResponsable}>
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

                    <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                    <Link className="btn btn-primary" to="/responsable" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}