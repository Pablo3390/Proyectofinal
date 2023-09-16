const express = require('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

//Lista de convenios

router.get('/convenio', (req , res)=>{
  mysqlConect.query('SELECT * FROM convenio', (error, registros)=>{
      if(error){
          console.log('Error en la base de datos', error)
      }else{
          res.json(registros)
      }
  })
})

// Endpoint para crear un nuevo convenio

router.post('/convenio', bodyParser.json(), (req , res)=>{
  
  const { nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, estado, id_resolucion, id_organismo, id_tipo_convenio  }  = req.body
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
          mensaje: "El organismo es un campo obligatorio"
      })
  }
  if(!id_tipo_convenio){
      res.json({
          status:false,
          mensaje: "El tipo de convenio es un campo obligatorio"
      })
  }
  mysqlConect.query('INSERT INTO convenio (nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, estado, id_resolucion, id_organismo, id_tipo_convenio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, estado, id_resolucion, id_organismo, id_tipo_convenio ], (error, registros)=>{
      if(error){
          console.log('Error en la base de datos', error)
      }else{
      res.json({
          status:true,
          mensaje: "El registro se grabo correctamente"
      })
      }
  })
})

// traer los  datos del convenio por el ID

router.get('/convenio/:id_convenio', (req , res)=>{
    
  const { id_convenio } = req.params
  console.log('entra aqui', id_convenio)
  mysqlConect.query('SELECT * FROM convenio WHERE id_convenio=?', [id_convenio], (error, registros)=>{
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
})

//Metodo UPDATE
//Borrado logico por id

router.put('/convenio/:id_convenio',bodyParser.json(), (req,res)=>{ 
    const {id_convenio}= req.params
    const {nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_resolucion, id_organismo, id_tipo_convenio }=req.body

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

    mysqlConect.query('SELECT * FROM convenio WHERE id_convenio=?;', [id_convenio], (error, registro) =>{
        if(error){
            console.log("Error en la base de datos", error)
        
        }else{
            if(registro.length>0){
                mysqlConect.query('UPDATE convenio SET nombre=?, utilidad=?, objeto=?, fecha_inicio=?, fecha_fin=?, clausula_peas=?, id_resolucion=?, id_organismo=?, id_tipo_convenio=? WHERE id_convenio = ?', [nombre, utilidad, objeto, fecha_inicio, fecha_fin, clausula_peas, id_resolucion, id_organismo, id_tipo_convenio, id_convenio], (error, registro) =>{
                    
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
    })


// Metodo DELETE
//Borrado logico por id

router.delete('/convenio/:id_convenio', bodyParser.json(), (req , res)=>{
  const { id_convenio } = req.params
  mysqlConect.query('SELECT * FROM convenio WHERE id_convenio=?', [id_convenio], (error, registros)=>{
      if(error){
          console.log('Error en la base de datos', error)
      }else{
          if(registros.length>0){
              mysqlConect.query('UPDATE convenio SET estado = "B"  WHERE id_convenio = ?', [id_convenio], (error, registros)=>{
                  if(error){
                      console.log('Error en la base de datos', error)
                  }else{
                      res.json({
                          status:true,
                          mensaje:"El registro " +id_convenio+ " se dio de baja correctamente" 
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
})


module.exports= router; 