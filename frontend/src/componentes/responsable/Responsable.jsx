/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import './Responsable.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../menu";



export function Responsable(){
    const [responsable, setResponsable] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        API.getResponsable().then(setResponsable)}, [])

        

    return(
        <>
          <Menu/>
        <div>
            {mensaje}
        </div>
        <table>

       <tr>
                 <td className="Letra_roja" colSpan="12" ><Link className="Borde_negro" to="/agregarresponsable">Agregar Responsable</Link></td>
            </tr> 

            <tr>
                <td className="Letra_roja">Nombre</td>
                <td className="Letra_roja">Organismo</td>
                <td className="Letra_roja" >Estado</td>
                <td colSpan="2" className="Letra_roja">Acciones</td>
                
            </tr>
            {responsable.map((responsable)=>(
                <tr>
                <td className="Borde_negro">{responsable.nombre}</td>
                <td className="Borde_negro">{responsable.organismos}</td>
                <td className="Borde_negro">{responsable.estado}</td>
            
          <td className="Borde_negro"><Link to={`/editresponsable/${responsable.id_responsable} `}><button className="Boton_verde">Editar</button></Link></td>
                
            
            </tr>
            ))}
        </table>
        </>
    )
}