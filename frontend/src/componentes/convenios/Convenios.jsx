/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Convenios.css';
import { Link } from "react-router-dom";


import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import Swal from 'sweetalert2'

export function Convenios(){
    const [convenios, setConvenios] = useState([])
    const [id_convenio, setIdconvenio] = useState('')
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

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }

    useEffect(()=>{
        API.getResolucion().then(setResolucion)
        API.getTipoconvenios().then(setTipoconvenio)
        API.getOrganismos().then(setOrganismos)
        API.getConvenios().then(setConvenios)}, [])


        const guardaConvenio = async(event)=>{
            event.preventDefault();
            if(id_convenio){

                const respuesta = await API.EditConvenios({nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_organismo, id_tipo_convenio, id_resolucion}, id_convenio)

        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/convenios'
            }, 2000)
        }
        return;


            }else{

                const respuesta = await API.AddConvenios({nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_organismo, id_tipo_convenio, id_resolucion})
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/convenios'
                }, 2000)
            }
            return;


            }
            
        
        
        }




        // const cambiar_estado = async (e, id_convenio, estado_actual)=>{
        //     e.preventDefault();
        //     const actualizar = (estado_actual=="A")?"B":"A";
        //     console.log(actualizar)
        //     const respuesta= await API.ActualizarEstadoConvenios(id_convenio, {actualizar});
        //     if (respuesta.status){
        //         setMensaje(respuesta.mensaje)
        //         const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        //         toastBootstrap.show()
        //         setTimeout(()=>{
        //             setMensaje('')
        //             toastBootstrap.hide()
        //                 window.location.href='/convenios'
        //         }, 1000)
        //     }

            
        // }

        const cambiar_estado = async (e, id_convenio, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        const mjs = (estado_actual=="A")?"dar de baja":"dar de alta";
        Swal.fire({
            title: '¿Está seguro?',
            text: "Usted esta a punto de "+mjs+" a un convenio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {

                API.ActualizarEstadoConvenios(id_convenio, {actualizar})
                .then((respuesta) => {
                    if(respuesta.status){
                        setMensaje(respuesta.mensaje)
                        API.getConvenios().then(setConvenios)
                            Swal.fire(
                                '¡Correcto!',
                                mensaje,
                                'success'
                              )   
                        
                        
                    }
             
                })
            }
        })
    
    
    }



        const editar_registro = async (e, id_convenio)=>{
            e.preventDefault();
        
            console.log('el id que vamos a editar es el ', id_convenio)
            setIdconvenio(id_convenio)
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

        const limpiarModal = async ()=>{
       
          setNombre('')
          setUtilidad('') 
          setObjeto('')
          setFechainicio('')
          setFechafin('')
          setClausulapeas('')

      }








    return(
        <>
        <Menu/>
       
        <table className="table table-striped">
        <thead>
        <tr>
                <th colSpan="12" >
                    {/* <Link className="Borde_negro" to="/agregarConvenios">Agregar Convenios</Link> */}
                    <button onClick={(event)=>limpiarModal('')} className="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i className="bi bi-database-add"></i>Agregar Convenio</button>
                </th>
            </tr>
            <tr>
                <th>Nombre</th>
                <th>Utilidad $</th>
                <th>Objeto</th>
                <th>Fecha de inicio</th>
                <th>Fecha de fin</th>
                <th>Clausula peas</th>
                <th>Organismo</th>
                <th>Tipo de convenio</th>
                <th>Resolucion</th>
                <th>Estado</th>
                <th>Acciones</th>
                
            </tr>
            </thead>

            <tbody>
            {convenios.map((convenios)=>(
                <tr>
                <td>{convenios.nombre}</td>
                <td >{convenios.utilidad}</td>
                <td>{convenios.objeto}</td>
                <td>{convenios.fecha_inicio}</td>
                <td >{convenios.fecha_fin}</td>
                <td >{convenios.clausula_peas}</td>
                <td >{convenios.organismos}</td>
                <td >{convenios.tipo_convenios}</td>
                <td >{convenios.resolucion}</td>
                <td >{convenios.estado}</td>

                {/* {(convenios.estado=="A")?
                <td >
                   
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, convenios.id_convenio)}  className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button>
                    : 
                     <button disabled className="btn btn-warning btn-sm">Editar</button>
                }</td>
                 */}
                 <td >
                {(convenios.estado=="A")?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, convenios.id_convenio)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button>
                : 
                <button disabled className="btn btn-warning btn-sm">Editar</button>}</td>

                
                {(convenios.estado=="A")?
                <td ><button className="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, convenios.id_convenio, convenios.estado)} >Baja</button></td>
                :
                <td ><button className="btn btn-success btn-sm"   onClick={(event)=>cambiar_estado(event, convenios.id_convenio, convenios.estado)} >Alta</button></td>
                
                 }
                
            </tr>
            ))}
            </tbody>
        </table>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Datos del Responsable </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={guardaConvenio}>
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
                                     
                  </form>

                  </div>
            </div>
        </div>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                
                <strong className="me-auto">Mensaje</strong>
                
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                {mensaje}
                </div>
            </div>
        </div>



        </>
    )
}