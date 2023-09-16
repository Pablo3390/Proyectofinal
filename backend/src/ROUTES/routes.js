const express = require('express');
const router = express()
const mysqlconect = require('../database/database');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

//listar modelos
router.get('/', (req,res)=>{
    res.send('El sistema es funcionando')
})

//ruta del registro de usuarios

router.post('/registro', bodyParser.json() , (req , res)=>{
    const {apellido, nombre , dni, user, pass, correo, id_rol} =req.body;
   
    let hash= bcrypt.hashSync(pass, 10);

    if(!dni){
        res.json({
            status:false,
            mensaje: "El DNI es un campo obligatorio"
        })
    }

    mysqlconect.query('SELECT * FROM usuarios WHERE user=?', [user], (error, usuarios)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            if(usuarios.length>0){
                res.json({
                    status:false,
                    mensaje:"El nombre de usuario ya existe" 
                })
            }else{
                mysqlconect.query('INSERT INTO usuarios (apellido, nombre, dni, user, pass, correo, id_rol ) VALUES (?,?,?,?,?,?,?)', [apellido, nombre, dni, user, hash, correo, id_rol ], (error, registros)=>{
                    if(error){
                        console.log('Error en la base de datos al momento de insertar ----> ', error)
                    }else{
                        res.json({
                            status:true,
                            mensaje: "El registro se grabo correctamente"
                        })
                    }
                })
            }
        }
    })
})

//ruta login con comparacion de datos con booleano

router.post('/login', bodyParser.json(), (req,res)=>{
    const { user, pass } =req.body
    mysqlconect.query('select user, pass, id_rol, concat_ws(" ", apellido, nombre) nombre_usuario from usuarios WHERE user=?', [user], (error, datos)=>{
        if(!error){
            if(datos.length>0){
                let comparacion = bcrypt.compareSync(pass, datos[0].pass)
                if(comparacion){
                    jwt.sign({datos}, 'silicon', (error, token)=>{
                        res.json({
                            status:true,
                            datos: datos[0],
                            token: token
                        })
                    })
        
                }else{
                    res.json({
                        status:false,
                        mensaje: "El password es incorrecto"
                    })
                }
                
            }else{
                res.json({
                    status:false,
                    mensaje: "No existe el usuario"
                })
            }

            
        }else{
            res.json({
                status:false,
                mensaje: error
            })
        }
    })
})

router.get('/usuarios', verificaToken , (req,res)=>{
    jwt.verify(req.token, 'silicon' , (error, valido)=>{
    if(!error){
        mysqlconect.query('select * from usuarios', (error, registros)=>{
            if(error){
                console.log('Error en base de datos ', error)
            }else{
                res.json({
                    status:true,
                    mensaje: registros
                })
            }
        })
    }else{
        res.json({
            status:false,
            mensaje: error
        })
    }
    })
   
})

router.get('/usuarios/:id_usuariio', verificaToken , (req,res)=>{
    const{id_usuario}=req.params
    jwt.verify(req.token, 'silicon' , (error, valido)=>{
    if(!error){
        mysqlconect.query('select * from usuarios where id_usuario=?', [id_usuario], (error, registros)=>{
            if(error){
                console.log('Error en base de datos ', error)
            }else{
                if(registros.length>0){
                    res.json({
                        status:true,
                        datos: registros
                    })
                }else{
                    res.json({
                        status:false,
                        mensaje: "El parametro es inexistente"
                    })
                }
               
            }
        })
    }

    })
   
})

//Verificacion de tokens

function verificaToken(req, res, next){
    const BearerHeader = req.headers['authorization']
    if(typeof BearerHeader!=='undefined'){
        const bearer =BearerHeader.split(" ")[1];
        req.token=bearer;
        next();
    }else{
        res.send('Se requiere un token')
    }
}

module.exports= router; 