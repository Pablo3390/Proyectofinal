const express = require ('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser')


//LISTADO TABLA RESOLUCION
//METODO: GET
//URL: /resolucion
//Paramatro: no hay

router.get('/resolucion', (req, res)=>{
    mysqlConect.query('select * from resolucion', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})

//LISTADO TABLA RESOLUCION CON ID 
//METODO: GET
//URL: /resolucion/:id_resolucion
//Paramatro: id_resolucion

router.get('/resolucion:id_resolucion', (req, res)=>{
    const {id_resolucion}=req.params 
    mysqlConect.query('SELECT * FROM resolucion WHERE id_resolucion=?', [id_resolucion], (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})


//INSERTAR DATOS
//METODO: POST
//URL: /resolucion
//PARAMETROS: nombre, año

router.post('/resolucion',bodyParser.json(), (req,res)=>{ 
    const {numero, ano}=req.body

//datos obligatorios
if(!numero){
    res.json({
        status: false,
        mensaje: "el número de la resolución es un dato obligatorio"
    })
}

if(!ano){
    res.json({
        status: false,
        mensaje: "el año de la resolución es un dato obligatorio"
    })
}


//si lo datos están completos, entonces:
    mysqlConect.query('INSERT INTO resolucion (`numero`, `ano` ) VALUES (?, ?);', [numero, ano], (error, registro) =>{
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
    })


//MODIFICAR/UPDATE UNA RESOLUCION ESPECIFICA
//Metodo PUT
//URL: /resolucion/:id_resolucion
//Parametros: id_resolucion, nombre,año
router.put('/resolucion/:id_resolucion',bodyParser.json(), (req,res)=>{ 
    const {id_resolucion}= req.params
    const {numero, ano}=req.body

    if(!numero){
        res.json({
            status: false,
            mensaje: "el número de la resolución es un dato obligatorio"
        })
    }
    
    if(!ano){
        res.json({
            status: false,
            mensaje: "el año de la resolución es un dato obligatorio"
        })
    }
    

    //Si los demas datos están cargados correctamente, entonces:
    mysqlConect.query('SELECT * FROM resolucion WHERE id_resolucion=?;', [id_resolucion], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente:
            if(registro.length>0){
                mysqlConect.query('UPDATE resolucion SET numero=?, ano=? WHERE id_resolucion = ?', [numero, ano, id_resolucion], (error, registro) =>{
                    
                    if(error){ // si hay un error entra acá
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: 'El registro '+id_resolucion+ ' se editó correctamente'
                        })
                                
                    }
                 })

            }else{
            res.json({
                status:false,
                mensaje: "El id de la  resolucion no existe"
            })
        }   
        }
    })
    })


 //BORRADO FISICO
 //Metodo: DELETE
 //URL: /resolucion/:id_resolucion
 //Parametros: id_resolucion


router.delete('/resolucion/:id_resolucion',bodyParser.json(), (req,res)=>{ 
    const {id_resolucion}= req.params
    mysqlConect.query('DELETE FROM resolucion WHERE id_resolucion = ?', [id_resolucion], (error, registro) =>{
        if(error){ // si hay un error entra acá
                    console.log("Error en la base de datos", error)
        }else{ 
                    res.send ('La eliminación del registro '+id_resolucion+ ' se realizó correctamente')
        }
     })
    })




module.exports = router