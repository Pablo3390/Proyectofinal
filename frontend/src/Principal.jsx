/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Menu } from './Menu'
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
        </>
    )
}