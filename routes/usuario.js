var express = require('express');
var router = express.Router();

const { verificartoken, verificarAdmin_Role, verificarSuper_Role } = require('../middlewares/autenticacion');
const apiUser = require ('../controladores/database/usuario')
const passportConfig = require('../middlewares/passport')


//================================
//Consultar los usuarios
//================================
// router.get('/usuario', passportConfig.estaAutenticado, apiUser.getAllUsuario)
router.get('/usuario',  apiUser.getAllUsuario)

//================================
//Consultar un usuario
//================================
// router.get('/usuario/:id', passportConfig.estaAutenticado, apiUser.getOneUser)

router.get('/usuario/:id',  apiUser.getOneUser)
//================================
//Crear usuarios
//================================
// router.post('/usuario', [verificartoken, verificarSuper_Role], apiUser.postUser);
router.post('/usuario', apiUser.postUser);
router.post('/signup', apiUser.postSignUp);

//================================
//Actualizar usuario
//================================
// router.put('/usuario/:id', passportConfig.estaAutenticado, apiUser.putUser)
router.put('/usuario/:id',  apiUser.putUser)

//================================
//Borrar usuarios
//================================

// router.delete('/usuario/:id', passportConfig.estaAutenticado, apiUser.deleteUser)
router.delete('/usuario/:id', apiUser.deleteUser)


router.post('/login', apiUser.postLogIn);

// router.get('/logout', passportConfig.estaAutenticado, apiUser.logout);
router.get('/logout',  apiUser.logout);


module.exports = router;