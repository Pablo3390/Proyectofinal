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
console.log(data)
return data
}

//Esta es mi funcion para loguearme
export async function Registro(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        Headers:{
            'Content-Type': 'application/json',
        }
    }
const respuesta = await fetch(`${URL}/registro`, Options)
const data= await respuesta.json()
console.log(data)
return data
}