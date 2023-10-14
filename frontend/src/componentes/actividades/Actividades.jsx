/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Actividades.css';
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import Swal from 'sweetalert2' 


export function Actividades(){
    const [actividades, setActividades] = useState([])
    const [id_actividad, setIdActividades] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')
    const [lugar, setLugar] = useState('')
    const [participante, setParticipante] = useState('')
    const [id_convenio, setIdconvenio] = useState('')
    const [convenios, setConvenios] = useState([])
    const [permisoDenegado, setPermisoDenegado] = useState(false)

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
    }

    

        const guardarActividades = async(event)=>{
            event.preventDefault();
            if(id_actividad){ 
            const respuesta = await API.EditActividades({nombre, fecha, lugar, participante, id_convenio}, id_actividad)
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/actividades'
                }, 2000)
            }
            return;
        }else{
            const respuesta = await API.AddActividades({nombre, fecha, lugar, participante, id_convenio})
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/actividades'
                }, 2000)
            }
        return;

        }


     }

     useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        ver_permisos(datos_usuario.id_rol);
        API.getActividades().then(setActividades)
        API.getConvenios().then(setConvenios)}, [])
        

   /* CAMBIAR ESTADO DE ACTIVIDADES*/ 



   const cambiar_estado = async (e, id_actividad, estado_actual)=>{
    e.preventDefault();
    const actualizar = (estado_actual=="A")?"B":"A";
    const mjs = (estado_actual=="A")?"dar de baja":"dar de alta";
    Swal.fire({
        title: 'Esta seguro?',
        text: "Usted esta a punto de "+mjs+" a una actividad!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar!',
        confirmButtonText: 'Confirmar!'
      }).then((result) => {
        if (result.isConfirmed) {
            
            API.ActualizarEstadoActividades(id_actividad, {actualizar})
            .then((respuesta) => {
                if(respuesta.status){
                    setMensaje(respuesta.mensaje)
                    API.getActividades().then(setActividades)
                        Swal.fire(
                            'Correcto!',
                            mensaje,
                            'success'
                          )   
                    
                    
                }
         
            })
        }
    })
    
    
}


        const editar_registro = async (e, id_actividad)=>{
            e.preventDefault();

            console.log('el id que vamos a editar es el ', id_actividad)
            setIdActividades(id_actividad)
            const datos_actividades= await API.getActividadesByID(id_actividad);
            console.log(datos_actividades)
            setNombre(datos_actividades.nombre)
            setFecha(datos_actividades.fecha)
            setLugar(datos_actividades.lugar)
            setParticipante(datos_actividades.participante)
            setIdconvenio(datos_actividades.id_convenio)
        
        
        }

        const ver_permisos =  async (id_rol)=>{
            const menu='/actividades';
            const respuesta= await API.ver_permisos({id_rol, menu });
            if(respuesta.status){
                setPermisoDenegado(true)
            }else{
                setPermisoDenegado(false)
            }
        }

        const limpiarModal = async ()=>{
       
            setNombre('')
            setIdActividades('')
            setFecha('')
            setLugar('')
            setParticipante('')

        }

 

        
    return(
        <>
        <Menu/>
        <div className="table-responsive small">
        {
        !permisoDenegado? 
            <div className="alert alert-warning" role="alert">
            No tiene  permiso para acceder a esta opcion
            </div>
            :<>
    


        <table className="table table-striped">

        
           <thead>
           <tr>
                <th colSpan="12">
                    <button onClick={(event)=>limpiarModal('')} className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="bi bi-database-add"></i>Agregar Actividades</button>
                    {/* <button type="button" className="btn btn-primary" id="liveToastBtn">Show live toast</button> */}

                </th>
            </tr>
           <tr>
                    <th >Nombre</th>
                    <th >Fecha</th>
                    <th >Lugar</th>
                    <th >Participante</th>
                    <th >convenio</th>
                    <th >Estado</th>
                    <th colSpan="2">Acciones</th>
            </tr>

           </thead>
           <tbody>
            
            {actividades.map((actividades)=>(
                    <tr>
                    <td>{actividades.nombre}</td>
                    <td>{actividades.fecha}</td>
                    <td>{actividades.lugar}</td>
                    <td>{actividades.participante}</td>
                    <td>{actividades.convenio}</td>
                    <td>{actividades.estado}</td>
                    <td >
                {(actividades.estado=="A")?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, actividades.id_actividad)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button>
                : 
                <button disabled className="btn btn-warning btn-sm">Editar</button>}</td>

                    {(actividades.estado=="A")?
                    <td><button className="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, actividades.id_actividad, actividades.estado)}><i className="bi bi-hand-thumbs-down-fill"></i>Baja</button></td>
                    :
                    <td><button className="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, actividades.id_actividad, actividades.estado)}><i className="bi bi-hand-thumbs-up-fill"></i>Alta</button></td>
                    
                    }
                
                </tr>
            ))}
            </tbody>        

        </table>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Datos de la actividad</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={guardarActividades}>
                    <div className="modal-body">

                    
                <div>
                    {/* {mensaje} */}
                </div>
             <h1 className="h3 mb-3 fw-normal">Por favor completar los datos </h1>
                    <div className="form-floating">
                      <input
                      required
                      type="text" 
                      value={nombre}
                      onChange={(event)=>setNombre(event.target.value)}
                      className="form-control" 
                      placeholder="nombre"/>
                      <label htmlFor="floatingInput">Nombre</label>
                    </div>
                  
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={fecha}
                      onChange={(event)=>setFecha(event.target.value)}
                      className="form-control" 
                      placeholder="fecha"/>
                      <label htmlFor="floatingInput">Fecha</label>
                    </div>

                 
                    <div className="form-floating">
                      <input
                      type="text" 
                      value={lugar}
                      onChange={(event)=>setLugar(event.target.value)}
                      className="form-control" 
                      placeholder="lugar"/>
                      <label htmlFor="floatingInput">Lugar</label>
                    </div>

                    <div className="form-floating">
                      <input
                      required
                      type="number" 
                      value={participante}
                      onChange={(event) => {
                        setParticipante((event.target.value < 0)?event.target.value * -1:event.target.value);
                      }}
                      className="form-control" 
                      placeholder="participante"/>
                      <label htmlFor="floatingInput">Participante</label>
                    </div>
                    <div className="form-floating">
                        

                    <select required onChange={(event)=>setIdconvenio(event.target.value)} className="form-control">
                    
                    <option selected value="">Seleccione un convenio</option>
                      {convenios.map((a)=>(
                      
                      
                        <option value={a.id_convenio}>{a.nombre}</option>

                        ))}
                    </select>
                    </div>
                
                  


                       
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" type="submit">Guardar</button>
                        
                    </div>
                    </form>
                    </div>
                </div>
                </div>
                <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                    <strong className="me-auto">Mensaje</strong>
                    <small></small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                    {mensaje}
                    </div>
                </div>
                </div>
        </>
        }
        </div>
        </>
    )

} 