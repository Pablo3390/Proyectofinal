import React, { useEffect, useState } from "react";
import './TipoOrganismos.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";

export function TipoOrganismos(){
    const [tipo_organismos, setTipoorganismos] = useState([])
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        API.getTipoorganismos().then(setTipoorganismos)}, [])

        /*const cambiar_estado = async (e, id_convenio, estado_actual)=>{
            e.preventDefault();
            const actualizar = (estado_actual=="A")?"B":"A";
            console.log(actualizar)
            const respuesta= await API.ActualizarEstadoConvenios(id_convenio, {actualizar});
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/convenios'
                }, 1000)
            }

            
        }*/

    return(
        <>
         <Menu/>
        <div>
            {mensaje}
        </div>
        <table>

        <tr>
                <td className="Letra_roja" colSpan="12" ><Link className="Borde_negro" to="/agregartipoorganismos">Agregar Tipo Organismos</Link></td>
            </tr>

            <tr>
                <td className="Letra_roja">Nombre</td>
                <td colSpan="2" className="Letra_roja">Acciones</td>
                
            </tr>
            {tipo_organismos.map((tipo_organismos)=>(
                <tr>
                <td className="Borde_negro">{tipo_organismos.nombre}</td>
                
               <td className="Borde_negro"><Link to={`/editTipoorganismos/${tipo_organismos.id_tipo_organismo} `}><button className="Boton_verde">Editar</button></Link></td>
                
            
            </tr>
            ))}
        </table>
        </>
    )
}