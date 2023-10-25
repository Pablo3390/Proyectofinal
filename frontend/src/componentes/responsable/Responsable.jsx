/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Responsable.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import Swal from 'sweetalert2'



export function Responsable(){
    const [responsable, setResponsable] = useState([])
    const [id_responsable, setIdresponsable] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [id_organismo, setIdorganismo] = useState('')
    const [organismos, setOrganismos] = useState([])

    const [mensajeAlertaNombre, setMensajeAlertaNombre]= useState('')



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
                 }, 1000)
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


    //  const cambiar_estado = async (e, id_responsable, estado_actual)=>{
    //     e.preventDefault();
    //     const actualizar = (estado_actual=="A")?"B":"A";
    //     console.log(actualizar)
    //     const respuesta= await API.ActualizarEstadoResponsable(id_responsable, {actualizar});
    //     if(respuesta.status){
    //         setMensaje(respuesta.mensaje)
    //         const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    //         toastBootstrap.show()
    //         setTimeout(()=>{
    //             setMensaje('')
    //             toastBootstrap.hide()
    //             API.getResponsable().then(setResponsable)
    //             window.location.href='/responsable'
    //         }, 1000)
    //     }
        
    // }

    const cambiar_estado = async (e, id_responsable, estado_actual)=>{
     e.preventDefault();
     const actualizar = (estado_actual=="A")?"B":"A";
     const mjs = (estado_actual=="A")?"dar de baja":"dar de alta";
     Swal.fire({
         title: '¿Está seguro?',
         text: "Usted esta a punto de "+mjs+" a un responsable",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         cancelButtonText: 'Cancelar',
         confirmButtonText: 'Confirmar'
       }).then((result) => {
        if (result.isConfirmed) {

            API.ActualizarEstadoResponsable(id_responsable, {actualizar})
                .then((respuesta) => {
                    if(respuesta.status){
                        setMensaje(respuesta.mensaje)
                        API.getResponsable().then(setResponsable)
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


     const editar_registro = async (e, id_responsable)=>{
        e.preventDefault();
    
        console.log('el id que vamos a editar es el ', id_responsable)
        setIdresponsable(id_responsable)
        const datos_responsable= await API.getResponsableByID(id_responsable);
        setNombre(datos_responsable.nombre)
        setIdorganismo(datos_responsable.id_organismo)
    
    }
    const limpiarModal = async ()=>{
       
        setNombre('')
        setIdorganismo('')
    }
   
    const validarNombre = async(event)=>{
        // event.preventDefault();
        
        const validacion = await API.ValidarResponsable({nombre})
        console.log(validacion)
          if(validacion.status){
            setMensajeAlertaNombre(validacion.mensaje)
            setNombre('')
            setTimeout(()=>{
                setMensajeAlertaNombre('')
                setNombre('')
                
                }, 2000)
            
          }else{
            
            setNombre(nombre)
          }
       
  }

    return(
        <>
          <Menu/>
          <div className="table-responsive">
        <table className="table table-striped">
        <thead>
       <tr>
                 <th colSpan="12" >
                    {/* <Link classNameName="Borde_negro" to="/agregarresponsable">Agregar Responsable</Link> */}
                    <button onClick={(event)=>limpiarModal('')} className="btn btn-primary btn-sm"   data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i className="bi bi-database-add"></i>Agregar Responsable</button>
                </th>
            </tr> 

            <tr>
                <th >Nombre</th>
                <th >Organismo</th>
                <th >Estado</th>
                <th colSpan="2">Acciones</th>
                
            </tr>
            </thead>

            <tbody>
            {responsable.map((responsable)=>(
                <tr>
                <td >{responsable.nombre}</td>
                <td >{responsable.organismos}</td>
                <td >{responsable.estado}</td>
            
          <td >
            {/* <Link to={`/editresponsable/${responsable.id_responsable} `}><button classNameName="Boton_verde">Editar</button></Link> */}
            {/* <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, responsable.id_responsable)} className="btn btn-outline-warning btn-sm">Editar</button> */}
            {(responsable.estado=="A")?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, responsable.id_responsable)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button>
                : 
                <button disabled className="btn btn-warning btn-sm">Editar</button>}
          </td>

           

            {(responsable.estado=="A")?
               <td > <button className="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, responsable.id_responsable, responsable.estado )} ><i className="bi bi-hand-thumbs-down-fill"></i>Desactivar</button></td>
                :
                <td>  <button className="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, responsable.id_responsable, responsable.estado )} ><i className="bi bi-hand-thumbs-up-fill"></i>Activar</button></td>
                
                }
           
            
              </tr>
            ))}
            </tbody>
       
       
        </table>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Datos del Responsable </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={guardaResponsable}>
                <div>
                    {mensaje}
                </div>
             <h1 className="h3 mb-3 fw-normal">Por favor completar los datos </h1>
                    {/* <div className="form-floating">
                      <input
                      type="text" 
                      value={nombre}
                      onChange={(event)=>setNombre(event.target.value)}
                      className="form-control" 
                      placeholder="nombre"/>
                      <label htmlFor="floatingInput">Nombre</label>
                    </div> */}

                    <div className="mt-2 form-floating">
                  <input 
                  required
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  onBlur={(event)=>validarNombre(event.target.value)}
                  className="form-control" 
                  placeholder="nombre" 
                  />
                  {
                 nombre? 
                
                 <i className="bi bi-check-circle"></i>
                
                :<></>
                  }
                  <label htmlFor="responsable">Nombre</label>
                </div>

                {
                 mensajeAlertaNombre? 
                <div className="alert alert-danger" role="alert">
                 {mensajeAlertaNombre}
                </div>
                :<></>
                  }

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
                      {organismos.map((o)=>(
                      
                        <option selected={(o.id_organismo==id_organismo)?`selected`:``}  value={o.id_organismo}>{o.nombre}</option>

                        ))}
                      </select> 
                    

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