import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function AddActividades(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')
    const [lugar, setLugar] = useState('')
    const [participante, setParticipante] = useState('')
    const [id_convenio, setIdconvenio] = useState('')

 
    const guardarActividades = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddActividades({nombre, fecha, lugar, participante, id_convenio})
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
        Aqui va el form agregar
        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={guardarActividades}>
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
                      <label htmlFor="floatingInput">Id de la Actividades</label>
                    </div>
                   

                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link to="/actividades" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}