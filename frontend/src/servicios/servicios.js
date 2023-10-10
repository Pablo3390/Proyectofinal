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



//FUNCIONES DE ACTIVIDADES
//Esta es mi funcion para listar las actividades
export async function getActividades(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/actividades`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para agregar ACTIVIDADES
export async function AddActividades(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/actividades`, Options)
    const data= await respuesta.json()
    return data
}

//Esta es mi funcion para actualizar actividades
export async function ActualizarEstadoActividades(id_actividad, actualizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/actividades/${id_actividad}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para listar las actividades
export async function getActividadesByID(id_actividad){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/actividades/${id_actividad}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//Esta es mi funcion para editar las actividades
export async function EditActividades(datos, id_actividad){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/actividades/${id_actividad}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}




//FUNCIONES DE ORGANISMOS
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

export async function getOrganismosByID(id_organismo){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/organismos/${id_organismo}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function EditOrganismos(datos, id_organismo){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/organismos/${id_organismo}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

export async function ActualizarEstadoOrganismos(id_organismo, actualizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/organismos/${id_organismo}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}



//FUNCIONES DE TIPO ORGANISMOS
//listar tipos de organismos
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

// agregar Tipos organismos
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

//listar tipos organismos por ID
export async function getTipoorganismosByID(id_tipo_organismo){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/tipo_organismos/${id_tipo_organismo}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//editar tipo organismos
export async function EditTipoorganismos(datos, id_tipo_organismo){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/tipo_organismos/${id_tipo_organismo}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para eliminar los tipos de organismo

/*export async function deleteTipoOrganismos(id_tipo_organismo){
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
}*/



//FUNCIONES DE RESOLUCIONES
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

export async function getMenuByRol(id_rol){
    const token = JSON.parse(localStorage.getItem('token'));
   const Options={
       method:'GET',
       headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
       }
   }
   const respuesta = await fetch(`${URL}/menu/${id_rol}`, Options)
   const data= await respuesta.json();
   return data;
}

//FUNCIONES TIPO CONVENIOS
//listar tipo_convenios
export async function getTipoconvenios(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/tipo_convenios`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

// agregar Tipos convenios
export async function AddTipoconvenios(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/tipo_convenios`, Options)
    const data= await respuesta.json()
    return data
}

//listar tipos convenios por ID
export async function getTipoconveniosByID(id_tipo_convenio){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/tipo_convenios/${id_tipo_convenio}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//editar tipo convenios
export async function EditTipoconvenios(datos, id_tipo_convenio){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/tipo_convenios/${id_tipo_convenio}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//FUNCIONES DE RESPONSABLE
//lista responsable
export async function getResponsable(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/responsable`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}


// agregar Responsable
export async function AddResponsable(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/responsable`, Options)
    const data= await respuesta.json()
    return data
}

//listar responsable por ID
export async function getResponsableByID(id_responsable){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/responsable/${id_responsable}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//editar responsable
export async function EditResponsable(datos, id_responsable){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/responsable/${id_responsable}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//eliminar responsable
export async function deleteResponsable(id_responsable){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/responsable/${id_responsable}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}


export async function getUsuarios(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/usuarios`, Options)
    const data= await respuesta.json();
    return data
}

export async function getUsuariosByID(id_usuario){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function ver_permisos(datos){
    const token = JSON.parse(localStorage.getItem('token'));
   const Options={
       method:'POST',
       body: JSON.stringify(datos),
       headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
       }
   }
   const respuesta = await fetch(`${URL}/menu_permisos`, Options)
   const data= await respuesta.json();
   console.log('respuesta de permisos', data)
   return data;
}

export async function ResetUsuariosByID(id_usuario){
    const Options={
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/resetpass/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function ActualizarEstadoUsuario(id_usuario, actualizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}