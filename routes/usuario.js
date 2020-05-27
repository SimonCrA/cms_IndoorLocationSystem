var express = require('express');
var router = express.Router();

const { verificartoken, verificarAdmin_Role, verificarSuper_Role } = require('../middlewares/autenticacion');
const apiUser = require ('../controladores/database/usuario')
const passportConfig = require('../middlewares/passport')

var r = require('../middlewares/autenticacion');



//================================
//Consultar los usuarios
//================================

router.get('/usuario', r.validarSalesUser,  apiUser.getAllUsuario)

//================================
//Consultar un usuario
//================================

router.get('/usuario/:id', r.validarSalesUser, apiUser.getOneUser)

//================================
//Crear usuarios
//================================

router.post('/usuario', r.validarUpUser, apiUser.postUser);
router.post('/signup', r.validarUpUser, apiUser.postSignUp);

//================================
//Actualizar usuario
//================================

router.put('/usuario/:id', r.validarUpUser, apiUser.putUser)

//================================
//Borrar usuarios
//================================

router.delete('/usuario/:id',r.validarUpUser, apiUser.deleteUser)

//================================
//Inicio y cierre de sesion
//================================


router.post('/login', apiUser.postLogIn);

router.get('/logout',  apiUser.logout);


module.exports = router;