/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import Swal from 'sweetalert2' 

 
export function Usuarios(){
    const [usuarios, setUsuarios]=useState([]);
    const [id_usuario, setIdUsuarios]=useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [user, setUser] = useState('')
    const [apellido, setApellido] = useState('')
    const [correo, setCorreo] = useState('')
    const [roles, setRoles] = useState([])
    const [id_rol, setIdRol] = useState('')
    const [permisoDenegado, setPermisoDenegado] = useState(false)
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    const [mensajeAlertaNombre, setMensajeAlertaNombre]= useState('')


    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }


    const guardarUsuario = async(event)=>{
        event.preventDefault();
        if(id_usuario){
            const respuesta = await API.EditUsuario({nombre, apellido, user, correo, id_rol}, id_usuario)
    
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
            const respuesta = await API.AddUsuario({nombre, apellido, correo, id_rol})
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
        API.getRoles().then(setRoles);
    }, []);
    
    const eliminar = (e, id_usuario) => {
        e.preventDefault();

        Swal.fire({
            title: '¿Está seguro que desea eliminar este usuario?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '¡Confirmar!',
            cancelButtonText: '¡Cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                API.EliminarUsuario(id_usuario);
                API.getUsuarios().then(setUser);
                Swal.fire(
                    '¡Eliminado!',
                    'El Usuario ha sido eliminado.',
                    'Exito',
                    window.location.href='/usuarios'
                );
            }
        });
    };


    const editar_registro = async (e, id_usuario)=>{
        e.preventDefault();
        
        setIdUsuarios(id_usuario)
        const datos_usuario= await API.getUsuariosByID(id_usuario);
        console.log(datos_usuario)
        setNombre(datos_usuario.nombre)
        setApellido(datos_usuario.apellido)
        setCorreo(datos_usuario.correo)
        setUser(datos_usuario.user)
        setIdRol(datos_usuario.id_rol)

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

    const validarNombre = async(event)=>{
        // event.preventDefault();
        
        const validacion = await API.ValidarUsuario({user})
        console.log(validacion)
          if(validacion.status){
            setMensajeAlertaNombre(validacion.mensaje)
            setUser('')
            setTimeout(()=>{
                setMensajeAlertaNombre('')
                setUser('')
                
                }, 2000)
            
          }else{
            
            setUser(user)
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
            <div className="table-responsive">
        <table className="table table-striped">
        <thead>
            <tr>
                
                <th colSpan="8">
                
                {/* <button className="btn btn-primary btn-sm"   data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i className="bi bi-database-add"></i>Agregar</button> */}
                &nbsp;
                
                {/* <input  type="checkbox"/>Solo Activos */}
                </th>    
            </tr>

            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                {/* <th>Dni</th> */}
                <th>Usuario</th>
                <th>Rol</th>
                <th>Correo</th>
                <th>Estado</th>
                <th colSpan="3">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((usuario) => (
                <tr>
                <td >{usuario.nombre}</td> 
                <td >{usuario.apellido}</td> 
                {/* <td >{usuario.dni}</td>    */}
                <td >{usuario.user}</td>
                <td >{usuario.rol}</td>
                <td >{usuario.correo}</td>
                <td >{usuario.estado}</td>
                <td >
                {(usuario.estado=="A")?
                <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, usuario.id_usuario)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button>
                : 
                <button disabled className="btn btn-warning btn-sm">Editar</button>
                } </td>

                <td><button className="btn btn-danger btn-sm" onClick={(e) => eliminar(e, usuario.id_usuario)}>Eliminar</button></td>
                {/* <td >
                {(usuario.estado=="A")?
                <button className="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, usuario.id_usuario, usuario.estado )} ><i className="bi bi-hand-thumbs-down-fill"></i>Desactivar</button>
                :
                <button className="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, usuario.id_usuario, usuario.estado )} ><i className="bi bi-hand-thumbs-up-fill"></i>Activar</button>
                
                }</td> */}
                <td >
                <button onClick={(event)=>resetPass(event, usuario.id_usuario)} className="btn btn-dark btn-sm"><i className="bi bi-arrow-clockwise"></i>Reset Password </button>
                </td>
                
                </tr>
            ))}
            </tbody>
            
           
        </table>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Datos del usuario </h1>
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
                    // placeholder="Nombre del usuarios"
                    id="Nombre" 
                    />
                    <label htmlFor="floatingInput">Nombre</label>
                    </div>

                    <div className="form-floating">
                    <input required
                    type="text" 
                    value={apellido}
                    onChange={(event)=>setApellido(event.target.value)}
                    className="form-control" 
                    // placeholder="apellido del usuario"
                    id="Apellido" 
                    />
                    <label htmlFor="floatingInput">apellido</label>
                    </div>

                    {/* <div className="form-floating">
                    <input required
                    type="text" 
                    value={roles}
                    onChange={(event)=>setRoles(event.target.value)}
                    className="form-control" 
                    
                    id="Rol" 
                    />
                    <label htmlFor="floatingInput">rol</label>
                    </div>  */}
{/* 
                    <div className="mt-2 form-floating">
                    <input 
                    type="text" 
                    value={user}
                    onChange={(event)=>setUser(event.target.value)}
                    className="form-control" 
                    id="Nombre_Usuario" 
                    />
                    <label htmlFor="floatingInput">Usuario</label>
                    </div> */}
                    
                    <div className="mt-2 form-floating">
                  <input 
                  required
                  type="text" 
                  value={user}
                  onChange={(event)=>setUser(event.target.value)}
                  onBlur={(event)=>validarNombre(event.target.value)}
                  className="form-control" 
                  id="nombre" 
                  />
                  {
                 user? 
                
                 <i className="bi bi-check-circle"></i>
                
                :<></>
                  }
                  <label htmlFor="tipo_convenio">Usuario</label>
                </div>

                {
                 mensajeAlertaNombre? 
                <div className="alert alert-danger" role="alert">
                 {mensajeAlertaNombre}
                </div>
                :<></>
                  }


                    <div className="mt-2 form-floating">
                    <input 
                    type="email" 
                    value={correo}
                    onChange={(event)=>setCorreo(event.target.value)}
                    className="form-control" 
                    id="correo" 
                    />
                    <label htmlFor="correo">Correo</label>
                    </div>

                     <select onChange={(event)=>setIdRol(event.target.value)} className="form-control">
                      <option selected value="">Seleccione un rol</option>
                      {roles.map((roles)=>(
                      
                        <option selected={(roles.id_rol==id_rol)?`selected`:``}  value={roles.id_rol}>{roles.nombre}</option>

                        ))}
                      </select> 
                    
                

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