const express = require('express');
var router = express.Router();
const upload = require('../routes/upload');


const apiImagen =  require('../controladores/database/imagenes')

router.get('/imagen/:tipo/:img', apiImagen.getImg )

router.delete('/imagen/:tipo/:img', apiImagen.deleteImg)

router.put('/upload/:tipo/:id/:name', upload.uploadFile)


module.exports = router;