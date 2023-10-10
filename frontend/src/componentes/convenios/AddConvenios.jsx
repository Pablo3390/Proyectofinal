/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
export function AddConvenios(){
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [utilidad, setUtilidad] = useState('')
    const [objeto, setObjeto] = useState('')
    const [fecha_inicio, setFechainicio] = useState('')
    const [fecha_fin, setFechafin] = useState('')
    const [clausula_peas, setClausulapeas] = useState('')
    const [id_organismo, setIdorganismo] = useState('')
    const [organismos, setOrganismos] = useState([])
    const [id_tipo_convenio, setIdtipoconvenio] = useState('')
    const [tipo_convenio, setTipoconvenio] = useState([])
    const [id_resolucion, setIdresolucion] = useState('')
    const [resolucion, setResolucion] = useState([])

    useEffect(()=>{
      API.getResolucion().then(setResolucion)
      API.getTipoconvenios().then(setTipoconvenio)
      API.getOrganismos().then(setOrganismos)
}, [] )

    const guardarConvenio = async(event)=>{
        event.preventDefault();
        const respuesta = await API.AddConvenios({nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_organismo, id_tipo_convenio, id_resolucion})
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
             <form onSubmit={guardarConvenio}>
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
                      onChange={(event) => {
                        setUtilidad((event.target.value < 0)?event.target.value * -1:event.target.value);
                      }}
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
                      
                      <select onChange={(event)=>setIdorganismo(event.target.value)} className="form-control">
                      <option selected value="">Seleccione un organismo</option>
                      {organismos.map((o)=>(
                      
                        <option value={o.id_organismo}>{o.nombre}</option>

                        ))}
                      </select>
                    </div>

                    <div className="form-floating">
                      
                      <select onChange={(event)=>setIdtipoconvenio(event.target.value)} className="form-control">
                      <option selected value="">Seleccione un tipo de convenio</option>
                      {tipo_convenio.map((t)=>(
                      
                        <option value={t.id_tipo_convenio}>{t.nombre}</option>

                        ))}
                      </select>
                    </div>

                    <div className="form-floating">
                      
                      <select onChange={(event)=>setIdresolucion(event.target.value)} className="form-control">
                      <option selected value="">Seleccione una resolucion</option>
                      {resolucion.map((r)=>(
                      
                        <option value={r.id_resolucion}>{r.numero}</option>

                        ))}
                      </select>
                    </div>

                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link to="/convenios" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}