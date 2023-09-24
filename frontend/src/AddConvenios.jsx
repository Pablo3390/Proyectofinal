/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'
export function AddConvenios(){
    const [nombre, setNombre] = useState('')
    const [utilidad, setUtilidad] = useState('')
    const [objeto, setObjeto] = useState('')
    const [fecha_inicio, setFechainicio] = useState('')
    const [fecha_fin, setFechafin] = useState('')
    const [clausula_peas, setClausulapeas] = useState('')
    const [id_organismo, setIdorganismo] = useState('')
    const [id_tipo_convenio, setIdtipoconvenio] = useState('')
    const [id_resolucion, setIdresolucion] = useState('')

    const guardarConvenio = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddConvenios({nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_organismo, id_tipo_convenio, id_resolucion})        
        console.log('La respues es ', respuesta)
        return;
        
        }
    
    return(
        <>
        Aqui va el form agregar
        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={guardarConvenio}>
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
                      value={utilidad}
                      onChange={(event)=>setUtilidad(event.target.value)}
                      className="form-control" 
                      placeholder="utilidad"/>
                      <label htmlFor="floatingInput">Utilidad</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={objeto}
                      onChange={(event)=>setObjeto(event.target.value)}
                      className="form-control" 
                      placeholder="objeto"/>
                      <label htmlFor="floatingInput">Objeto</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={fecha_inicio}
                      onChange={(event)=>setFechainicio(event.target.value)}
                      className="form-control" 
                      placeholder="fecha_inicio"/>
                      <label htmlFor="floatingInput">Fecha inicio</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={fecha_fin}
                      onChange={(event)=>setFechafin(event.target.value)}
                      className="form-control" 
                      placeholder="Fecha_fin"/>
                      <label htmlFor="floatingInput">Fecha fin</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={clausula_peas}
                      onChange={(event)=>setClausulapeas(event.target.value)}
                      className="form-control" 
                      placeholder="clausula_peas"/>
                      <label htmlFor="floatingInput">Clausula Peas</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="number" 
                      value={id_organismo}
                      onChange={(event)=>setIdorganismo(event.target.value)}
                      className="form-control" 
                      placeholder="id_organismo"/>
                      <label htmlFor="floatingInput">Id de organismo</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="number" 
                      value={id_tipo_convenio}
                      onChange={(event)=>setIdtipoconvenio(event.target.value)}
                      className="form-control" 
                      placeholder="id_tipo_convenio"/>
                      <label htmlFor="floatingInput">Id de tipo de convenio</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="number" 
                      value={id_resolucion}
                      onChange={(event)=>setIdresolucion(event.target.value)}
                      className="form-control" 
                      placeholder="id_resolucion"/>
                      <label htmlFor="floatingInput">Id de recolucion</label>
                    </div>

                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link to="/convenios" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}