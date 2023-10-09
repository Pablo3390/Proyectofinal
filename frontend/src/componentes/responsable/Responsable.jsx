/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Responsable.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";

 

export function Responsable(){
    const [responsable, setResponsable] = useState([])
    const [id_responsable, setIdResponsable] = useState([])
    // eslint-disable-next-line no-unused-vars
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


    const guardarResponsable = async(event)=>{
        event.preventDefault();
        if(id_responsable){
            const respuesta = await API.EditResponsable({nombre, id_organismo}, id_responsable)
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

    useEffect(()=>{
        API.getResponsable().then(setResponsable)
        API.getOrganismos().then(setOrganismos)}, [])

    
        const editar_registro = async (e, id_responsable)=>{
            e.preventDefault();

            console.log('el id que vamos a editar es el ', id_responsable)
            setIdResponsable(id_responsable)
            const datos_responsable= await API.getResponsableByID(id_responsable);
            console.log(datos_responsable)
            setNombre(datos_responsable.nombre)
            setIdorganismo(datos_responsable.id_organismo)

        }



    return(
        <>
          <Menu/>
        {/* <div>
            {mensaje}
        </div> */}
       
        <table className="table table-striped-columns">
        <thead>
           <tr>
                 <th colSpan="12" >
                 <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Agregar Responsable</button>
                    
            </th> 
            </tr>

            <tr>
                <th >Nombre</th>
                <th>Id Organismo</th>
                <th >Acciones</th>
                
            </tr>
            </thead>

            <tbody>
            {responsable.map((responsable)=>(
                <tr>
                <td >{responsable.nombre}</td>
                <td >{responsable.id_organismo}</td>

                <td><button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, responsable.id_responsable)}className="btn btn-outline-warning btn-sm">Editar</button></td>
          {/* <td className="Borde_negro"><Link to={`/editresponsable/${responsable.id_responsable} `}><button className="Boton_verde">Editar</button></Link></td> */}
                
            
            </tr>
            ))}
             </tbody> 
        </table>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Datos del responsable</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={guardarResponsable}>
                    <div className="modal-body">

                    
                <div>
                    {/* {mensaje} */}
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
                  
                      <select onChange={(event)=>setIdorganismo(event.target.value)} className="form-control">
                      
                      <option selected value="">Seleccione un Organismo</option>
                      {organismos.map((organismos)=>(
                      
                        <option value={organismos.id_organismo}>{organismos.nombre}</option>

                        ))}
                      </select>
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
    )
}