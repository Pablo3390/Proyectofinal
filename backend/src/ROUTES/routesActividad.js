const express = require ('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser')


//LISTADO TABLA ACTIVIDAD
//METODO: GET
//URL: /actividad
//Paramatro: no hay

router.get('/actividad', (req, res)=>{
    mysqlConect.query('select * from actividad', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})

//LISTADO TABLA ACTIVIDAD CON ID 
//METODO: GET
//URL: /actividad/:id_actividad
//Paramatro: id_actividad

router.get('/actividad/:id_actividad', (req, res)=>{
    const {id_actividad}=req.params 
    mysqlConect.query('SELECT * FROM actividad WHERE id_actividad=?', [id_actividad], (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})

//LISTADO TABLA ACTIVIDAD con tabla CONVENIO
//METODO: GET
//URL: /actividad_convenio
//Paramatro: no

router.get('/actividad_convenio', (req, res)=>{
    mysqlConect.query('SELECT a.id_actividad, a.nombre Actividad, c.nombre Convenio FROM gestiondeconvenio.actividad as a INNER JOIN gestiondeconvenio.convenio AS c ON c.id_convenio=a.id_convenio', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})




//INSERTAR DATOS
//METODO: POST
//URL: /actividad
//PARAMETROS: nombre, id_convenio

router.post('/actividad',bodyParser.json(), (req,res)=>{ 
    const {nombre, id_convenio}=req.body

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
    mysqlConect.query('INSERT INTO actividad (`nombre`, `id_convenio`) VALUES (?, ?);', [nombre, id_convenio], (error, registro) =>{
        if(error){ // si hay un error entra acá
                    console.log("Error en la base de datos", error)
        }else{ 
                    res.send ('El registro se realizó correctamente')
        }
     })
    })


//MODIFICAR/UPDATE UNA ACTIVIDAD ESPECIFICO
//Metodo PUT
//URL: /actividad/:id_actividad
//Parametros: id_actividad, nombre, id_convenio
router.put('/actividad/:id_actividad',bodyParser.json(), (req,res)=>{ 
    const {id_actividad}= req.params
    const {nombre, id_convenio}=req.body

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
    mysqlConect.query('SELECT * FROM actividad WHERE id_actividad=?;', [id_actividad], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente:
            if(registro.length>0){
                mysqlConect.query('UPDATE actividad SET nombre=?, id_convenio=? WHERE id_actividad = ?', [nombre, id_convenio, id_actividad], (error, registro) =>{
                    
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
    })


 //BORRADO LÓGICO
 //Metodo: DELETE
 //URL: /actividad/:id_actividad
 //Parametros: id_actividad

router.delete('/actividad/:id_actividad',bodyParser.json(), (req,res)=>{ 
    const {id_actividad}= req.params

    
    mysqlConect.query('SELECT * FROM actividad WHERE id_actividad=?;', [id_actividad], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente
            if(registro.length>0){
                mysqlConect.query('UPDATE actividad SET estado = "B" WHERE id_actividad = ?;', [id_actividad], (error, registro) =>{
                    if(error){ // si hay un error entra acá
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: 'El registro '+id_actividad+ ' se dió de BAJA correctamente'
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
    })



module.exports = router