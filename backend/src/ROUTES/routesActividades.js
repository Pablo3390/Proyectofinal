const express = require ('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser')
const jwt= require('jsonwebtoken')


//LISTADO TABLA ACTIVIDAD
//METODO: GET
//URL: /actividad
//Paramatro: no hay

router.get('/actividades', verificaToken, (req, res)=>{
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConect.query('SELECT a.id_actividad, a.nombre, DATE_FORMAT(a.fecha, "%d-%m-%Y") fecha_formateada, a.lugar, a.participante, c.nombre convenio, a.estado FROM actividades AS a INNER JOIN convenios AS c ON c.id_convenio=a.id_convenio', (error, registro)=>{
                if(error){
                    console.log('Hay un error en la base de datos', error)
                }else{
                    res.json(registro)
                }
              })
        }
    
    })
});

//LISTADO TABLA ACTIVIDAD CON ID 
//METODO: GET
//URL: /actividad/:id_actividad
//Paramatro: id_actividad

router.get('/actividades/:id_actividad', verificaToken, (req, res)=>{
    const {id_actividad}=req.params 
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{

    mysqlConect.query('SELECT a. *, DATE_FORMAT(a.fecha, "%Y-%m-%d") fecha_sin_formato FROM actividades a WHERE a.id_actividad=?', [id_actividad], (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
    }
})
})

//LISTADO TABLA ACTIVIDAD con tabla CONVENIO
//METODO: GET
//URL: /actividad_convenio
//Paramatro: no

router.get('/actividades_convenio',verificaToken, (req, res)=>{
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    mysqlConect.query('SELECT a.id_actividad, a.nombre actividades, c.nombre Convenio FROM actividades as a INNER JOIN convenio AS c ON c.id_convenio=a.id_convenio', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
        }
    })
})




//INSERTAR DATOS
//METODO: POST
//URL: /actividad
//PARAMETROS: nombre, id_convenio

router.post('/actividades',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {nombre, fecha, lugar, participante, id_convenio}=req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{

//datos obligatorios
if(!nombre){
    res.json({
        status: false,
        mensaje: "el nombre de la actividad es un dato obligatorio"
    })
}

if(!id_convenio){
    res.json({
        status: false,
        mensaje: "el id_convenio es un dato obligatorio"
    })
}

//si lo datos están completos, entonces:
    mysqlConect.query('INSERT INTO actividades (`nombre`, `fecha`, `lugar`, `participante`, `id_convenio`) VALUES (?, ?, ?, ?, ?);', [nombre, fecha, lugar, participante, id_convenio], (error, registro) =>{
        if(error){ // si hay un error entra acá
                    console.log("Error en la base de datos", error)
        }else{
            res.json({
                status:true,
                mensaje: "La actividad se grabo correctamente"
            })
            }
     })
            }
    })
    })


//MODIFICAR/UPDATE UNA ACTIVIDAD ESPECIFICO
//Metodo PUT
//URL: /actividad/:id_actividad
//Parametros: id_actividad, nombre, id_convenio
router.put('/actividades/:id_actividad',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {id_actividad}= req.params
    const {nombre, fecha, lugar, participante, id_convenio}=req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{

    if(!nombre){
        res.json({
            status: false,
            mensaje: "el nombre de la actividad es un dato obligatorio"
        })
    }
    
    if(!id_convenio){
        res.json({
            status: false,
            mensaje: "el id_convenio es un dato obligatorio"
        })
    }

    //Si los demas datos están cargados correctamente, entonces:
    mysqlConect.query('SELECT * FROM actividades WHERE id_actividad=?;', [id_actividad], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente:
            if(registro.length>0){
                mysqlConect.query('UPDATE actividades SET nombre=?, fecha=?, lugar=?, participante=?, id_convenio=? WHERE id_actividad = ?', [nombre, fecha, lugar, participante, id_convenio,  id_actividad], (error, registro) =>{
                    
                    if(error){ // si hay un error entra acá
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: 'El registro '+id_actividad+ ' se editó correctamente'
                        })
                                
                    }
                 })

            }else{
            res.json({
                status:false,
                mensaje: "El id de la actividad no existe"
            })
        }   
        }
    })
        }
    })
    })


 //BORRADO LÓGICO
 //Metodo: DELETE
 //URL: /actividad/:id_actividad
 //Parametros: id_actividad

router.delete('/actividades/:id_actividad',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {id_actividad}= req.params
    const {actualizar} = req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{

    
    mysqlConect.query('SELECT * FROM actividades WHERE id_actividad=?;', [id_actividad], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente
            if(registro.length>0){
                mysqlConect.query('UPDATE actividades SET estado = ? WHERE id_actividad = ?;', [actualizar, id_actividad], (error, registro) =>{
                    if(error){ // si hay un error entra acá
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: "El cambio de estado se realizo correctamente" 
                        })
                                
                    }
                 })

            }else{
                res.json({
                status:false,
                mensaje: "El id de la actividad no existe"
            })
        }   
        }
    })
        }
    })
    })


    router.post('/validaractividad', bodyParser.json() , (req , res)=>{
        const { nombre } = req.body;
        console.log(nombre)
                mysqlConect.query('SELECT * FROM actividades WHERE nombre=?', [nombre], (error, registros)=>{
                    if(error){
                        console.log('Error en la base de datos', error)
                    }else{
    
                        if(registros.length>0){
                            res.json({
                                status:true,
                                mensaje:"El nombre del convenio ya existe" 
                            })
                        }else{
                            res.json({
                                status:false,
                               
                            })
                        }
                    }
                })
           
    })

    function verificaToken(req, res, next){
        const bearer= req.headers['authorization'];
        if(typeof bearer!=='undefined'){
            const token =bearer.split(" ")[1]
            req.token= token;
            next()
        }else{
            res.send('Debe contener un token')
        }
     }


module.exports = router