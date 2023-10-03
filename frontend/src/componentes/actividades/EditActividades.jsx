/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'



export function EditActividades(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')
    const [lugar, setLugar] = useState('')
    const [participante, setParticipante] = useState('')
    const [id_convenio, setIdconvenio] = useState('')


    const {id_actividad} = useParams()
    
    useEffect(()=>{
      traer_datos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const traer_datos = async(event)=>{
      const datos_actividades= await API.getActividadesByID(id_actividad);
      setNombre(datos_actividades.nombre)
      setFecha(datos_actividades.fecha)
      setLugar(datos_actividades.lugar)
      setParticipante(datos_actividades.participante)
      setIdconvenio(datos_actividades.id_convenio)
      
    }

 //funcion Onsubmit
    const editarActividades = async(event)=>{
        event.preventDefault();
        const respuesta = await API.EditActividades({nombre, fecha, lugar, participante, id_convenio}, id_actividad)

        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/actividades'
            }, 2000)
        }
        return;
        
 }
    
    return(
        <>        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={editarActividades}>
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
                      value={fecha}
                      onChange={(event)=>setFecha(event.target.value)}
                      className="form-control" 
                      placeholder="fecha"/>
                      <label htmlFor="floatingInput">Fecha</label>
                    </div>

                 
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={lugar}
                      onChange={(event)=>setLugar(event.target.value)}
                      className="form-control" 
                      placeholder="lugar"/>
                      <label htmlFor="floatingInput">Lugar</label>
                    </div>

                    <div className="form-floating">
                      <input
                      type="text" 
                      value={participante}
                      onChange={(event)=>setParticipante(event.target.value)}
                      className="form-control" 
                      placeholder="participante"/>
                      <label htmlFor="floatingInput">Participante</label>
                    </div>

                    <div className="form-floating">
                      <input
                      type="number" 
                      value={id_convenio}
                      onChange={(event)=>setIdconvenio(event.target.value)}
                      className="form-control" 
                      placeholder="id_convenio"/>
                      <label htmlFor="floatingInput">Id de Actividad</label>
                    </div>

                    <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                    <Link className="btn btn-primary" to="/actividades" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}