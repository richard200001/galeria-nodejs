const {Router} = require('express');
const res = require('express/lib/response');
const router = Router();
const path = require('path');
const Photo = require('../models/Photo');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');//este módulo prmite eliminar, crear o modificar un archivo

router.get('/', async (req, res) => {
  const photos = await Photo.find().lean();
  //console.log(photos);
 await res.render('images', {photos});
});

router.get('/images/add', async (req, res) => {
  const photos = await Photo.find().lean();
  res.render('image_form',{photos});
});

//router.post('/images/add', async (req, res) => {
  //const {title, description} = req.body;
  //console.log(req.body);//datos de la descripción y escritos del texto
  //console.log(req.file);//datos de la imagen
  //const result = await cloudinary.v2.uploader.upload(req.file.path);//aquí estoy diciendo que voy a subir una imagen a cloudinary
  //console.log(result);//result es la imagen subida a cloudinary
  //const newPhoto =  new Photo({
    //title,
    //description,
    //imageURL: result.secure_url,
    //public_id: result.public_id
  //})
  //await newPhoto.save();//así guardamos en la base de datos
  //await fs.unlink(req.file.path);//elimino la foto de mi servidor
  //res.send('Received');
//});
router.post('/images/add', async (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;
  console.log(req.file);
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  console.log(result);
  
  const newPhoto = new Photo({
      title: title,
      description: description,
      imageURL: result.url,
      public_id: result.public_id
  });

  await newPhoto.save();
  await fs.unlink(req.file.path);
  res.redirect('/');
});

router.get('/images/delete/:photo_id', async (req, res) => {
  const {photo_id} = req.params;
  const photo = await Photo.findByIdAndRemove(photo_id);//elimino la foto de la base de datos
  await cloudinary.v2.uploader.destroy(photo.public_id);//elimino la foto de cloudinary
  res.redirect('/images/add')
})

module.exports = router;