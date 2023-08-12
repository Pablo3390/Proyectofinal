const express = require('express');
const router = express()
const mysqlConect = require('../database/database');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt')

router.get('/', (req,res)=>{
    res.send('El sistema es funcionando')
})
 
router.post('/registro',bodyParser.json(), (req,res)=>{
    console.log(req.body)
    const {apellido, nombre, dni, user, pass, correo, id_rol} =req.body
    let hash= bcrypt.hashSync(pass, 10)

    mysqlConect.query('insert into usuarios (apellido, nombre, dni, user, pass, correo, id_rol) values (?,?,?,?,?,?,?)', [apellido, nombre, dni, user, hash, correo, id_rol], (error, result)=>{
        if(error){
            console.log('Error  ', error)
        }else{
            res.json({
                status:true,
                mensaje: "El registro se grabo correctamente"
            })
        }
    })
    

})

router.post('/login', (req,res)=>{
    res.send('Esto es el login')
})


module.exports= router;