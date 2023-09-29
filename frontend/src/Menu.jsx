/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import reactLogo from './assets/react.svg'
import './Menu.css';
import { Link } from "react-router-dom";
import * as API from './servicios/servicios';
export function Menu(){
    const [rol, setRolUsuario]= useState('')
    const [menus, setMenu]= useState([])

    useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        setRolUsuario(datos_usuario.id_rol)
        traer_menu();
        
      },[])

      const traer_menu = async(id_rol)=>{
        const datos= await API.getMenuByRol(id_rol);
        console.log(datos)
        setMenu(datos.menu)
    }


    const salir = ()=>{
        localStorage.removeItem('usuario');
        console.log('Borro todo el usuario')
        window.location.href='/';
    }

    return(
        <>
             
             <img src={reactLogo} className="logo react" alt="React logo" />
             <div>
                <ul>
                    <li><Link to="/">Home</Link></li>                    
                    <li><Link to="/principal">Principal</Link></li>
                    <li><Link to="/usuario">Usuario</Link></li>
                    <li><Link to="/convenios">Convenios</Link></li>
                    <li><Link to="/actividades">Actividades</Link></li>
                    <li><Link to="/organismos">Organismos</Link></li>
                    <li><Link to="/resolucion">Resolucion</Link></li>
                    <li><Link to="/tipoorganismos">TipoOrganismos</Link></li>
                    <li>Rol: {rol}</li>
                    <li><button onClick={salir}>Cerrar Sesion</button></li>
                </ul>
             </div>

        </>
    )
}