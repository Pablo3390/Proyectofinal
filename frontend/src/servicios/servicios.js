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
//esta es mi funcion es para validar el nick
export async function ValidarNick(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validarnick`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
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
//Esta es mi funcion para listar los convenios
export async function getConveniosByID(id_convenio){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/convenios/${id_convenio}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//Esta es mi funcion para editar los convenios
export async function EditConvenios(datos, id_convenio){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/convenios/${id_convenio}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}
//Esta es mi funcion para eliminar convenios
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
//Esta es mi funcion para actualizar convenios
export async function ActualizarEstadoConvenios(id_convenio, actualizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
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
//Esta es mi funcion para listar los tipo de organmismos
export async function getTipoorganismos(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/tipo_organismos`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}
//Esta es mi funcion para agregar lo tipos de organismo
export async function AddTipoorganismos(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/tipo_organismos`, Options)
    const data= await respuesta.json()
    return data
}
//Esta es mi funcion para eliminar los tipos de organismo
export async function deleteTipoorganismos(id_tipo_organismo){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/tipo_organismos/${id_tipo_organismo}`, Options)
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


//Esta es mi funcion para eliminar resoluciones
export async function deleteResolucion(id_resolucion){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/resolucion/${id_resolucion}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}
//Esta es mi funcion para agregar convenios
export async function AddResolucion(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/resolucion`, Options)  
    const data= await respuesta.json()
    return data
}



//Esta es mi funcion para eliminar organismos
export async function deleteOrganismos(id_organismo){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/organismos/${id_organismo}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para agregar organismo
export async function AddOrganismos(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/organismos`, Options)
    const data= await respuesta.json()
    return data
}
