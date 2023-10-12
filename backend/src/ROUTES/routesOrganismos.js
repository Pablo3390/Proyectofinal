const express = require ('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser')
const jwt= require('jsonwebtoken')


//LISTADO TABLA ORGANISMO
//METODO: GET
//URL: /organismo
//Paramatro: no hay

router.get('/organismos',verificaToken,(req, res)=>{
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    mysqlConect.query('SELECT o.id_organismo, o.nombre, t. nombre tipo_organismos, o.estado  FROM organismos AS o LEFT JOIN tipo_organismos AS t ON t.id_tipo_organismo=o.id_tipo_organismo', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
    }
  })
})

//LISTADO TABLA ORGANISMO CON ID 
//METODO: GET
//URL: /organismo/:id_organismo
//Paramatro: id_organismo

router.get('/organismos/:id_organismo', verificaToken, (req, res)=>{
    const {id_organismo}=req.params 
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    mysqlConect.query('SELECT * FROM organismos WHERE id_organismo=?', [id_organismo], (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
    }
  })
})

//LISTADO TABLA ORGANISMO con tabla TIPO ORGANISMO
//METODO: GET
//URL: /organismo_tiporg
//Paramatro: no hay

router.get('/organismos_tiporg', verificaToken, (req, res)=>{
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    mysqlConect.query('SELECT o.id_organismo, o.nombre Organismos, torg.id_tipo_organismo, torg.nombre Tipo_Organismo FROM gestiondeconvenio.organismos AS o INNER JOIN gestiondeconvenio.tipo_organismo AS torg', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
    }
  })
})


//INSRTAR DATOS
//METODO: POST
//URL: /organismo
//PARAMETROS: nombre, id_tipo_organismo

router.post('/organismos',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {nombre, id_tipo_organismo}=req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
//datos obligatorios
if(!nombre){
    res.json({
        status: false,
        mensaje: "el nombre del organismo es un dato obligatorio"
    })
}

if(!id_tipo_organismo){
    res.json({
        status: false,
        mensaje: "el id_tipo_organismo es un dato obligatorio"
    })
}

//si lo datos están completos, entonces:
    mysqlConect.query('INSERT INTO organismos (`nombre`, `id_tipo_organismo`) VALUES (?, ?);', [nombre, id_tipo_organismo], (error, registro) =>{
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
//URL: /organismo/:id_organismo
//Parametros: id_organismo, nombre, id_tipo_organismo
router.put('/organismos/:id_organismo',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {id_organismo}= req.params
    const {nombre, id_tipo_organismo}=req.body
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
    
    if(!id_tipo_organismo){
        res.json({
            status: false,
            mensaje: "el id_tipo_organismo es un dato obligatorio"
        })
    }

    //Si los demas datos están cargados correctamente, entonces:
    mysqlConect.query('SELECT * FROM organismos WHERE id_organismo=?;', [id_organismo], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente:
            if(registro.length>0){
                mysqlConect.query('UPDATE organismos SET nombre=?, id_tipo_organismo=? WHERE id_organismo = ?', [nombre, id_tipo_organismo, id_organismo], (error, registro) =>{
                    
                    if(error){ // si hay un error entra acá
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: 'El registro '+id_organismo+ ' se editó correctamente'
                        })
                                
                    }
                 })

            }else{
            res.json({
                status:false,
                mensaje: "El id del organismo no existe"
            })
        }   
        }
    })
     }
    })  
})


 //BORRADO LÓGICO
 //Metodo: DELETE
 //URL: /organismo/:id_organismo
 //Parametros: id_organismo

router.delete('/organismos/:id_organismo',bodyParser.json(), verificaToken, (req,res)=>{ 
    const {id_organismo}= req.params
    const {actualizar} = req.body
    jwt.verify(req.token, 'silicon', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    
    mysqlConect.query('SELECT * FROM organismos WHERE id_organismo=?;', [id_organismo], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente
            if(registro.length>0){
                mysqlConect.query('UPDATE organismos SET estado = ? WHERE id_organismo = ?;', [actualizar, id_organismo], (error, registro) =>{
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
                mensaje: "El id del organismo no existe"
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


//BORRADO FISICO
 //Metodo: DELETE
 //Parametros: id_organismo
/*router.delete('/organismo/:id_organismo',bodyParser.json(), (req,res)=>{ 
    const {id_organismo}= req.params
    mysqlConect.query('DELETE FROM organismo WHERE id_organismo = ?', [id_organismo], (error, registro) =>{
        if(error){ // si hay un error entra acá
                    console.log("Error en la base de datos", error)
        }else{ 
                    res.send ('La eliminación del registro '+id_organismo+ ' se realizó correctamente')
        }
     })
    })*/



module.exports = router