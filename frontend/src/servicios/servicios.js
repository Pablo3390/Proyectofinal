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
//Esta es mi funcion para listar los convenios
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
//Esta es mi funcion para listar las actividades
export async function getActividades(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/actividades`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para listar los organmismos
export async function getOrganismos(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/organismos`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para listar las resoluciones
export async function getResolucion(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/resolucion`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para listar las resoluciones
export async function deleteConvenios(id_convenio){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/convenios/${id_convenio}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para agregar convenios
export async function AddConvenios(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/convenios`, Options)
    const data= await respuesta.json()
    return data
}