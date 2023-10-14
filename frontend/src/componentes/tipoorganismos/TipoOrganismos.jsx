/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import './TipoOrganismos.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import Swal from 'sweetalert2'

export function TipoOrganismos(){
    const [tipo_organismos, setTipoorganismos] = useState([])
    const [id_tipo_organismo, setIdTipoorganismos] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')

 
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }

    useEffect(()=>{
        API.getTipoorganismos().then(setTipoorganismos)}, [])

   
        const cambiar_estado = async (e, id_tipo_organismo, estado_actual)=>{
            e.preventDefault();
            const actualizar = (estado_actual=="A")?"B":"A";
            const mjs = (estado_actual=="A")?"dar de baja":"dar de alta";
            Swal.fire({
                title: '¿Está seguro?',
                text: "Usted esta a punto de "+mjs+" a un tipo de organismo",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((result) => {
                if (result.isConfirmed) {

                    API.ActualizarEstadoTipoOrganismos(id_tipo_organismo, {actualizar})
                    .then((respuesta) => {
                        if(respuesta.status){
                            setMensaje(respuesta.mensaje)
                            API.getTipoorganismos().then(setTipoorganismos)
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












        const guardaTipoorganismos = async(event)=>{
            event.preventDefault();
            if(id_tipo_organismo){
                const respuesta = await API.EditTipoorganismos({nombre}, id_tipo_organismo)
                    if (respuesta.status){
                        setMensaje(respuesta.mensaje)
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    toastBootstrap.show()
                         setTimeout(()=>{
                        setMensaje('')
                     window.location.href='/tipo_organismos'
                         }, 2000)
                            }
                         return;

             }else{
                const respuesta = await API.AddTipoorganismos({nombre})
                if (respuesta.status){
                    setMensaje(respuesta.mensaje)
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    toastBootstrap.show()
                    setTimeout(()=>{
                        setMensaje('')
                            window.location.href='/tipo_organismos'
                    }, 2000)
                }
                return;
            }
            
        }
            

        const editar_registro = async (e, id_tipo_organismo)=>{
            e.preventDefault();
            console.log('el id que vamos a editar es el ', id_tipo_organismo)
            setIdTipoorganismos(id_tipo_organismo)
            const datos_tipoorganismos= await API.getTipoorganismosByID(id_tipo_organismo);
            console.log(datos_tipoorganismos)
            setNombre(datos_tipoorganismos.nombre)
        }

        const limpiarModal = async ()=>{
       
            setNombre('')
            setIdTipoorganismos('')
        }



    return(
        <>
         <Menu/>
         <div className="table-responsive">
        <table className="table table-striped">
        <thead>
        <tr>
                <th colSpan="12" >
                    {/* <Link classNameName="Borde_negro" to="/agregartipoorganismos">Agregar Tipo Organismos</Link></td> */}
                    <button onClick={(event)=>limpiarModal('')}  className="btn btn-primary btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i className="bi bi-database-add"></i>Agregar Tipo Organismos</button>
             </th>
            </tr>

            <tr>
                <th >Nombre</th>
                <th >Estado</th>
                <th colSpan="2">Acciones</th>
                
            </tr>
            </thead>


            <tbody>
            {tipo_organismos.map((tipo_organismos)=>(
                <tr>
                <td >{tipo_organismos.nombre}</td>
                <td >{tipo_organismos.estado}</td>
                
               <td>
               {(tipo_organismos.estado=="A")?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, tipo_organismos.id_tipo_organismo)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button>
                : 
                <button disabled className="btn btn-warning btn-sm">Editar</button>}
                {/* <button data-bs-toggle="modal"  data-bs-target="#exampleModal"  onClick={(event)=>editar_registro(event, tipo_organismos.id_tipo_organismo)} className="btn btn-outline-warning btn-sm">Editar</button> */}

                </td> 

                {(tipo_organismos.estado=="A")?
                <td ><button className="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, tipo_organismos.id_tipo_organismo, tipo_organismos.estado)} ><i className="bi bi-hand-thumbs-down-fill"></i>Baja</button></td>
                :
                <td ><button className="btn btn-success btn-sm"   onClick={(event)=>cambiar_estado(event, tipo_organismos.id_tipo_organismo, tipo_organismos.estado)} ><i className="bi bi-hand-thumbs-up-fill"></i>Alta</button></td>
                
                 }





                {/* {(tipo_organismos.estado=="A")?
                <td ><button onClick={(event)=>cambiar_estado(event, tipo_organismos.id_tipo_organismo, tipo_organismos.estado)} className="Boton_rojo">Dar De Baja</button></td>
                :
                <td ><button onClick={(event)=>cambiar_estado(event, tipo_organismos.id_tipo_organismo, tipo_organismos.estado)} className="Boton_azul">Dar De Alta</button></td>
                
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
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Datos Tipo Organismo </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={guardaTipoorganismos}>
                <div className="modal-body">


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
                  

                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    </div>         
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