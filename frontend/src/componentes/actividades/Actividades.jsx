/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Actividades.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";


export function Actividades(){
    const [actividades, setActividades] = useState([])
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        API.getActividades().then(setActividades)}, [])

   /* CAMBIAR ESTADO DE ACTIVIDADES*/ 
     const cambiar_estado = async (e, id_actividad, estado_actual)=>{
            e.preventDefault();
            const actualizar = (estado_actual=="A")?"B":"A";
            console.log(actualizar)
            const respuesta= await API.ActualizarEstadoActividades(id_actividad, {actualizar});
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/actividades'
                }, 1000)
            }
        }

 

        
    return(
        <>
        <Menu/>
         <div>
            {mensaje}
        </div>


        <table className="table table-striped-columns">

        
           <thead>
           <tr>
                <th colSpan="8">
                    <Link className="btn btn-outline-success" to="/agregarActividades">Agregar Actividades</Link>

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
                    <td><Link to={`/editactividades/${actividades.id_actividad} `}><button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-warning btn-sm">Editar</button></Link></td>
                    {(actividades.estado=="A")?
                    <td><button className="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, actividades.id_actividad, actividades.estado)}>Dar De Baja</button></td>
                    :
                    <td><button className="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, actividades.id_actividad, actividades.estado)}>Dar De Alta</button></td>
                    
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
                    <div className="modal-body">
                        HOLAAAA
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Guardar</button>
                        
                    </div>
                    </div>
                </div>
                </div>
        </>
    )

} 