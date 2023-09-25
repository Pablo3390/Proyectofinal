// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import './Organismos.css';
import * as API from './servicios/servicios'


export function Organismos(){
    const [organismos, setOrganismos] = useState([])

    useEffect(()=>{
        API.getOrganismos().then(setOrganismos)
    }, [] )
    const eliminar =(e, id_organismo)=>{
        e.preventDefault();
        console.log('El id que vamos a eliminar es el ', id_organismo)
        API.deleteOrganismos(id_organismo);
        window.location.reload(true)

        
    }
    return(
        <>
        Esta es la pantalla de Organismos

        <table>
            <tr>
                <td className="Letra_roja">Nombre</td>
                <td className="Letra_roja">Id_tipo_organismo</td>
                <td className="Letra_roja">Estado</td>
                <td className="Letra_roja">#</td>
            </tr>
            {organismos.map((organismos)=>(
                // eslint-disable-next-line react/jsx-key
                <tr>
                <td className="Borde_negro">{organismos.nombre}</td>
                <td className="Borde_negro">{organismos.id_tipo_organismo}</td>
                <td className="Borde_negro">{organismos.estado}</td>
                <td className="Borde_negro"><button onClick={(event)=>eliminar(event, organismos.id_organismo)} className="Boton_rojo">Eliminar</button></td>
            
            </tr>
            ))}
        </table>
        </>
    )

}