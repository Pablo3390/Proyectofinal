const express = require ('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser')
const jwt= require('jsonwebtoken')


//LISTADO TABLA TIPO ORGANISMO
//METODO: GET
//URL: /tipo_organismo
//Paramatro: no hay

router.get('/tipo_organismos', verificaToken, (req, res)=>{
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    mysqlConect.query('select * from tipo_organismos', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
   }
  })
})

//LISTADO TABLA TIPO ORGANISMO CON ID 
//METODO: GET
//URL: /tipo_organismo/:id_tipo_organismo
//Paramatro: id_tipo_organismo

router.get('/tipo_organismos/:id_tipo_organismo', verificaToken, (req, res)=>{
    const {id_tipo_organismo}=req.params 
    mysqlConect.query('SELECT * FROM tipo_organismos WHERE id_tipo_organismo=?', [id_tipo_organismo], (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})


//INSRTAR DATOS
//METODO: POST
//URL: /tipo_organismo
//PARAMETROS: nombre

router.post('/tipo_organismos',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {nombre}=req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
//datos obligatorios
if(!nombre){
    res.json({
        status: false,
        mensaje: "el nombre del tipo_organismo es un dato obligatorio"
    })
}


//si lo datos están completos, entonces:
    mysqlConect.query('INSERT INTO tipo_organismos (`nombre`) VALUES (?);', [nombre], (error, registro) =>{
        if(error){ // si hay un error entra acá
            res.json({
                status:false,
                mensaje: error
            })
        }else{ 
            res.json({
                status:true,
                mensaje: "El registro se grabo correctamente"
            })
        }
     })
    }
  })
 })


//MODIFICAR/UPDATE UN ORGANISMO ESPECIFICO
//Metodo PUT
//URL: /tipo_organismo/:id_tipo_organismo
//Parametros: id_tipo_organismo, nombre
router.put('/tipo_organismos/:id_tipo_organismo',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {id_tipo_organismo}= req.params
    const {nombre}=req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    if(!nombre){
        res.json({
            status: false,
            mensaje: "el nombre del organismo es un dato obligatorio"
        })
    }
    

    //Si los demas datos están cargados correctamente, entonces:
    mysqlConect.query('SELECT * FROM tipo_organismos WHERE id_tipo_organismo=?;', [id_tipo_organismo], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente:
            if(registro.length>0){
                mysqlConect.query('UPDATE tipo_organismos SET nombre=? WHERE id_tipo_organismo = ?', [nombre, id_tipo_organismo], (error, registro) =>{
                    
                    if(error){ // si hay un error entra acá
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: 'El registro '+id_tipo_organismo+ ' se editó correctamente'
                        })
                                
                    }
                 })

            }else{
            res.json({
                status:false,
                mensaje: "El id del tipo_organismo no existe"
            })
        }   
        }
    })
   }
  })
})


 //BORRADO LÓGICO
 //Metodo: DELETE
 //URL: /tipo_organismo/:id_tipo_organismo
 //Parametros: id_tipo_organismo

router.delete('/tipo_organismos/:id_tipo_organismo',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {actualizar} = req.body
    const {id_tipo_organismo}= req.params
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    
    mysqlConect.query('SELECT * FROM tipo_organismos WHERE id_tipo_organismo=?;', [id_tipo_organismo], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente
            if(registro.length>0){
                mysqlConect.query('UPDATE tipo_organismos SET estado = ? WHERE id_tipo_organismo = ?;', [actualizar, id_tipo_organismo], (error, registro) =>{
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
                mensaje: "El id del tipo_organismo no existe"
            })
        }   
        }
    })
   }
  })
 })

 router.post('/validatipoorganismo', bodyParser.json() , (req , res)=>{
    const { nombre } = req.body;
    console.log(nombre)
            mysqlConect.query('SELECT * FROM tipo_organismos WHERE nombre=?', [nombre], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{

                    if(registros.length>0){
                        res.json({
                            status:true,
                            mensaje:"El nombre de tipo de organismo ya existe" 
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