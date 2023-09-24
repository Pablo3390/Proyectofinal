// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import './Organismos.css';
import * as API from './servicios/servicios'


export function Organismos(){
    const [organismos, setOrganismos] = useState([])

    useEffect(()=>{
        API.getOrganismos().then(setOrganismos)}, []
    )
    return(
        <>
        Esta es la pantalla de Organismos

        <table>
            <tr>
                <td className="Letra_roja">Nombre</td>
                <td className="Letra_roja">Id_tipo_organismo</td>
                <td className="Letra_roja">Estado</td>
            </tr>
            {organismos.map((organismos)=>(
                // eslint-disable-next-line react/jsx-key
                <tr>
                <td className="Borde_negro">{organismos.nombre}</td>
                <td className="Borde_negro">{organismos.id_tipo_organismo}</td>
                <td className="Borde_negro">{organismos.estado}</td>
            
            </tr>
            ))}
        </table>
        </>
    )

}