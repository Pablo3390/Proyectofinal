/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'
export function EditConvenios(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [utilidad, setUtilidad] = useState('')
    const [objeto, setObjeto] = useState('')
    const [fecha_inicio, setFechainicio] = useState('')
    const [fecha_fin, setFechafin] = useState('')
    const [clausula_peas, setClausulapeas] = useState('')
    const [id_organismo, setIdorganismo] = useState('')
    const [id_tipo_convenio, setIdtipoconvenio] = useState('')
    const [id_resolucion, setIdresolucion] = useState('')

    const {id_convenio} = useParams()
    
    useEffect(()=>{
      traer_datos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const traer_datos = async(event)=>{
      const datos_convenios= await API.getConveniosByID(id_convenio);
      setNombre(datos_convenios.nombre)
      setUtilidad(datos_convenios.utilidad)
      setObjeto(datos_convenios.objeto)
      setFechainicio(datos_convenios.fecha_inicio)
      setFechafin(datos_convenios.fecha_fin)
      setFechafin(datos_convenios.fecha_fin)
      setClausulapeas(datos_convenios.clausula_peas)
      setIdorganismo(datos_convenios.id_organismo)
      setIdtipoconvenio(datos_convenios.id_tipo_convenio)
      setIdresolucion(datos_convenios.id_resolucion)
      


    }


    const editarConvenio = async(event)=>{
        event.preventDefault();
        const respuesta = await API.EditConvenios({nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_organismo, id_tipo_convenio, id_resolucion}, id_convenio)

        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/convenios'
            }, 2000)
        }
        return;
        
 }
    
    return(
        <>        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={editarConvenio}>
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

                    <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                    <Link to="/convenios" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}