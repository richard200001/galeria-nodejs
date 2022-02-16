const {Schema, model} = require('mongoose');
//tener en cuenta que aquí no se guarda la imagen como tal, solamente se guardan los datos de la imagen
//aquí creamos el esquema de la base de datos
const Photo = new Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: String
});
//aquí empezamos a utilizar el esquema de la base de datos
module.exports = model('Photo', Photo);//el primer parámetro es el nombre del esquema, el segundo
//es la constante del esquema de la base de datos