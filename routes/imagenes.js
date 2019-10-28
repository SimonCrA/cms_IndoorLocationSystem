const express = require('express');
var router = express.Router();



const apiImagen =  require('../controladores/database/imagenes')

router.get('/imagen/:tipo/:img', apiImagen.getImg )

router.delete('/imagen/:tipo/:img', apiImagen.deleteImg)


module.exports = router;