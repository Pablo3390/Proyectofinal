/* eslint-disable no-unused-vars */
import React from "react";
import reactLogo from './assets/react.svg'
import './Menu.css';
export function Menu(){

    return(
        <>
             <a href="https://react.dev" target="_blank" rel="noreferrer">
             <img src={reactLogo} className="logo react" alt="React logo" />
             </a>

             <div className="letra_menu">
                <ul>
                 <li>registro</li>
                 <li>ingreso</li>
                 </ul>
              </div>

        </>
    )
}