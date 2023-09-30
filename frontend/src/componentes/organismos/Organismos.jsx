// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import './Organismos.css';
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function Organismos(){
    const [organismos, setOrganismos] = useState([])
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        API.getOrganismos().then(setOrganismos)}, [])
        const cambiar_estado = async (e, id_organismo, estado_actual)=>{
            e.preventDefault();
            const actualizar = (estado_actual=="A")?"B":"A";
            console.log(actualizar)
            const respuesta= await API.ActualizarEstadoOrganismos(id_organismo, {actualizar});
            if (respuesta.status){
                setMensaje(respuesta.mensaje)
                setTimeout(()=>{
                    setMensaje('')
                        window.location.href='/organismos'
                }, 1000)
            }

            
        }
    return(
        <>
        Esta es la pantalla de Organismos
        <div>
            {mensaje}
        </div>

        <table>
        <tr>
                <td className="Letra_roja" colSpan="5" ><Link className="Borde_negro" to="/agregarOrganismos">Agregar Organismo</Link></td>
            </tr>
            <tr>
                <td className="Letra_roja">Nombre</td>
                <td className="Letra_roja">Id_tipo_organismo</td>
                <td className="Letra_roja">Estado</td>
                <td colSpan="2" className="Letra_roja">Acciones</td>
            </tr>
            {organismos.map((organismos)=>(
                // eslint-disable-next-line react/jsx-key
                <tr>
                <td className="Borde_negro">{organismos.nombre}</td>
                <td className="Borde_negro">{organismos.id_tipo_organismo}</td>
                <td className="Borde_negro">{organismos.estado}</td>
                <td className="Borde_negro"><Link to={`/editOrganismos/${organismos.id_organismo} `}><button className="Boton_verde">Editar</button></Link></td>
                {(organismos.estado=="A")?
                <td className="Borde_negro"><button onClick={(event)=>cambiar_estado(event, organismos.id_organismo, organismos.estado)} className="Boton_rojo">Dar De Baja</button></td>
                :
                <td className="Borde_negro"><button onClick={(event)=>cambiar_estado(event, organismos.id_organismo, organismos.estado)} className="Boton_azul">Dar De Alta</button></td>
                
                 }
            
            </tr>
            ))}
        </table>
        </>
    )

}