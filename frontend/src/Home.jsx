// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import miLogo from './componentes/logo/Logo.png'
import { Link } from "react-router-dom";
import './Home.css'
export function Home(){

  useEffect(()=>{
    const datos_usuario = JSON.parse(localStorage.getItem('usuario'));

    if(datos_usuario){
        window.location.href='/principal';
        return;
    }
    
},[])

    return(
        <>
        <nav >
        <div>
          <a>
          <img src={miLogo} className="logo" alt="Mi Logo" />
          </a>
          
        </div>
        <div>
            <ul>
                {/* <li><Link to="/">Home</Link></li> */}
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registro">Registro</Link></li>
                
            </ul>
        </div>
        </nav>
        </>
    )
}