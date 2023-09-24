/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Actividades.css';
import * as API from './servicios/servicios'


export function Actividades(){
    const [actividades, setActividades] = useState([])

    useEffect(()=>{
        API.getActividades().then(setActividades)}, []
    )
    return(
        <>
        Esta es la pantalla de Actividades

        <table>
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
            
            </tr>
            ))}
        </table>
        </>
    )

}