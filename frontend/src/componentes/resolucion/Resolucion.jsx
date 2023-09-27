// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import './Resolucion.css';
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";


export function Resolucion(){
    const [resolucion, setResolucion] = useState([])

    useEffect(()=>{
        API.getResolucion().then(setResolucion)}, [])
        const eliminar =(e, id_resolucion)=>{
            e.preventDefault();
            console.log('El id que vamos a eliminar es el ', id_resolucion)
            API.deleteResolucion(id_resolucion);
            window.location.reload(true)

            
        }


    return(
        <>

        <table>
        <tr>
                <td className="Letra_roja" colSpan="4" ><Link className="Borde_negro" to="/agregarResolucion">Agregar Resolucion</Link></td>
            </tr>
            <tr>
                <td className="Letra_roja">Numero</td>
                <td className="Letra_roja">Año</td>
                <td className="Letra_roja">Estado</td>
                <td className="Letra_roja">#</td>
            </tr>
            {resolucion.map((resolucion)=>(
                // eslint-disable-next-line react/jsx-key
                <tr>
                <td className="Borde_negro">{resolucion.numero}</td>
                <td className="Borde_negro">{resolucion.ano}</td>
                <td className="Borde_negro">{resolucion.estado}</td>
                <td className="Borde_negro"><button onClick={(event)=>eliminar(event, resolucion.id_resolucion)} className="Boton_rojo">Eliminar</button></td>
            
            </tr>
            ))}
        </table>
        </>
    )

}