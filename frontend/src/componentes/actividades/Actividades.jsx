/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Actividades.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'


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
         <div>
            {mensaje}
        </div>


        <table>

        <tr>
                <td className="Letra_roja" colSpan="12" ><Link className="Borde_negro" to="/agregarActividades">Agregar Actividades</Link></td>
            </tr>
           
            <tr>
                <td className="Letra_roja">Nombre</td>
                <td className="Letra_roja">Fecha</td>
                <td className="Letra_roja">Lugar</td>
                <td className="Letra_roja">Participante</td>
                <td className="Letra_roja">Id_convenio</td>
                <td className="Letra_roja">Estado</td>
            </tr>

            
            {actividades.map((actividades)=>(
                <tr>
                <td className="Borde_negro">{actividades.nombre}</td>
                <td className="Borde_negro">{actividades.fecha}</td>
                <td className="Borde_negro">{actividades.lugar}</td>
                <td className="Borde_negro">{actividades.participante}</td>
                <td className="Borde_negro">{actividades.id_convenio}</td>
                <td className="Borde_negro">{actividades.estado}</td>
                {(actividades.estado=="A")?
                <td className="Borde_negro"><button onClick={(event)=>cambiar_estado(event, actividades.id_actividad, actividades.estado)} className="Boton_rojo">Dar De Baja</button></td>
                :
                <td className="Borde_negro"><button onClick={(event)=>cambiar_estado(event, actividades.id_actividad, actividades.estado)} className="Boton_azul">Dar De Alta</button></td>
                
                 }
            
            </tr>
            ))}
        </table>
        </>
    )

} 