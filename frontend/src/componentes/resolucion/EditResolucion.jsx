/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'



export function EditResolucion(){
    const [mensaje, setMensaje] = useState('')
    const [numero, setNumero] = useState('')
    const [ano, setAno] = useState('')
   


    const {id_resolucion} = useParams()
    
    useEffect(()=>{
      traer_datos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // eslint-disable-next-line no-unused-vars
    const traer_datos = async(event)=>{
      const datos_resolucion= await API.getResolucionByID(id_resolucion);
      setNumero(datos_resolucion.numero)
      setAno(datos_resolucion.ano)
      
    }

 //funcion Onsubmit
    const editarResolucion = async(event)=>{
        event.preventDefault();
        const respuesta = await API.EditResolucion({numero, ano}, id_resolucion)

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
             <form onSubmit={editarResolucion}>
                <div>
                    {mensaje}
                </div>
             <h1 className="h3 mb-3 fw-normal">Por favor completar los datos </h1>
             <div className="form-floating">
                      <input
                      type="text" 
                      value={numero}
                      onChange={(event)=>setNumero(event.target.value)}
                      className="form-control" 
                      placeholder="numero"/>
                      <label htmlFor="floatingInput">Numero</label>
                    </div>
                  
                    <div className="form-floating">
                      <input
                      type="number" 
                      value={ano}
                      onChange={(event)=>setAno(event.target.value)}
                      className="form-control" 
                      placeholder="ano"/>
                      <label htmlFor="floatingInput">Año</label>
                    </div>

                    <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                    <Link className="btn btn-primary" to="/resolucion" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}