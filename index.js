/* const http = require('http');

const server = http.createServer((req, res)=>{
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(3000, ()=>{
    console.log('Server on port 3000');
}); */

const express = require('express');
const morgan = require('morgan');
const app = express();

//Settings
app.set('AppName', 'Express Tutorial');
app.set('port', 3000);
// EJS no se requiere por que express se integra con el
app.set('view engine', 'ejs');

// Middlewares 
//manejador de peticion se puede ejecutar antes de que llege a su ruta original, 
// funciona para cualquier ruta, se usa para procesar algo antes de llegar a la ruta

/* Ejemplo de Middlewares 
function Logger(req, res, next) {
    console.log(`Route Received ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
} 
app.use(Logger);
*/

// La app entiende json
app.use(express.json());

app.use(morgan('dev'));


//Para todas las rutas /user pasaran por aqui primero, con next hacemos que continue el camino
/* app.all('/user',(req, res, next)=>{
    console.log('Por aqui paso');
    next();
}); */

//Routes

app.get('/',(req, res)=>{
    const data = [{name: 'Miguel'},{name: 'Bryan'},{name: 'Elliott'}];
    res.render('index.ejs', {people: data});
});

app.get('/user', (req, res)=>{
    res.json({
        username: 'Cameron',
        lastname: 'Cortes'
    });
});

app.post('/user/:id', (req, res)=>{
    console.log(req.body);
    console.log(req.params);
    res.send('POST REQUEST RECEIVED');
});

app.delete('/user/:user_id', (req, res)=>{
    res.send(`User ${req.params.user_id} Deleted`);
});

app.put('/user/:user_id', (req, res)=>{
    console.log(req.body);
    res.send(`User ${req.params.user_id} Updated`);
});

app.post('/about', (req, res)=>{
    res.send('POST REQUEST RECEIVED');
});

app.put('/contact', (req, res)=>{
    
    res.send('UPDATE REQUEST RECEIVED');
});

app.delete('/test', (req, res)=>{
    res.send('<h1>DELETE REQUEST RECEIVED</h1>');
});

// Ruta publica statica que se puede acceder desde el navegador a todos los archivos o carpetas dentro
app.use(express.static('public'));

app.listen(app.get('port'), ()=>{
    console.log(app.get('AppName'));
    console.log('Server on port ', app.get('port'));
});