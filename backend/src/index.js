const express=require('express');
const app = express()

const morgan = require ('morgan')

app.set('puerto' , 1990);

app.use(morgan('dev'))

app.listen(app.get('puerto'), ()=>{
    console.log('El servidor del proyecto final esta corriendo en el puerto', app.get('puerto'))
})