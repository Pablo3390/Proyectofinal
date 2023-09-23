/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Convenios.css';
import * as API from './servicios/servicios'

export function Convenios(){
    const [convenios, setConvenios] = useState([])

    useEffect(()=>{
        API.getConvenios().then(setConvenios)}, []
    )
    return(
        <>
        Aqui va el listado de convenios
        <table>
            <tr>
                <td className="Letra_roja">Nombre</td>
                <td className="Letra_roja">Utilidad</td>
                <td className="Letra_roja">Objeto</td>
                <td className="Letra_roja">Fecha_inicio</td>
                <td className="Letra_roja">Fecha_fin</td>
                <td className="Letra_roja">Clausula_peas</td>
                <td className="Letra_roja">Id_organismo</td>
                <td className="Letra_roja">Id_tipo_convenio</td>
                <td className="Letra_roja">Id_resolucion</td>
                <td className="Letra_roja">Estado</td>
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
            </tr>
            ))}
        </table>
        </>
    )
}