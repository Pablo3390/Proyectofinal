const express = require ('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser')

//Lista de tipo_convenio

router.get('/tipo_convenio', (req, res)=>{
    mysqlConect.query('select * from tipo_convenio', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})

//Lista de tipo_convenio por ID

router.get('/tipo_convenio/:id_tipo_convenio', (req, res)=>{
    const {id_tipo_convenio}=req.params 
    mysqlConect.query('SELECT * FROM tipo_convenio WHERE id_tipo_convenio=?', [id_tipo_convenio], (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})

// Endpoint para crear un nuevo tipo_convenio

router.post('/tipo_convenio',bodyParser.json(), (req,res)=>{ 
    const {nombre, tipo_conveniocol}=req.body
if(!nombre){
    res.json({
        status: false,
        mensaje: "el nombre del tipo de itipo_convenio es un dato obligatorio"
    })
}
    mysqlConect.query('INSERT INTO tipo_convenio (`nombre`, `tipo_conveniocol`) VALUES (?, ?);', [nombre, tipo_conveniocol], (error, registro) =>{
        if(error){ 
                    console.log("Error en la base de datos", error)
        }else{ 
                    res.send ('El registro se realizó correctamente')
        }
     })
    })
    
//Modificar por metodo PUT

router.put('/tipo_convenio/:id_tipo_convenio',bodyParser.json(), (req,res)=>{ 
    const {id_tipo_convenio}= req.params
    const {nombre, tipo_conveniocol}=req.body
    
if(!nombre){
    res.json({
        status: false,
        mensaje: "el nombre del tipo de convenio es un dato obligatorio"
    })
   }
        mysqlConect.query('SELECT * FROM tipo_convenio WHERE id_tipo_convenio=?;', [id_tipo_convenio], (error, registro) =>{
            if(error){
                console.log("Error en la base de datos", error)
            
            }else{ 
                if(registro.length>0){
                    mysqlConect.query('UPDATE tipo_convenio SET nombre=?, tipo_conveniocol=? WHERE id_tipo_convenio = ?', [nombre, tipo_conveniocol, id_tipo_convenio], (error, registro) =>{
                        
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
                    mensaje: "El id del itipo de convenio no existe"
                })
            }   
            }
        })
        })


//Borrado logico por DELETE

router.delete('/tipo_convenio/:id_tipo_convenio',bodyParser.json(), (req,res)=>{ 
    const {id_tipo_convenio}= req.params

    
    mysqlConect.query('SELECT * FROM tipo_convenio WHERE id_tipo_convenio=?;', [id_tipo_convenio], (error, registro) =>{
        if(error){ 
            console.log("Error en la base de datos", error)
        
        }else{
            if(registro.length>0){
                mysqlConect.query('UPDATE tipo_convenio SET estado = "B" WHERE id_tipo_convenio = ?;', [id_tipo_convenio], (error, registro) =>{
                    if(error){
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: 'El registro '+id_tipo_convenio+ ' se dió de BAJA correctamente'
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
    })


module.exports = router