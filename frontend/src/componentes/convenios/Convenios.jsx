/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Convenios.css';
import { Link } from "react-router-dom";


import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";

export function Convenios(){
    const [convenios, setConvenios] = useState([])
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        API.getConvenios().then(setConvenios)}, [])
        const cambiar_estado = async (e, id_convenio, estado_actual)=>{
            e.preventDefault();
            const actualizar = (estado_actual=="A")?"B":"A";
            console.log(actualizar)
            const respuesta= await API.ActualizarEstadoConvenios(id_convenio, {actualizar});
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/convenios'
                }, 1000)
            }

            
        }
    return(
        <>
        <Menu/>
        <div>
            {mensaje}
        </div>
        <table>
        <tr>
                <td className="Letra_roja" colSpan="12" ><Link className="Borde_negro" to="/agregarConvenios">Agregar Convenios</Link></td>
            </tr>
            <tr>
                <td className="Letra_roja">Nombre</td>
                <td className="Letra_roja">Utilidad</td>
                <td className="Letra_roja">Objeto</td>
                <td className="Letra_roja">Fecha de inicio</td>
                <td className="Letra_roja">Fecha de fin</td>
                <td className="Letra_roja">Clausula peas</td>
                <td className="Letra_roja">Organismo</td>
                <td className="Letra_roja">Tipo de convenio</td>
                <td className="Letra_roja">Resolucion</td>
                <td className="Letra_roja">Estado</td>
                <td colSpan="2" className="Letra_roja">Acciones</td>
                
            </tr>
            {convenios.map((convenios)=>(
                <tr>
                <td className="Borde_negro">{convenios.nombre}</td>
                <td className="Borde_negro">{convenios.utilidad}</td>
                <td className="Borde_negro">{convenios.objeto}</td>
                <td className="Borde_negro">{convenios.fecha_inicio}</td>
                <td className="Borde_negro">{convenios.fecha_fin}</td>
                <td className="Borde_negro">{convenios.clausula_peas}</td>
                <td className="Borde_negro">{convenios.organismos}</td>
                <td className="Borde_negro">{convenios.tipo_convenios}</td>
                <td className="Borde_negro">{convenios.resolucion}</td>
                <td className="Borde_negro">{convenios.estado}</td>
                <td className="Borde_negro"><Link to={`/editConvenios/${convenios.id_convenio} `}><button className="Boton_verde">Editar</button></Link></td>
                {(convenios.estado=="A")?
                <td className="Borde_negro"><button onClick={(event)=>cambiar_estado(event, convenios.id_convenio, convenios.estado)} className="Boton_rojo">Dar De Baja</button></td>
                :
                <td className="Borde_negro"><button onClick={(event)=>cambiar_estado(event, convenios.id_convenio, convenios.estado)} className="Boton_azul">Dar De Alta</button></td>
                
                 }
                
            </tr>
            ))}
        </table>
        </>
    )
}