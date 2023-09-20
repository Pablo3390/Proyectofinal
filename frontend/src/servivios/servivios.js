const URL ='http://localhost:1990';

//esta es mi funcion para loguearme
export async function Login(datos){
    
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/login`, Options);
    const data= await respuesta.json();
    return data
}
