const express = require ('express');
const router = express();
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser')

//SE DEBE MODIFICAR EN BASE DE DATOS EL DNI_RESPONSABLE PORQUE APARECE COMO AUTOINCREMENTAL


//LISTADO TABLA RESPONSABLE
//METODO: GET
//URL: /responsable
//Paramatro: no hay

router.get('/responsable', (req, res)=>{
    mysqlConect.query('select * from responsable', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})

//LISTADO TABLA RESPONSABLE CON ID 
//METODO: GET
//URL: /responsable/:id_organismo
//Paramatro: id_organismo

router.get('/responsable/:id_responsable', (req, res)=>{
    const {id_responsable}=req.params 
    mysqlConect.query('SELECT * FROM responsable WHERE id_responsable=?', [id_responsable], (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})

//LISTADO TABLA RESPONSABLE con tabla ORGANISMO
//METODO: GET
//URL: /responsable_org
//Paramatro: no

router.get('/responsable_org', (req, res)=>{
    mysqlConect.query('SELECT r.dni_responsable, r.nombre Nombre_Responsable, o.nombre Organismo FROM responsable AS r INNER JOIN organismo AS o ON r.id_organismo=o.id_organismo', (error, registro)=>{
        if(error){
            console.log('Hay un error en la base de datos', error)
        }else{
            res.json(registro)
        }
    })
})


//INSERTAR DATOS
//METODO: POST
//URL: /responsable
//PARAMETROS: nombre, id_organismo

router.post('/responsable',bodyParser.json(), (req,res)=>{ 
    const {nombre, id_organismo}=req.body

//datos obligatorios
if(!nombre){
    res.json({
        status: false,
        mensaje: "el nombre del responsable es un dato obligatorio"
    })
}

if(!id_organismo){
    res.json({
        status: false,
        mensaje: "el id_organismo es un dato obligatorio"
    })
}

//si lo datos están completos, entonces:
    mysqlConect.query('INSERT INTO responsable (`nombre`, `id_organismo`) VALUES (?, ?);', [nombre, id_organismo], (error, registro) =>{
        if(error){ // si hay un error entra acá
                    console.log("Error en la base de datos", error)
        }else{ 
                    res.send ('El registro se realizó correctamente')
        }
     })
    })


//MODIFICAR/UPDATE UN RESPONSABLE ESPECIFICO
//Metodo PUT
//URL: /responsable/:id_responsable
//Parametros: id_organismo, nombre, id_responsable
router.put('/responsable/:id_responsable',bodyParser.json(), (req,res)=>{ 
    const {id_responsable}= req.params
    const {nombre, id_organismo}=req.body

    if(!nombre){
        res.json({
            status: false,
            mensaje: "el nombre del responsable es un dato obligatorio"
        })
    }
    
    if(!id_organismo){
        res.json({
            status: false,
            mensaje: "el id_organismo es un dato obligatorio"
        })
    }

    //Si los demas datos están cargados correctamente, entonces:
    mysqlConect.query('SELECT * FROM responsable WHERE id_responsable=?;', [id_responsable], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente:
            if(registro.length>0){
                mysqlConect.query('UPDATE responsable SET nombre=?, id_organismo=? WHERE id_responsable = ?', [nombre, id_organismo, id_responsable], (error, registro) =>{
                    
                    if(error){ // si hay un error entra acá
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: 'El registro '+id_responsable+ ' se editó correctamente'
                        })
                                
                    }
                 })

            }else{
            res.json({
                status:false,
                mensaje: "El dni del responsable no existe"
            })
        }   
        }
    })
    })


 //BORRADO LÓGICO
 //Metodo: DELETE
 //URL: /responsable/:id_responsable
 //Parametros: id_responsable

router.delete('/responsable/:id_responsable',bodyParser.json(), (req,res)=>{ 
    const {id_responsable}= req.params

    
    mysqlConect.query('SELECT * FROM responsable WHERE id_responsable=?;', [id_responsable], (error, registro) =>{
        if(error){ // si hay un error entra acá
            console.log("Error en la base de datos", error)
        
        }else{ // si no hay error que me devuelve lo siguiente
            if(registro.length>0){
                mysqlConect.query('UPDATE responsable SET estado = "B" WHERE id_responsable = ?;', [id_responsable], (error, registro) =>{
                    if(error){ // si hay un error entra acá
                                console.log("Error en la base de datos", error)
                    }else{ 
                        res.json({
                            status: true,
                            mensaje: 'El registro '+id_responsable+ ' se dió de BAJA correctamente'
                        })
                                
                    }
                 })

            }else{
                res.json({
                status:false,
                mensaje: "El dni del responsable no existe"
            })
        }   
        }
    })
    })





module.exports = router