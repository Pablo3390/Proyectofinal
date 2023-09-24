// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import './Resolucion.css';
import * as API from './servicios/servicios'


export function Resolucion(){
    const [resolucion, setResolucion] = useState([])

    useEffect(()=>{
        API.getResolucion().then(setResolucion)}, []
    )
    return(
        <>
        Esta es la pantalla de Resolucion

        <table>
            <tr>
                <td className="Letra_roja">Numero</td>
                <td className="Letra_roja">Año</td>
                <td className="Letra_roja">Estado</td>
            </tr>
            {resolucion.map((resolucion)=>(
                // eslint-disable-next-line react/jsx-key
                <tr>
                <td className="Borde_negro">{resolucion.numero}</td>
                <td className="Borde_negro">{resolucion.ano}</td>
                <td className="Borde_negro">{resolucion.estado}</td>
            
            </tr>
            ))}
        </table>
        </>
    )

}