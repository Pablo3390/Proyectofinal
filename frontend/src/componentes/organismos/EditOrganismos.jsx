/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function EditOrganismos(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [id_tipo_organismo, setIdTipoOrganismo] = useState('')

    const {id_organismo} = useParams()

    useEffect(()=>{
        traer_datos();
      },[])

      const traer_datos = async()=>{
        const datos_organismos= await API.getOrganismosByID(id_organismo);
        setNombre(datos_organismos.nombre)
        setIdTipoOrganismo(datos_organismos.id_tipo_organismo)
     }

     const editarOrganismo = async(event)=>{
        event.preventDefault();
        const respuesta = await API.EditOrganismos({nombre, id_tipo_organismo}, id_organismo)

        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/organismos'
            }, 2000)
        }
        return;
        
 }

 return(
    <>        
    <main className="form-signin w-100 m-auto">
         <form onSubmit={editarOrganismo}>
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
                  type="numero" 
                  value={id_tipo_organismo}
                  onChange={(event)=>setIdTipoOrganismo(event.target.value)}
                  className="form-control" 
                  placeholder="id_tipo_organismo"/>
                  <label htmlFor="floatingInput">Id Tipo Organismo</label>
                </div>

                <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                <Link to="/convenios" >Volver</Link>                  
              </form>
          </main>
    </>
)







    }