/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import miLogo from './Logo.png'
import './Menu.css';
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'

export function Menu(){
   
    const [menus, setMenu]= useState([])
    const [user, setUser]= useState()

    useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        if(!datos_usuario){
            window.location.href='/';
            return;
        }
        setUser(datos_usuario.apellido+' '+datos_usuario.nombre)
        traer_menu(datos_usuario.id_rol);
    },[])

    const traer_menu =  async (id_rol)=>{
        const datos= await API.getMenuByRol(id_rol);
        setMenu(datos.menu)
    }

    const salir = ()=>{
        localStorage.removeItem('usuario');
        window.location.href='/';
    }
    return(
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
                <div className="container-fluid">
                <img src={miLogo} className="logo" alt="Mi Logo" />
                    {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        {menus.map((m)=>(
                        <li className="nav-item">
                            <Link  className="nav-link active" aria-current="page"  to={m.href}>{m.nombre}</Link>
                        
                        </li>
                        ))}
                        <li className="btn btn-primary"  aria-current="page" >{user}</li>
                        <td><button  className="btn btn-danger" onClick={salir}>Cerrar Sesión</button></td>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
