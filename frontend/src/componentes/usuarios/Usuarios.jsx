/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Menu } from "../../menu";
import Swal from 'sweetalert2' 


export function Usuarios(){
    const [usuarios, setUsuarios]=useState([]);
    const [id_usuario, setIdUsuarios]=useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [permisoDenegado, setPermisoDenegado] = useState(false)
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
    const guardarUsuario = async(event)=>{
        event.preventDefault();
        if(id_usuario){
            const respuesta = await API.EditUsuario({nombre}, id_usuario)
    
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/usuarios'
                    // API.getUsuarios().then(setUsuarios)
                    }, 2500)
            }
            return;
        }else{
            const respuesta = await API.AddUsuario({nombre})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/usuarios'
                    // API.getUsuarios().then(setUsuarios)
                    }, 2500)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        ver_permisos(datos_usuario.id_rol);
        API.getUsuarios().then(setUsuarios);
    }, []);
    

    const cambiar_estado = async (e, id_usuario, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        const mjs = (estado_actual=="A")?"dar de baja":"dar de alta";
        Swal.fire({
            title: 'Esta seguro?',
            text: "Usted esta a punto de "+mjs+" a un usuario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, deja nomas',
            confirmButtonText: 'Si, ya te dije que si!'
          }).then((result) => {
            if (result.isConfirmed) {
                
                API.ActualizarEstadoUsuario(id_usuario, {actualizar})
                .then((respuesta) => {
                    if(respuesta.status){
                        setMensaje(respuesta.mensaje)
                        console.log('acrtualizar', actualizar)
                        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
                        console.log('user', datos_usuario.id_usuario)
                        console.log('usuario', id_usuario)
                        if(id_usuario==datos_usuario.id_usuario && actualizar=="B"){

                            localStorage.removeItem('usuario');
                            window.location.href='/';
                        }else{
                            API.getUsuarios().then(setUsuarios)
                            Swal.fire(
                                'Correcto!',
                                mensaje,
                                'success'
                              )   
                        }
                        
                    }
             
                })
            }
        })
        
        
    }

    const editar_registro = async (e, id_usuario)=>{
        e.preventDefault();
        
        setIdUsuarios(id_usuario)
        const datos_usuario= await API.getUsuariosByID(id_usuario);
        console.log(datos_usuario)
        setNombre(datos_usuario.nombre)
    }

    const resetPass = async (e, id_usuario)=>{
        e.preventDefault();
        console.log('mi id_usuario es -->',id_usuario)
        console.log(id_usuario)
        Swal.fire({
            title: 'Esta seguro?',
            text: "Usted esta a punto de blanquear el password de un usuario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No ',
            confirmButtonText: 'Si, estoy segguro!'
          }).then((result) => {
            if (result.isConfirmed) {
                console.log('mi id_usuario es-->',id_usuario)
                API.ResetUsuariosByID(id_usuario)
                .then((respuesta) => {
                    console.log(respuesta)
                    if(respuesta.status){
                        setMensaje(respuesta.mensaje)
                        API.getUsuarios().then(setUsuarios)
                        Swal.fire(
                            'Exito!',
                            mensaje,
                            'success'
                          )
                         
                    }
             
                })
            }
        })

        // eslint-disable-next-line no-unused-vars
        const datos_usuario= await API.ResetUsuariosByID(id_usuario);
    
    }
    const ver_permisos =  async (id_rol)=>{
        const menu='/usuarios';
        const respuesta= await API.ver_permisos({id_rol, menu });
        if(respuesta.status){
            setPermisoDenegado(true)
        }else{
            setPermisoDenegado(false)
        }
    }

    return(
        <>
        
        <Menu/>
        {
        !permisoDenegado? 
            <div className="alert alert-warning" role="alert">
            No tiene  permiso para acceder a esta opcion
            </div>
            :<>
        <table className="table table-striped">
        <thead>
            <tr>
                
                <th colSpan="6">
                
                <button  className="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i className="bi bi-database-add"></i>Agregar</button>
                &nbsp;
                
                <input  type="checkbox"/>Solo Activos
                </th>    
            </tr>

            <tr>
                <td>Nombre</td>
                <td>Apellido</td>
                <td>Dni</td>
                <td>Usuario</td>
                <td>Rol</td>
                <td>Correo</td>
                <td>Estado</td>
                <td colSpan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((usuario) => (
                <tr>
                <td >{usuario.nombre}</td> 
                <td >{usuario.apellido}</td> 
                <td >{usuario.dni}</td>   
                <td >{usuario.user}</td>
                <td >{usuario.rol}</td>
                <td >{usuario.correo}</td>
                <td >{usuario.estado}</td>
                <td >
                {(usuario.estado=="A")?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, usuario.id_usuario)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button>
                : 
                <button disabled className="btn btn-warning btn-sm">Editar</button>
                }
                {(usuario.estado=="A")?
                <button className="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, usuario.id_usuario, usuario.estado )} ><i className="bi bi-hand-thumbs-down-fill"></i>Desactivar</button>
                :
                <button className="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, usuario.id_usuario, usuario.estado )} ><i className="bi bi-hand-thumbs-up-fill"></i>Activar</button>
                
                }
                
                <button onClick={(event)=>resetPass(event, usuario.id_usuario)} className="btn btn-dark btn-sm"><i className="bi bi-arrow-clockwise"></i>Reset Password</button>
                
               
                </td>
                </tr>
            ))}
            </tbody>
            
           
        </table>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Datos del modelo </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarUsuario}>
                <div className="modal-body">
                
                    
                    <div className="form-floating">
                    <input required
                    type="text" 
                    value={nombre}
                    onChange={(event)=>setNombre(event.target.value)}
                    className="form-control" 
                    placeholder="Nombre del usuarios"
                    />
                    <label htmlFor="floatingInput">Nombre del usuario</label>
                    </div>
                </div>
                <div className="modal-footer">
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
        }
        
        </>
    )
}