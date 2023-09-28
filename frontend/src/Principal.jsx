/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Menu } from './Menu'
export function Principal(){
    const [usuario, setUsuario]= useState()

    useEffect(()=>{
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
        if(usuarioLogueado){
            console.log(usuarioLogueado.apellido)
            setUsuario(usuarioLogueado)

        }
      },[])

    return(
        <>
        <Menu/>
        Esta es mi pantalla principal
        </>
    )
}