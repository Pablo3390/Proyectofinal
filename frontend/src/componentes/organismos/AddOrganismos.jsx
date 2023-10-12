
/* eslint-disable react/jsx-key */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function AddOrganismos(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [tipo_organismos, setTipoorganismos] = useState([])
    const [id_tipo_organismo, setIdtipoorganismo] = useState('')

    useEffect(()=>{
        API.getTipoorganismos().then(setTipoorganismos)
    }, [] )

    const guardarOrganismos = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddOrganismos({nombre, id_tipo_organismo})
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
             <form onSubmit={guardarOrganismos}>
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
                      
                      <select onChange={(event)=>setIdtipoorganismo(event.target.value)} className="form-control">
                      {tipo_organismos.map((o)=>(
                      
                        <option value={o.id_tipo_organismo}>{o.nombre}</option>

                        ))}
                      </select>
                    </div>
                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link to="/organismos" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}
