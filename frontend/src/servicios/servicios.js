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

//Esta es mi funcion para cambiar de contraseña
export async function EditPass(datos, id_usuario){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/editpass/${id_usuario}`, Options)
    const data= await respuesta.json()
    console.log(data)
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

//Esta es mi funcion para agregar actividades
export async function AddActividades(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/actividades`, Options)
    const data= await respuesta.json()
    return data
}

//Esta es mi funcion para actualizar actividades
export async function ActualizarEstadoActividades(id_actividad, actualizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/actividades/${id_actividad}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para listar las actividades por ID
export async function getActividadesByID(id_actividad){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/actividades/${id_actividad}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//Esta es mi funcion para editar las actividades
export async function EditActividades(datos, id_actividad){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/actividades/${id_actividad}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//FUNCIONES DE CONVENIOS

//Esta es mi funcion para listar los convenios
export async function getConvenios(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/convenios`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}
//Esta es mi funcion para listar los convenios
export async function getConveniosByID(id_convenio){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/convenios/${id_convenio}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//Esta es mi funcion para editar los convenios
export async function EditConvenios(datos, id_convenio){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/convenios/${id_convenio}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}
//Esta es mi funcion para eliminar convenios
export async function deleteConvenios(id_convenio){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/convenios/${id_convenio}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}
//Esta es mi funcion para actualizar convenios
export async function ActualizarEstadoConvenios(id_convenio, actualizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/convenios/${id_convenio}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}
 


//Esta es mi funcion para agregar convenios
export async function AddConvenios(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/convenios`, Options)
    const data= await respuesta.json()
    return data
}

//FUNCIONES DE ORGANISMOS

//Esta es mi funcion para listar los organmismos
export async function getOrganismos(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/organismos`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

export async function getOrganismosByID(id_organismo){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/organismos/${id_organismo}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function EditOrganismos(datos, id_organismo){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/organismos/${id_organismo}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

export async function ActualizarEstadoOrganismos(id_organismo, actualizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/organismos/${id_organismo}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para eliminar organismos
export async function deleteOrganismos(id_organismo){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/organismos/${id_organismo}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//Esta es mi funcion para agregar organismo
export async function AddOrganismos(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/organismos`, Options)
    const data= await respuesta.json()
    return data
}

//FUNCIONES DE RESOLUCIONES
//Esta es mi funcion para listar las resoluciones
export async function getResolucion(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/resolucion`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}


//Esta es mi funcion para eliminar resoluciones
export async function deleteResolucion(id_resolucion){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/resolucion/${id_resolucion}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}
//Esta es mi funcion para agregar convenios
export async function AddResolucion(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/resolucion`, Options)  
    const data= await respuesta.json()
    return data
}

//editar resoluciones
export async function EditResolucion(datos, id_resolucion){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/resolucion/${id_resolucion}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//listar resoluciones por ID
export async function getResolucionByID(id_resolucion){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const respuesta = await fetch(`${URL}/resolucion/${id_resolucion}`, Options)
    const data= await respuesta.json();
    return data[0];
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
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/responsable`, Options)
    const data= await respuesta.json()
    return data
}

//actualizar Responsable
export async function ActualizarEstadoResponsable(id_responsable, actualizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/responsable/${id_responsable}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}


//listar responsable por ID
export async function getResponsableByID(id_responsable){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/responsable/${id_responsable}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//editar responsable
export async function EditResponsable(datos, id_responsable){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/responsable/${id_responsable}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//eliminar responsable
export async function deleteResponsable(id_responsable){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/responsable/${id_responsable}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}


//FUNCIONES DE TIPO ORGANISMOS
//listar tipos de organismos
export async function getTipoorganismos(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/tipo_organismos`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

// agregar Tipos organismos
export async function AddTipoorganismos(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/tipo_organismos`, Options)
    const data= await respuesta.json()
    return data
}

//listar tipos organismos por ID
export async function getTipoorganismosByID(id_tipo_organismo){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/tipo_organismos/${id_tipo_organismo}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//editar tipo organismos
export async function EditTipoorganismos(datos, id_tipo_organismo){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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

//editar Tipo Organismos
export async function ActualizarEstadoTipoOrganismos(id_tipo_organismo, actualizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/tipo_organismos/${id_tipo_organismo}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//FUNCIONES DE TIPO DE CONVENIOS

//funcion para cambiar estado
export async function ActualizarEstadoTipoConvenios(id_tipo_convenio, actualizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/tipo_convenios/${id_tipo_convenio}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//listar tipo_convenios
export async function getTipoconvenios(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/tipo_convenios`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

// agregar Tipos convenios
export async function AddTipoconvenios(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/tipo_convenios`, Options)
    const data= await respuesta.json()
    return data
}

//listar tipos convenios por ID
export async function getTipoconveniosByID(id_tipo_convenio){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/tipo_convenios/${id_tipo_convenio}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//editar tipo convenios
export async function EditTipoconvenios(datos, id_tipo_convenio){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/tipo_convenios/${id_tipo_convenio}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}


//FINCIONES DE URUARIOS

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
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}
//FUNCIONES DE MENU
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

// editar usuarios
export async function EditUsuario(datos, id_usuario){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//esta es mi funcion es para validar el nombre
export async function ValidarNombreactividad(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validaractividad`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}


//esta es mi funcion es para validar el nombre
export async function ValidarNombreorganismo(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validarnombre`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}

//esta es mi funcion es para validar el nombre
export async function ValidarNombreconvenio(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validarconvenio`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}

//esta es mi funcion es para validar el nombre
export async function ValidarNumeroResolucion(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validarresolucion`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}

//esta es mi funcion es para validar el nombre
export async function ValidarTipoOrganismo(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validatipoorganismo`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}

//esta es mi funcion es para validar el nombre
export async function ValidarTipoConvenio(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validartipoconvenio`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}

//esta es mi funcion es para validar el nombre
export async function ValidarResponsable(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validarresponsable`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}


//esta es mi funcion es para validar el nombre
export async function ValidarUsuario(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validarusuario`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}

export async function AddUsuario(datos){
    
const Options={
method:'POST',
body: JSON.stringify(datos),
headers: {
'Content-Type': 'application/json',
            
 }
}
const respuesta = await fetch(`${URL}/usuarios`, Options)
const data= await respuesta.json()
return data
}


//ROLES

//lista
export async function getRoles(){
    
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
           
        }
    }
    const respuesta = await fetch(`${URL}/roles`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}


// agregar 
export async function AddRoles(datos){
  
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
         
        }
    }
    const respuesta = await fetch(`${URL}/roles`, Options)
    const data= await respuesta.json()
    return data
}

export async function getRolesByID(id_rol){
    
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            
        }
    }
    const respuesta = await fetch(`${URL}/roles/${id_rol}`, Options)
    const data= await respuesta.json();
    return data[0];
}


export async function EditRoles(datos, id_rol){
    
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            
        }
    }
    const respuesta = await fetch(`${URL}/roles/${id_rol}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}


export async function deleteRoles(id_rol){
    
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            
        }
    }
    const respuesta = await fetch(`${URL}/roles/${id_rol}`, Options)
    const data= await respuesta.json()
    console.log(data)
    return data
}

//esta es mi funcion es para validar el nombre
export async function ValidarDni(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validaradni`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}




