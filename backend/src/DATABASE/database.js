const mysql = require('mysql');

const mysqlConect= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'gestiondeconvenios'
})

mysqlConect.connect(function(error){
    if(error){
        console.log('Hay un error', error)
        return;
    }else{
        console.log('Se conecto a la base de datos')
    }
})

//holis, soy agus
//holis, soy martin

module.exports= mysqlConect;