/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import './Organismos.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import Swal from 'sweetalert2'


export function Organismos(){
    const [organismos, setOrganismos] = useState([])
    const [id_organismo, seIdOrganismos] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [tipo_organismos, setTipoorganismos] = useState([])
    const [id_tipo_organismo, setIdtipoorganismo] = useState('')

   
   
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
   
   
    useEffect(()=>{
        API.getTipoorganismos().then(setTipoorganismos)
        API.getOrganismos().then(setOrganismos)}, [])





        // const cambiar_estado = async (e, id_organismo, estado_actual)=>{
        //     e.preventDefault();
        //     const actualizar = (estado_actual=="A")?"B":"A";
        //     console.log(actualizar)
        //     const respuesta= await API.ActualizarEstadoOrganismos(id_organismo, {actualizar});
        //     if (respuesta.status){
        //         setMensaje(respuesta.mensaje)
        //         setTimeout(()=>{
        //             setMensaje('')
        //                 window.location.href='/organismos'
        //         }, 1000)
        //     }

            
        // }

        const cambiar_estado = async (e, id_organismo, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        const mjs = (estado_actual=="A")?"dar de baja":"dar de alta";
        Swal.fire({
            title: '¿Está seguro?',
            text: "Usted esta a punto de "+mjs+" a un organismo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {

                API.ActualizarEstadoOrganismos(id_organismo, {actualizar})
                    .then((respuesta) => {
                        if(respuesta.status){
                            setMensaje(respuesta.mensaje)
                            API.getOrganismos().then(setOrganismos)
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


        const guardaOrganismos = async(event)=>{
            event.preventDefault();
            if(id_organismo){
                const respuesta = await API.EditOrganismos({nombre, id_tipo_organismo}, id_organismo)
                    if (respuesta.status){
                    setMensaje(respuesta.mensaje)
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    toastBootstrap.show()
                    setTimeout(()=>{
                        setMensaje('')
                    window.location.href='/organismos'
            }, 2000)
        }
        return;


            }else{
                const respuesta = await API.AddOrganismos({nombre, id_tipo_organismo})
                if (respuesta.status){
                    setMensaje(respuesta.mensaje)
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    toastBootstrap.show()
                    setTimeout(()=>{
                        setMensaje('')
                            window.location.href='/organismos'
                    }, 2000)
                }
                return;

            }
            
      }


      const editar_registro = async (e, id_organismo)=>{
        e.preventDefault();
        console.log('el id que vamos a editar es el ', id_organismo)
        seIdOrganismos(id_organismo)
        const datos_organismos= await API.getOrganismosByID(id_organismo);
        setNombre(datos_organismos.nombre)
        setIdtipoorganismo(datos_organismos.id_tipo_organismo)
    
    }
    const limpiarModal = async ()=>{
       
        setNombre('')
        seIdOrganismos('')
        setIdActividades('')
        setIdtipoorganismo('')

    }





    return(
        <>
        <Menu/>

        <div className="table-responsive">
        <table className="table table-striped-columns">
        <thead>
        <tr>
                <th colSpan="5" >
                    {/* <Link className="Borde_negro" to="/agregarOrganismos">Agregar Organismo</Link> */}
                    <button onClick={(event)=>limpiarModal('')}  className="btn btn-primary btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i className="bi bi-database-add"></i>Agregar Organismos</button>
                    </th>
            </tr>
            <tr>
                <th >Nombre</th>
                <th >Tipo de organismo</th>
                <th >Estado</th>
                <th colSpan="2">Acciones</th>
            </tr>
            </thead>

            <tbody>
            {organismos.map((organismos)=>(
                // eslint-disable-next-line react/jsx-key
                <tr>
                <td >{organismos.nombre}</td>
                <td >{organismos.tipo_organismos}</td>
                <td >{organismos.estado}</td>

                <td >
                {(organismos.estado=="A")?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, organismos.id_organismo)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button>
                : 
                <button disabled className="btn btn-warning btn-sm">Editar</button>}
                    {/* <Link to={`/editOrganismos/${organismos.id_organismo} `}><button className="Boton_verde">Editar</button></Link> */}

                </td>

                {(organismos.estado=="A")?
                <td ><button className="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, organismos.id_organismo, organismos.estado)} ><i className="bi bi-hand-thumbs-down-fill"></i>Baja</button></td>
                :
                <td ><button className="btn btn-success btn-sm"   onClick={(event)=>cambiar_estado(event, organismos.id_organismo, organismos.estado)} ><i className="bi bi-hand-thumbs-up-fill"></i>Alta</button></td>
                
                 }




                {/* {(organismos.estado=="A")?
                <td ><button onClick={(event)=>cambiar_estado(event, organismos.id_organismo, organismos.estado)} className="Boton_rojo">Dar De Baja</button></td>
                :
                <td className="Borde_negro"><button onClick={(event)=>cambiar_estado(event, organismos.id_organismo, organismos.estado)} className="Boton_azul">Dar De Alta</button></td>
                
                 } */}
            
            </tr>
            ))}
            </tbody>
        </table>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Datos Organismos </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={guardaOrganismos}>
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
                      <option selected value="">Seleccione un tipo de organismo</option>
                      {tipo_organismos.map((o)=>(
                      
                        <option value={o.id_tipo_organismo}>{o.nombre}</option>

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
                
                
                </div>
                <div className="toast-body">
                {mensaje}
                </div>
            </div>
        </div>

        </>
    )

}