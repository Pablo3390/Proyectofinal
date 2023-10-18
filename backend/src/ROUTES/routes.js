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
                mysqlconect.query('INSERT INTO usuarios (apellido, nombre, dni, user, pass, correo, id_rol ) VALUES (?,?,?,?,?,?,2)', [apellido, nombre, dni, user, hash, correo, id_rol ], (error, registros)=>{
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

//ruta menu


router.get('/menu/:id_rol',verificaToken, (req , res)=>{
    const { id_rol } = req.params;
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
        }else{
            mysqlconect.query('SELECT * FROM menu WHERE id_rol=?', [id_rol], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json({ 
                        status:true,
                        menu:registros 
                    })
                }
            })
        }
    })
})

router.post('/menu_permisos/',verificaToken, bodyParser.json() , (req , res)=>{
    const { id_rol, menu } = req.body;
   
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlconect.query('SELECT * FROM menu WHERE id_rol=? AND href=?', [id_rol, menu], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    if(registros.length>0){
                        res.json({
                            status:true
                        })
                    }else{
                        res.json({
                            status:false
                        })
                    }
                    
                }
            })
        }
    })
})

//ruta login con comparacion de datos con booleano

router.post('/login', bodyParser.json(), (req,res)=>{
    const { user, pass } =req.body
    if(!user){
        res.json({
            status:false,
            mensaje:"El usuario es un dato obligatorio para el login" 
        })
         return; 
    }
    if(!pass){
        res.json({
            status:false,
            mensaje:"El password es un dato obligatorio para el login" 
        }) 
        return;
    }

    mysqlconect.query('SELECT * FROM usuarios WHERE user=?', [user], (error, usuario)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            if(usuario.length>0){
                console.log('estado de la comparacion', usuario[0].pass)
                 const comparacion= bcrypt.compareSync(pass, usuario[0].pass)   
                 console.log('estado de la comparacion', comparacion)
                 if(comparacion)  {

                    // vamos a generar el token
                    jwt.sign({usuario}, 'silicon', (error, token)=>{

                        res.json({
                            status: true,
                            datos: usuario,
                            token: token
                        }) 
                    })

                    
                 }else{
                    res.json({
                        status:false,
                        mensaje:"La contraseña es incorrecta" 
                    }) 
                 }
            }else{
                res.json({
                    status:false,
                    mensaje:"El usuario NO EXISTE" 
                }) 
            }
        }
    })
})

router.get('/usuarios', verificaToken,(req , res)=>{
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlconect.query('SELECT u.id_usuario, u.nombre, u.apellido, u.dni, u.user, u.correo, r.nombre rol, u.estado FROM usuarios AS u INNER JOIN roles AS r ON r.id_rol=u.id_rol ', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
});

router.get('/usuarios/:id_usuario', (req , res)=>{
    const { id_usuario } = req.params
    mysqlconect.query('SELECT * FROM usuarios WHERE id_usuario=?', [id_usuario], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})


// router.get('/usuarios/:id_usuario', verificaToken , (req,res)=>{
//     const{id_usuario}=req.params
//     jwt.verify(req.token, 'silicon' , (error, valido)=>{
//     if(!error){
//         mysqlconect.query('select * from usuarios where id_usuario=?', [id_usuario], (error, registros)=>{
//             if(error){
//                 console.log('Error en base de datos ', error)
//             }else{
//                 if(registros.length>0){
//                     res.json({
//                         status:true,
//                         datos: registros
//                     })
//                 }else{
//                     res.json({
//                         status:false,
//                         mensaje: "El parametro es inexistente"
//                     })
//                 }
               
//             }
//         })
//     }

//     })
   
// })
router.post('/validarnick', bodyParser.json() , (req , res)=>{
    const { user } = req.body;
    console.log(user)
            mysqlconect.query('SELECT * FROM usuarios WHERE user=?', [user], (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{

                    if(registros.length>0){
                        res.json({
                            status:true,
                            mensaje:"El nombre de usuario ya existe" 
                        })
                    }else{
                        res.json({
                            status:false,
                           
                        })
                    }
                }
            })
       
})

router.put('/resetpass/:id_usuario', bodyParser.json(), (req , res)=>{

    let newPass= bcrypt.hashSync('admin', 10);
    const { id_usuario } = req.params
    mysqlconect.query('UPDATE usuarios SET pass = ?  WHERE id_usuario = ?', [newPass, id_usuario], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
        res.json({
            status:true,
            mensaje: "El blanqueó de clave se realizó correctamente"
            })
       }
   })
})

router.delete('/usuarios/:id_usuario', bodyParser.json(), (req , res)=>{
    const { actualizar }  = req.body
    const { id_usuario } = req.params
    mysqlconect.query('UPDATE usuarios SET estado = ?  WHERE id_usuario = ?', [actualizar, id_usuario], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json({
                status:true,
                mensaje: "El cambio de estado se realizo correctamente"
                })
        }
    })
})

//Verificacion de tokens

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

module.exports= router; 