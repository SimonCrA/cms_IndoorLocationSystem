const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usuario')

passport.serializeUser((user, usuarioSerializado)=>{
    usuarioSerializado(null,user._id);
});

passport.deserializeUser((id, usuarioDeserializado)=>{
    User.findById(id, (err, usuarioBuscado) =>{
        usuarioDeserializado(err, usuarioBuscado);
    })
});

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) =>{
        User.findOne({email}, (err, usuarioEncontrado) =>{
            if (!usuarioEncontrado) {
                return done(null, false, {message: `Este email ${email} no esta registrado`});
            } else {
                usuarioEncontrado.compararPassword(password, (err, sonIguales) => {
                    if (sonIguales) {
                        return done(null, usuarioEncontrado);
                    }else {
                        return done(null, false, {message: 'la contraseña no es valida'})
                    }
                })
            }
        })
    }
))

exports.estaAutenticado = (req, res, next) => {

    console.log(req.sessionID);

    if (req.isAuthenticated()) {
        console.log(`Paso....`);
        return next();
    }
    console.log(`NO PASO`);
    res.status(401).send('es necesario hacer login para ingresar');
}