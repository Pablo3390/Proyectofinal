const express = require ('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser')
const jwt= require('jsonwebtoken')

//Lista de tipo_convenio

router.get('/tipo_convenios', verificaToken, (req, res)=>{
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    mysqlConect.query('select * from tipo_convenios', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
   }
 })
})

//Lista de tipo_convenio por ID

router.get('/tipo_convenios/:id_tipo_convenio', verificaToken, (req, res)=>{
    const {id_tipo_convenio}=req.params 
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    mysqlConect.query('SELECT * FROM tipo_convenios WHERE id_tipo_convenio=?', [id_tipo_convenio], (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
   }
 })
})

// Endpoint para crear un nuevo tipo_convenio

router.post('/tipo_convenios',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {nombre, tipo_conveniocol}=req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
if(!nombre){
    res.json({
        status: false,
        mensaje: "el nombre del tipo de tipo_convenio es un dato obligatorio"
    })
}
    mysqlConect.query('INSERT INTO tipo_convenios (`nombre`, `tipo_conveniocol`) VALUES (?, ?);', [nombre, tipo_conveniocol], (error, registro) =>{
        if(error){ 
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
    
//Modificar por metodo PUT

router.put('/tipo_convenios/:id_tipo_convenio',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {id_tipo_convenio}= req.params
    const {nombre, tipo_conveniocol}=req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
if(!nombre){
    res.json({
        status: false,
        mensaje: "el nombre del tipo de convenio es un dato obligatorio"
    })
   }
        mysqlConect.query('SELECT * FROM tipo_convenios WHERE id_tipo_convenio=?;', [id_tipo_convenio], (error, registro) =>{
            if(error){
                console.log("Error en la base de datos", error)
            
            }else{ 
                if(registro.length>0){
                    mysqlConect.query('UPDATE tipo_convenios SET nombre=?, tipo_conveniocol=? WHERE id_tipo_convenio = ?', [nombre, tipo_conveniocol, id_tipo_convenio], (error, registro) =>{
                        
                        if(error){
                                    console.log("Error en la base de datos", error)
                        }else{ 
                            res.json({
                                status: true,
                                mensaje: 'El registro '+id_tipo_convenio+ ' se editó correctamente'
                            })
                                    
                        }
                     })
    
                }else{
                res.json({
                    status:false,
                    mensaje: "El id del tipo de convenio no existe"
                })
            }   
            }
        })
       }
     })
 })


//Borrado logico por DELETE

router.delete('/tipo_convenios/:id_tipo_convenio',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {actualizar} = req.body
    const {id_tipo_convenio}= req.params
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    
    mysqlConect.query('SELECT * FROM tipo_convenios WHERE id_tipo_convenio=?;', [id_tipo_convenio], (error, registro) =>{
        if(error){ 
            console.log("Error en la base de datos", error)
        
        }else{
            if(registro.length>0){
                mysqlConect.query('UPDATE tipo_convenios SET estado = ? WHERE id_tipo_convenio = ?;', [actualizar, id_tipo_convenio], (error, registro) =>{
                    if(error){
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: "El cambio del estado se realizó correctamente "
                        })
                                
                    }
                 })

            }else{
                res.json({
                status:false,
                mensaje: "El id del tipo de convenio no existe"
            })
        }   
        }
     })
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