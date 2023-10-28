/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Menu } from './Menu'
import miLogo from './Logo.png'
import './Principal.css'
export function Principal(){
    const [usuario, setUsuario]= useState()

    useEffect(()=>{
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
        if(usuarioLogueado){
            setUsuario(usuarioLogueado)
        }else{
            window.location.href='/'
        }
      },[])

    return(
        <>
        <Menu/>
        <main className="px-">
            <a>
                    <img src={miLogo} className="logo" alt="Mi Logo" />
                  </a>
              <h1>Bienvenido.</h1>
              <p className="lead">
¡Bienvenido a nuestra plataforma de Gestión de Convenios! Simplificamos y optimizamos la administración de acuerdos y contratos. Descubre herramientas intuitivas y eficaces para potenciar tus convenios. ¡Comencemos juntos!</p>

            </main>
        </>
    )
}