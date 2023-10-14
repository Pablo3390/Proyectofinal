/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import './Resolucion.css';
import * as API from '../../servicios/servicios'
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";


export function Resolucion(){
    const [resolucion, setResolucion] = useState([])
    const [id_resolucion, setIdResolucion] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [numero, setNumero] = useState('')
    const [ano, setAno] = useState('')

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }



    useEffect(()=>{
        API.getResolucion().then(setResolucion)}, [])
        // eslint-disable-next-line no-unused-vars


        const eliminar =(e, id_resolucion)=>{
            e.preventDefault();
            console.log('El id que vamos a eliminar es el ', id_resolucion)
            API.deleteResolucion(id_resolucion);
            window.location.reload(true)

            
        }


        const guardaResolucion = async(event)=>{
            event.preventDefault();
            if(id_resolucion){
                const respuesta = await API.EditResolucion({numero, ano}, id_resolucion)

        if (respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
            setTimeout(()=>{
                setMensaje('')
                    window.location.href='/resolucion'
            }, 2000)
        }
        return;
               
            }else{
                const respuesta = await API.AddResolucion({numero, ano})
                if (respuesta.status){
                    setMensaje(respuesta.mensaje)
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                    setTimeout(()=>{
                        setMensaje('')
                            window.location.href='/resolucion'
                    }, 2000)
                }
                return;

            }
              
     }


     const editar_registro = async (e, id_resolucion)=>{
        e.preventDefault();
        console.log('el id que vamos a editar es el ', id_resolucion)
        setIdResolucion(id_resolucion)
        const datos_resolucion= await API.getResolucionByID(id_resolucion);
      setNumero(datos_resolucion.numero)
      setAno(datos_resolucion.ano)
    }



    return(
        <>
         <Menu/>
       

        <table className="table table-striped">
        <thead>
        <tr>
                <th colSpan="12" >
                <button  className="btn btn-outline-success  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" ><i className="bi bi-database-add"></i>Agregar Resolución</button>
                    {/* <Link className="Borde_negro" to="/agregarResolucion">Agregar Resolucion</Link> */}
                </th>
            </tr>
            <tr>
                <th >Numero</th>
                <th >Año</th>
                <th >Estado</th>
                <th colSpan="2">Acciones</th>
                {/* <td className="Letra_roja">#</td> */}
            </tr>
            </thead>

            <tbody>
            {resolucion.map((resolucion)=>(
                // eslint-disable-next-line react/jsx-key
                <tr>
                <td>{resolucion.numero}</td>
                <td >{resolucion.ano}</td>
                <td>{resolucion.estado}</td>
                
                <td>  <button data-bs-toggle="modal"  data-bs-target="#exampleModal"  onClick={(event)=>editar_registro(event, resolucion.id_resolucion)} className="btn btn-warning btn-sm"><i className="bi bi-pencil"></i>Editar</button></td>
                    
                <td>   <button className="btn btn-danger btn-sm" onClick={(event)=>eliminar(event, resolucion.id_resolucion)}><i className="bi bi-hand-thumbs-down-fill"></i>Eliminar</button></td>
                    {/* <Link to={`/editResolucion/${resolucion.id_resolucion} `}><button className="Boton_verde">Editar</button></Link> */}
                    
                
                
            </tr>
            ))}
            </tbody>
        </table>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Datos la resolucion </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={guardaResolucion}>
                <div>
                    {mensaje}
                </div>
             <h1 className="h3 mb-3 fw-normal">Por favor completar datos </h1>
                    <div className="form-floating">
                      <input
                      type="number" 
                      value={numero}
                      onChange={(event) => {
                        setNumero((event.target.value < 0)?event.target.value * -1:event.target.value);
                      }}
                      className="form-control" 
                      placeholder="nombre"/>
                      <label htmlFor="floatingInput">Numero</label>
                    </div>
                    <div className="form-floating">
                      <input
                      type="number" 
                      value={ano}
                      onChange={(event) => {
                        setAno((event.target.value < 0)?event.target.value * -1:event.target.value);
                      }}
                      className="form-control" 
                      placeholder="nombre"/>
                      <label htmlFor="floatingInput">Año</label>
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