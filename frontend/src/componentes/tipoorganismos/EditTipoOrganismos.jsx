/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function EditTipoorganismos(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
   
    const {id_tipo_organismo} = useParams()
    
    useEffect(()=>{
      traer_datos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // eslint-disable-next-line no-unused-vars
    const traer_datos = async(event)=>{
      const datos_tipoorganismos= await API.getTipoorganismosByID(id_tipo_organismo);
      setNombre(datos_tipoorganismos.nombre)
    
    }


    const editarTipoorganismos = async(event)=>{
        event.preventDefault();
        const respuesta = await API.EditTipoorganismos({nombre}, id_tipo_organismo)

        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/tipo_organismos'
            }, 2000)
        }
        return;
        
 }
    
    return(
        <>        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={editarTipoorganismos}>
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
                 

                    <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                    <Link to="/tipo_organismos" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}