/* eslint-disable no-unused-vars */
import React from "react";
import reactLogo from './assets/react.svg'
import './Menu.css';
import { Link } from "react-router-dom";
export function Menu(){

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
                </ul>
             </div>

        </>
    )
}