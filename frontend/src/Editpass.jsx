/* eslint-disable no-unused-vars */
import React, {useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from './servicios/servicios'
import miLogo from './Logo.png'



export function EditContraseña(){
    const [mensaje, setMensaje] = useState('')
    const [pass, setPasword] = useState('')
    const {id_usuario} = useParams()
    const [pass2, setPassDos]= useState('')
    const [mensajeAlerta, setMensajeAlerta]= useState('')
   
    

//  //funcion Onsubmit
//     const editarPass = async(event)=>{
//         event.preventDefault();
//         const respuesta = await API.EditPass({pass}, id_usuario)

//         if (respuesta.status){
//             setMensaje(respuesta.mensaje)
//             setTimeout(()=>{
//                 setMensaje('')
//                     window.location.href='/login'
//             }, 2000)
//         }
//         return;
        
//  }


 const editarPass = async(event)=>{
    event.preventDefault();
    if(pass == pass2){
        const registro = await API.EditPass({pass}, id_usuario)
      if(registro.status){
        setMensaje(registro.mensaje)
        setTimeout(()=>{
            setMensaje('')
                window.location.href='/login'
        }, 2000)
         
      }else{
        alert(registro.mensaje)
       
      }
     return;
    }else{
      setMensajeAlerta('Las contraseñas deben ser iguales.')
      setTimeout(()=>{
        setMensajeAlerta('')
        setPassDos('')
          
          }, 2000)
    }
  }
    
    return(
        <>        
        <main className="form-signin w-100 m-auto">
             <form onSubmit={editarPass}>
             <a>
                   <img src={miLogo} className="logo" alt="Mi Logo" />
            </a>
                <div>
                    {mensaje}
                </div>
             <h1 className="h3 mb-3 fw-normal">Por favor ingrese una nueva contraseña</h1>
             <div className="mt-2 form-floating">
                  <input 
                  required
                  type="password" 
                  value={pass}
                  onChange={(event)=>setPasword(event.target.value)}
                  className="form-control" 
                  id="pass" 
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                {
                 mensajeAlerta? 
                <div className="alert alert-danger" role="alert">
                 {mensajeAlerta}
                </div>
              :<></>
                  }
                <div className="mt-2 form-floating">
                  <input 
                  required
                  type="password" 
                  value={pass2}
                  onChange={(event) => {
                    setPassDos((event.target.value < 0)?event.target.value * -1:event.target.value);
                  }}
                  className="form-control" 
                  id="pass2" 
                  />
                  <label htmlFor="password">Repita Contraseña</label>
                </div>





             {/* <div className="form-floating">
                      <input
                      type="password" 
                      value={pass}
                      onChange={(event)=>setPasword(event.target.value)}
                      className="form-control" 
                      placeholder="pass"/>
                      <label htmlFor="floatingInput">Contraseña Nueva</label>
                    </div>
                    {
                 mensajeAlerta? 
                <div className="alert alert-danger" role="alert">
                 {mensajeAlerta}
                </div>
              :<></>
                  }

                    <div className="mt-2 form-floating">
                  <input 
                  required
                  type="password" 
                  value={pass2}
                  onChange={(event) => {
                    setPassDos((event.target.value < 0)?event.target.value * -1:event.target.value);
                  }}
                  className="form-control" 
                  placeholder="pass2" 
                  />
                  <label htmlFor="password">Repita Contraseña Nueva</label>
                </div> */}
                  

                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link className="btn btn-primary" to="/login" >Volver</Link>                  
                  </form>
              </main>
        </>
    )
}