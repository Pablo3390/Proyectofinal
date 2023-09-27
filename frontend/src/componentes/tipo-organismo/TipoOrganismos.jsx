// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import './TipoOrganismos.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function Tipoorganismos(){
    const [Tipo_organismos, setTipoorganismos] = useState([])

    useEffect(()=>{
        API.getTipoorganismos().then(setTipoorganismos)
    }, [] )
    const eliminar =(e, id_tipo_organismo)=>{
        e.preventDefault();
        console.log('El id que vamos a eliminar es el ', id_tipo_organismo)
        API.deleteTipoorganismos(id_tipo_organismo);
        window.location.reload(true)

        
    }
    return(
        <>
             <table>
        <tr>
                <td className="Letra_roja" colSpan="4" ><Link className="Borde_negro" to="/agregarTipoorganismos">Agregar Tipo De Organismo</Link></td>
            </tr>
            <tr>
                <td className="Letra_roja">Nombre</td>
                <td className="Letra_roja">Estado</td>
                <td className="Letra_roja">#</td>
            </tr>
            {Tipo_organismos.map((tipo_organismos)=>(
                // eslint-disable-next-line react/jsx-key
                <tr>
                <td className="Borde_negro">{tipo_organismos.nombre}</td>
                <td className="Borde_negro">{tipo_organismos.estado}</td>
                <td className="Borde_negro"><button onClick={(event)=>eliminar(event, tipo_organismos.id_tipo_organismo)} className="Boton_rojo">Eliminar</button></td>
            
            </tr>
            ))}
        </table>
        </>
    )

}