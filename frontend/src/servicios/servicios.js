const URL = 'http://localhost:1990'

//Esta es mi funcion para loguearme
export async function Login(datos){    
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers:{
            'Content-Type': 'application/json',
        }
    }
const respuesta = await fetch(`${URL}/login`, Options)
const data= await respuesta.json()
return data
}

//Esta es mi funcion para registrarme
export async function Registro(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/registro`, Options)
    const data= await respuesta.json()
    return data
}

export async function getConvenios(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/convenios`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}
