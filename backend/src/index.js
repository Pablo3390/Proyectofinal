const express=require('express');
const app = express();
const morgan = require('morgan')

app.set('puerto', 1990);

app.use(morgan('dev'))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(require('./ROUTES/routes'));
app.use(require('./ROUTES/routesActividades'));
app.use(require('./ROUTES/routesOrganismos'));
app.use(require('./routes/routesConvenios'));
app.use(require('./routes/routesTipoConvenios'));
app.use(require('./ROUTES/routesTipoOrganismos'));
app.use(require('./ROUTES/routesResolucion'));
app.use(require('./ROUTES/routesResponsable'));


app.listen(app.get('puerto'), ()=>{
    console.log('Servidor ON en el puerto ', app.get('puerto'))
})
/* const puerto= 1990;

app.use(require('./routes/routes'))


app.listen(puerto,()=>{
    console.log('server ON')
}) */

