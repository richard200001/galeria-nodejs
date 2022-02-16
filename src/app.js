const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');

//inicializando servidor
const app = express();
require('./database');

//configuraciones
app.set('port', process.env.PORT || 3000);//le digo que utilice el purto 3000 de mi variable de entorno
//porque cuando lo pase a heroku el va a dar otra variable de entorno
app.set('views', path.join(__dirname, 'views'));//aquí le digo la direccion de donde va a tomar las vistas
//__dirname significa la carpeta src, y con la coma le concateno el nombre de la carpeta de vistas
app.engine('.hbs', exphbs.engine({//configuro aquí el motor de plantillas, el primer parámetro es como se va a llamar
    //el motor de plantillas, y el segundo es la función que importamos de express-handlebars
    defaultLayout: 'main', // a defaultLayout le mandamos lo que es los html que se repiten, como el nav y el footer
    layoutsDir: path.join(app.get('views'), 'layouts'),//aquí le damos la dirección de la carpeta layouts
    //app.get('views') nos da la dirección de la carpeta views, concatenamos con la coma y le colocamos el nombre de la carpeta layouts
    partialsDir: path.join(app.get('views'), 'partials'),//al igual que en la carpeta layouts, aquí damos la dirección de partials
    extname: '.hbs' //aquí agregamos el nombre de la extensión con la que se trabajan las vistas
}));
app.set('view engine', '.hbs')//aquí ya estamos utilizando nuestro motor de plantillas, es decir, ya está en función las vistas

//procesadores de información o Middlewares
app.use(morgan('dev'));//le decimos que utilice morgan y que utilice la propiedad de enviar mensajes cortos por la consola
app.use(express.json());//aquí le decimos que entienda el lenguaje json
app.use(express.urlencoded({extended: false}));//le decimos que pueda entender los datos que se pasan por el formulario html, extended: false 
//qle decimos con eso que sólo pueda entender texto
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/upload'),
    filename: (req,file,cb,filename) => {
        cb(null, new Date().getTime() + path.extname(file.originalname).toLocaleLowerCase())
    }
});
app.use(multer({storage}).single('image'));//nos ayuda a procesar la imagen que enviamos a través del formulario html

//Routes o rutas
app.use(require('./routes'));

module.exports = app;