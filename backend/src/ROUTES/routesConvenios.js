const express = require('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

//Listar de convenios

router.get('/convenios', verificaToken, (req , res)=>{
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
  mysqlConect.query('SELECT  c.id_convenio, c.nombre, c.utilidad, c.objeto, c.fecha_inicio, c.fecha_fin, c.clausula_peas, o.nombre organismos, tc.nombre tipo_convenios, r.numero resolucion, c.estado  FROM convenios AS c INNER JOIN organismos AS o ON o.id_organismo=c.id_organismo LEFT JOIN tipo_convenios AS tc ON tc.id_tipo_convenio=c.id_tipo_convenio LEFT JOIN resolucion AS r ON r.id_resolucion=c.id_resolucion', (error, registros)=>{
      if(error){
          console.log('Error en la base de datos', error)
      }else{
          res.json(registros)
      }
   })
      }
  })
})


//LISTADO TABLA CONVENIO con OTRAS TABLAS
//METODO: GET
//URL: conveniosss (CAMBIAR)
//Paramatro: no

// router.get('/convenios', (req, res)=>{
//     mysqlConect.query('SELECT c.id_convenio, c.nombre AS Convenios, o.nombre AS Organismos, tconv.nombre AS Tipo_Convenios, re.numero AS N°_Resolucion, c.objeto, c.fecha_inicio, c.fecha_fin, c.clausula_peas, c.estado FROM convenios AS c INNER JOIN organismos AS o ON c.id_organismo = o.id_organismo INNER JOIN tipo_convenios AS tconv ON c.id_tipo_convenio = tconv.id_tipo_convenio INNER JOIN resolucion AS re ON c.id_resolucion = re.id_resolucion ORDER BY c.id_convenio ASC;    ', (error, registros)=>{
//         if(error){
//             console.log('Hay un error en la base de datos', error)
//         }else{
//             res.json(registros)
//         }
//     })
// })

// Endpoint para crear un nuevo convenio

router.post('/convenios', bodyParser.json(), verificaToken, (req , res)=>{
  
  
  const { nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_resolucion, id_organismo, id_tipo_convenio  }  = req.body
  jwt.verify(req.token, 'silicon', (error, valido)=>{
    if(error){
        res.sendStatus(403);
    }else{
  if(!nombre){
      res.json({
          status:false,
          mensaje: "El nombre del convenio es un campo obligatorio"
      })
  }
  if(!id_resolucion){
      res.json({
          status:false,
          mensaje: "La resolucion del convenio es un campo obligatorio"
      })
  }
  if(!id_organismo){
      res.json({
          status:false,
          mensaje: "El id_organismo es un campo obligatorio"
      })
  }
  if(!id_tipo_convenio){
      res.json({
          status:false,
          mensaje: "El tipo de convenio es un campo obligatorio"
      })
  }
  mysqlConect.query('INSERT INTO convenios (nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_resolucion, id_organismo, id_tipo_convenio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_resolucion, id_organismo, id_tipo_convenio ], (error, registros)=>{
      if(error){
          console.log('Error en la base de datos', error)
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

// traer los  datos del convenio por el ID

router.get('/convenios/:id_convenio', verificaToken, (req , res)=>{    
  const { id_convenio } = req.params
  console.log('entra aqui', id_convenio)
  jwt.verify(req.token, 'silicon', (error, valido)=>{
    if(error){
        res.sendStatus(403);
    }else{
  mysqlConect.query('SELECT * FROM convenios WHERE id_convenio=?', [id_convenio], (error, registros)=>{
      if(error){
          res.json({
              status:false
          })
      }else{
          if(registros.length>0){
              res.json(registros)
          }else{
              res.json({
                  status:false,
                  mensaje:"El ID del convenio no existe" 
              });
          }
          
      }
  })
}
  })
})

//Metodo UPDATE
//Borrado logico por id

router.put('/convenios/:id_convenio',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {id_convenio}= req.params
    const {nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_resolucion, id_organismo, id_tipo_convenio }=req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{

    if(!nombre){
        res.json({
            status: false,
            mensaje: "el nombre del convenio es un dato obligatorio"
        })
    }
    
    if(!id_organismo){
        res.json({
            status: false,
            mensaje: "el id_organismo es un dato obligatorio"
        })
    }
    if(!id_tipo_convenio){
        res.json({
            status: false,
            mensaje: "el id_tipo_convenio es un dato obligatorio"
        })
    }

    if(!id_resolucion){
        res.json({
            status: false,
            mensaje: "el id_resolucion es un dato obligatorio"
        })
    }

    mysqlConect.query('SELECT * FROM convenios WHERE id_convenio=?;', [id_convenio], (error, registro) =>{
        if(error){
            console.log("Error en la base de datos", error)
        
        }else{
            if(registro.length>0){
                mysqlConect.query('UPDATE convenios SET nombre=?, utilidad=?, objeto=?, fecha_inicio=?, fecha_fin=?, clausula_peas=?, id_resolucion=?, id_organismo=?, id_tipo_convenio=? WHERE id_convenio=?', [nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_resolucion, id_organismo, id_tipo_convenio, id_convenio], (error, registro) =>{
                    
                    if(error){
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: 'El registro '+id_convenio+ ' se editó correctamente'
                        })
                                
                    }
                 })

            }else{
            res.json({
                status:false,
                mensaje: "El id del convenio no existe"
            })
        }   
        }
    })
        }
    })
 })


// Metodo DELETE
//Borrado logico por id

router.delete('/convenios/:id_convenio', bodyParser.json(), verificaToken, (req , res)=>{
  const {actualizar} = req.body
  const { id_convenio } = req.params
  jwt.verify(req.token, 'silicon', (error, valido)=>{
    if(error){
        res.sendStatus(403);
    }else{
  
  mysqlConect.query('SELECT * FROM convenios WHERE id_convenio=?', [id_convenio], (error, registros)=>{
      if(error){
          console.log('Error en la base de datos', error)
      }else{
          if(registros.length>0){
              mysqlConect.query('UPDATE convenios SET estado = ?  WHERE id_convenio = ?', [actualizar, id_convenio], (error, registros)=>{
                  if(error){
                      console.log('Error en la base de datos', error)
                  }else{
                      res.json({
                          status:true,
                          mensaje:"El cambio de estado se realizo correctamente" 
                      })
                  }
              })
          }else{
              res.json({
                  status:false,
                  mensaje:"El ID del convenio no existe" 
              })
          }
          
      }
  })  
    }
})
})

router.post('/validarconvenio', bodyParser.json() , (req , res)=>{
    const { nombre } = req.body;
    console.log(nombre)
            mysqlConect.query('SELECT * FROM convenios WHERE nombre=?', [nombre], (error, registros)=>{
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


module.exports= router; 