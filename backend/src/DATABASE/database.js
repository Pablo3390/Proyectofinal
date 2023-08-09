const mysql = require('mysql');

const mysqlConeccion= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'proyectofinal'
});

mysqlConeccion.connect(function(err){
    if(err){
        console.log('Mi error de conexion es: ', err)
        return;
    }else{
        console.log('La coneccion se realizo correctamente!!')
    }
})

module.exports=mysqlConeccion;