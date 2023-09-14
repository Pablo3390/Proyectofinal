const express=require('express');
const app = express();
const morgan = require('morgan')

app.set('puerto', 1990);

app.use(morgan('dev'))

app.use(require('./routes/routes'));
app.use(require('./ROUTES/routesOrganismo'))

app.listen(app.get('puerto'), ()=>{
    console.log('Servidor ON en el puerto ', app.get('puerto'))
})
/* const puerto= 1990;

app.use(require('./routes/routes'))


app.listen(puerto,()=>{
    console.log('server ON')
}) */