/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import './TipoOrganismos.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";

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

        /*const cambiar_estado = async (e, id_convenio, estado_actual)=>{
            e.preventDefault();
            const actualizar = (estado_actual=="A")?"B":"A";
            console.log(actualizar)
            const respuesta= await API.ActualizarEstadoConvenios(id_convenio, {actualizar});
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/convenios'
                }, 1000)
            }

            
        }*/

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



    return(
        <>
         <Menu/>
      
        <table class="table table-striped">
        <thead>
        <tr>
                <th colSpan="12" >
                    {/* <Link className="Borde_negro" to="/agregartipoorganismos">Agregar Tipo Organismos</Link></td> */}
                    <button  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" >Agregar Tipo Organismos</button>
             </th>
            </tr>

            <tr>
                <td >Nombre</td>
                <td >Acciones</td>
                
            </tr>
            </thead>


            <tbody>
            {tipo_organismos.map((tipo_organismos)=>(
                <tr>
                <td >{tipo_organismos.nombre}</td>
                
               <td>
                {/* <Link to={`/editTipoorganismos/${tipo_organismos.id_tipo_organismo} `}><button className="Boton_verde">Editar</button></Link> */}
                <button data-bs-toggle="modal"  data-bs-target="#exampleModal"  onClick={(event)=>editar_registro(event, tipo_organismos.id_tipo_organismo)} class="btn btn-outline-warning btn-sm">Editar</button>
                </td> 
            
            </tr>
            ))}
            </tbody>
        </table>
         
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos Tipo Organismo </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={guardaTipoorganismos}>
                <div class="modal-body">


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

                  <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                
                <strong class="me-auto">Mensaje</strong>
                
                
                </div>
                <div class="toast-body">
                {mensaje}
                </div>
            </div>
        </div>
       
        </>
    )
}