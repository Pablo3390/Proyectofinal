/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Responsable.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";



export function Responsable(){
    const [responsable, setResponsable] = useState([])
    const [id_responsable, setIdresponsable] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [id_organismo, setIdorganismo] = useState('')
    const [organismos, setOrganismos] = useState([])



    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }


    useEffect(()=>{
        API.getOrganismos().then(setOrganismos)
        API.getResponsable().then(setResponsable)}, [])

    
    
        const guardaResponsable = async(event)=>{
            event.preventDefault();
            if(id_responsable){
                const respuesta = await API.EditResponsable({nombre,id_organismo}, id_responsable)
                     if (respuesta.status){
                        setMensaje(respuesta.mensaje)
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                        setTimeout(()=>{
                        setMensaje('')
                             window.location.href='/responsable'
                 }, 2000)
                      }
                    return;

     }else{

                const respuesta = await API.AddResponsable({nombre, id_organismo})
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/responsable'
                }, 2000)
            }
            return;

            }
            
            
     }


     const cambiar_estado = async (e, id_responsable, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        console.log(actualizar)
        const respuesta= await API.ActualizarEstadoResponsable(id_responsable, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
                API.getResponsable().then(setResponsable)
                //window.location.href='/responsable'
            }, 2500)
        }
        
    }



     const editar_registro = async (e, id_responsable)=>{
        e.preventDefault();
    
        console.log('el id que vamos a editar es el ', id_responsable)
        setIdresponsable(id_responsable)
        const datos_responsable= await API.getResponsableByID(id_responsable);
        setNombre(datos_responsable.nombre)
        setIdorganismo(datos_responsable.id_organismo)
    
    }
   


    return(
        <>
          <Menu/>
        
        <table class="table table-striped">
        <thead>
       <tr>
                 <th colSpan="12" >
                    {/* <Link className="Borde_negro" to="/agregarresponsable">Agregar Responsable</Link> */}
                    <button  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" >Agregar Responsable</button>
                </th>
            </tr> 

            <tr>
                <th >Nombre</th>
                <th >Organismo</th>
                <th >Estado</th>
                <th >Acciones</th>
                
            </tr>
            </thead>

            <tbody>
            {responsable.map((responsable)=>(
                <tr>
                <td >{responsable.nombre}</td>
                <td >{responsable.organismos}</td>
                <td >{responsable.estado}</td>
            
          <td >
            {/* <Link to={`/editresponsable/${responsable.id_responsable} `}><button className="Boton_verde">Editar</button></Link> */}
            <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, responsable.id_responsable)} class="btn btn-outline-warning btn-sm">Editar</button>
           

            {(responsable.estado=="A")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, responsable.id_responsable, responsable.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, responsable.id_responsable, responsable.estado )} >Activar</button>
                
                }
           
            </td>
              </tr>
            ))}
            </tbody>
       
       
        </table>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos del Responsable </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={guardaResponsable}>
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

                    {/* <div className="form-floating">
                      <input
                      type="number" 
                      value={id_organismo}
                      onChange={(event)=>setIdorganismo(event.target.value)}
                      className="form-control" 
                      placeholder="id_organismo"/>
                      <label htmlFor="floatingInput">Id Organismo</label>
                    </div> */}


                  
                       <select onChange={(event)=>setIdorganismo(event.target.value)} className="form-control">
                      <option selected value="">Seleccione un organismo</option>
                      {organismos.map((organismos)=>(
                      
                        <option value={organismos.id_organismo}>{organismos.nombre}</option>

                        ))}
                      </select> 
                    

                    <button className="btn btn-primary" type="submit" >Guardar</button>
                                    
                  </form>
                  </div>
            </div>
        </div>
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                
                <strong class="me-auto">Mensaje</strong>
                
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                {mensaje}
                </div>
            </div>
        </div>




        </>
    )
}