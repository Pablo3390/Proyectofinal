import React, { useEffect, useState } from "react";
import './TipoConvenios.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'



export function TipoConvenios(){
    const [tipo_convenios, setTipoconvenios] = useState([])
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        API.getTipoconvenios().then(setTipoconvenios)}, [])

        

    return(
        <>
          
        <div>
            {mensaje}
        </div>
        <table>

       <tr>
                <td className="Letra_roja" colSpan="12" ><Link className="Borde_negro" to="/agregartipoconvenios">Agregar Tipo Convenios</Link></td>
            </tr>

            <tr>
                <td className="Letra_roja">Nombre</td>
                <td className="Letra_roja">Tipo Convenio</td>
                <td colSpan="2" className="Letra_roja">Acciones</td>
                
            </tr>
            {tipo_convenios.map((tipo_convenios)=>(
                <tr>
                <td className="Borde_negro">{tipo_convenios.nombre}</td>
                <td className="Borde_negro">{tipo_convenios.tipo_conveniocol}</td>
                
              <td className="Borde_negro"><Link to={`/editTipoconvenios/${tipo_convenios.id_tipo_convenio} `}><button className="Boton_verde">Editar</button></Link></td>
                
            
            </tr>
            ))}
        </table>
        </>
    )
}