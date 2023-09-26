/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Convenios.css';
import { Link } from "react-router-dom";

import * as API from './servicios/servicios'

export function Convenios(){
    const [convenios, setConvenios] = useState([])

    useEffect(()=>{
        API.getConvenios().then(setConvenios)}, [])
        const eliminar =(e, id_convenio)=>{
            e.preventDefault();
            console.log('El id que vamos a eliminar es el ', id_convenio)
            API.deleteConvenios(id_convenio);
            window.location.reload(true)

            
        }
    return(
        <>
        Aqui va el listado de Convenios
        <table>
        <tr>
                <td className="Letra_roja" colSpan="11" ><Link className="Borde_negro" to="/agregarConvenios">Agregar Convenios</Link></td>
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
                <td className="Letra_roja">#</td>
            </tr>
            {convenios.map((convenios)=>(
                <tr>
                <td className="Borde_negro">{convenios.nombre}</td>
                <td className="Borde_negro">{convenios.utilidad}</td>
                <td className="Borde_negro">{convenios.objeto}</td>
                <td className="Borde_negro">{convenios.fecha_inicio}</td>
                <td className="Borde_negro">{convenios.fecha_fin}</td>
                <td className="Borde_negro">{convenios.clausula_peas}</td>
                <td className="Borde_negro">{convenios.id_organismo}</td>
                <td className="Borde_negro">{convenios.id_tipo_convenio}</td>
                <td className="Borde_negro">{convenios.id_resolucion}</td>
                <td className="Borde_negro">{convenios.estado}</td>
                <td className="Borde_negro"><button onClick={(event)=>eliminar(event, convenios.id_convenio)} className="Boton_rojo">Eliminar</button></td>
            </tr>
            ))}
        </table>
        </>
    )
}