/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './TipoConvenios.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";



export function TipoConvenios(){
    const [tipo_convenios, setTipoconvenios] = useState([])
    const [id_tipo_convenio, setIdTipoconvenios] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [tipo_conveniocol, setTipoconveniocol] = useState('')

   
   
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
   
   
    useEffect(()=>{
        API.getTipoconvenios().then(setTipoconvenios)}, [])

    
        const guardaTipoconvenios = async(event)=>{
            event.preventDefault();
            if(id_tipo_convenio){
                const respuesta = await API.EditTipoconvenios({nombre,tipo_conveniocol}, id_tipo_convenio)

                if (respuesta.status){
                    setMensaje(respuesta.mensaje)
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                    setTimeout(()=>{
                        setMensaje('')
                            window.location.href='/tipo_convenios'
                    }, 2000)
                }
                return;
            }else{
                const respuesta = await API.AddTipoconvenios({nombre, tipo_conveniocol})
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/tipo_convenios'
                }, 2000)
            }
            return;

            }
            
            
     }

     const editar_registro = async (e, id_tipo_convenio)=>{
        e.preventDefault();
        
        console.log('el id que vamos a editar es el ', id_tipo_convenio)
        setIdTipoconvenios(id_tipo_convenio)
        const datos_tipoconvenios= await API.getTipoconveniosByID(id_tipo_convenio);
        console.log(datos_tipoconvenios)
        setNombre(datos_tipoconvenios.nombre)
        setTipoconveniocol(datos_tipoconvenios.tipo_conveniocol)
        
}

    const limpiarModal = async ()=>{
        
        setNombre('')
        setIdTipoconvenios('')
        setTipoconveniocol('')
    }


    return(
        <>
          <Menu/>
        
        <table className="table table-striped">
        <thead>
       <tr>
                <th colSpan="12" >
                    {/* <Link className="Borde_negro" to="/agregartipoconvenios">Agregar Tipo Convenios</Link></th> */}
                    <button onClick={(event)=>limpiarModal('')}  className="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" >Agregar tipo de convenio</button>
                    </th>
            </tr>

            <tr>
                <td >Nombre</td>
                <td >Tipo Convenio Col</td>
                <td >Acciones</td>
                
            </tr>
            </thead>


            <tbody>
            {tipo_convenios.map((tipo_convenios)=>(
                <tr>
                <td >{tipo_convenios.nombre}</td>
                <td >{tipo_convenios.tipo_conveniocol}</td>
                
              <td >
                {/* <Link to={`/editTipoconvenios/${tipo_convenios.id_tipo_convenio} `}><button className="Boton_verde">Editar</button></Link></td> */}
                <button data-bs-toggle="modal"  data-bs-target="#exampleModal"  onClick={(event)=>editar_registro(event, tipo_convenios.id_tipo_convenio)} className="btn btn-outline-warning btn-sm">Editar</button>
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
                <form onSubmit={guardaTipoconvenios}>
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

                    <div className="form-floating">
                      <input
                      type="text" 
                      value={tipo_conveniocol}
                      onChange={(event)=>setTipoconveniocol(event.target.value)}
                      className="form-control" 
                      placeholder="tipo_conveniocol"/>
                      <label htmlFor="floatingInput">Tipo Convenio col</label>
                    </div>
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
