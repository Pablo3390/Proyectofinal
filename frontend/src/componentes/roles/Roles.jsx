import React, { useEffect, useState } from "react";
import './Roles.css';
import * as API from '../../servicios/servicios'
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";

export function Roles(){
    const [roles, setRoles] = useState([])
    const [id_rol, setIdRol] = useState('')
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
        API.getRoles().then(setRoles)}, [])

        const guardaRoles = async(event)=>{
            event.preventDefault();
            if(id_rol){
                const respuesta = await API.EditRoles({nombre}, id_rol)

                if (respuesta.status){
                    setMensaje(respuesta.mensaje)
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                        toastBootstrap.show()
                    setTimeout(()=>{
                        setMensaje('')
                            window.location.href='/roles'
                    }, 2000)
                }
                return;

            }else{
                const respuesta = await API.AddRoles({nombre})
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/roles'
                }, 2000)
            }
            return;

            }
            

        }



        const editar_registro = async (e, id_rol)=>{
            e.preventDefault();
            console.log('el id que vamos a editar es el ', id_rol)
            setIdRol(id_rol)
            const datos_roles= await API.getRolesByID(id_rol);
          setNombre(datos_roles.nombre)

        }

        const eliminar =(e, id_rol)=>{
            e.preventDefault();
            console.log('El id que vamos a eliminar es el ', id_rol)
            API.deleteRoles(id_rol);
            window.location.reload(true)

            
        }







        return(
            <>
             <Menu/>
           
    
            <table className="table table-striped">
            <thead>
            <tr>
                    <th colSpan="4" >
                    <button  className="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i className="bi bi-database-add"></i>Agregar Rol</button>
                        {/* <Link className="Borde_negro" to="/agregarResolucion">Agregar Resolucion</Link> */}
                    </th>
                </tr>
                <tr>
                    <th >Nombre</th>
                    <th >Estado</th>
                    <th colSpan="2" >Acciones</th>
                    {/* <td className="Letra_roja">#</td> */}
                </tr>
                </thead>
    
                <tbody>
                {roles.map((roles)=>(
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                    <td>{roles.nombre}</td>
                    <td>{roles.estado}</td>
                    <td>
                        {/* <button data-bs-toggle="modal"  data-bs-target="#exampleModal"  onClick={(event)=>editar_registro(event, roles.id_rol)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button> */}
                        <td >
                        <td>  <button data-bs-toggle="modal"  data-bs-target="#exampleModal"  onClick={(event)=>editar_registro(event, roles.id_rol)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button></td>
          </td>
                        {/* <button onClick={(event)=>eliminar(event, roles.id_rol)} className="btn btn-danger btn-sm">Eliminar</button> */}
                        
                        
                    </td>
                    
                </tr>
                ))}
                </tbody>
            </table>
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Datos del rol</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={guardaRoles}>
                
             <h1 className="h3 mb-3 fw-normal">Por favor completar datos </h1>
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