if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();//esto hace que mi programa pueda leer las variables de entorno
}

const app = require('./app');

app.listen(app.get('port'), () => {//aquí obtenemos el puerto de la app, y le colocamos una función por parámetro
    console.log('Server on port', app.get('port'));//por consola mandamos el número del puerto
    console.log('Environment: ', process.env.NODE_ENV);
})