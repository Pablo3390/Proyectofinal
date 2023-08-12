const express=require('express');
const app = express()

const puerto= 1990;

app.use(require('./routes/routes'))


app.listen(puerto,()=>{
    console.log('server ON')
})