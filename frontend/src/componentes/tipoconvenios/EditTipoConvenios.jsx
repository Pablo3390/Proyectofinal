
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'



export function EditTipoconvenios(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [tipo_conveniocol, setTipoconveniocol] = useState('')
   

    const {id_tipo_convenio} = useParams()
    
    useEffect(()=>{
      traer_datos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const traer_datos = async(event)=>{
      const datos_tipoconvenios= await API.getTipoconveniosByID(id_tipo_convenio);
      setNombre(datos_tipoconvenios.nombre)
      setTipoconveniocol(datos_tipoconvenios.tipo_conveniocol)
      
    }


    const editarTipoconvenios = async(event)=>{
        event.preventDefault();
        const respuesta = await API.EditTipoconvenios({nombre,tipo_conveniocol}, id_tipo_convenio)

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
        <main className="form-signin w-100 m-auto">
             <form onSubmit={editarTipoconvenios}>
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
                  

                    <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                    <Link to="/tipoconvenios" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}