const jwt = require('jsonwebtoken');
const async = require('async');

let {Users} = require('../controladores/variables')

//============================
//Verificar token
//============================

let verificartoken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, process.env.SEED_AUTH, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
        
    });
    
};

//============================
//     Validar los roles
//============================

let roleAuthenticator = (req, res, next) => {

    let sesionId = req.headers.authorization.split(' ')

    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);

        let role = Users[findIt2].user.role;
        // console.log('entre en role authenticator' + role);
        async.parallel({
            superRole: function (callback) {

                if (role === 'SUPER_ROLE') {
                    let res = true
                    callback(null, res)
                } else {
                    let res = false
                    callback(null, res)
                }
            },
            adminRole: function (callback) {
                if (role === 'ADMIN_ROLE') {
                    let res = true
                    callback(null, res)
                } else {
                    let res = false
                    callback(null, res)
                }
            },
            techLRole: function (callback) {
                if (role === 'TECH_LEAD_ROLE') {
                    let res = true
                    callback(null, res)
                } else {
                    let res = false
                    callback(null, res)
                }
            },
            salesLRole: function (callback) {
                if (role === 'SALES_LEAD_ROLE') {
                    let res = true
                    callback(null, res)
                } else {
                    let res = false
                    callback(null, res)
                }
            },
            techERole: function (callback) {
                if (role === 'TECH_EMPLOYEE_ROLE') {
                    let res = true
                    callback(null, res)
                } else {
                    let res = false
                    callback(null, res)
                }
            },
            salesERole: function (callback) {
                if (role === 'SALES_EMPLOYEE_ROLE') {
                    let res = true
                    callback(null, res)
                } else {
                    let res = false
                    callback(null, res)
                }
            },


        }, function (err, results) {
            if (err) {
                console.log(err);
                return next(err);
            }
            // Successful, so render.
            let objRes = {
                'superRole': results.superRole,
                'adminRole': results.adminRole,
                'techLRole': results.techLRole,
                'salesLRole': results.salesLRole,
                'techERole': results.techERole,
                'salesERole': results.salesERole,
            };
            console.log(objRes);

            if (objRes.superRole || objRes.adminRole || objRes.techLRole ||
                objRes.salesLRole || objRes.techERole || objRes.salesERole) {
                next();
            } else {
                res.status(401).json({
                    ok: false,
                    err: {
                        message: 'The user must have premission to this section'
                    }
                });
            }
        });

    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'The user must be logged in'
            }
        });
    }
        



}



//============================
//Verificar Super_Role
//============================

let Super_Role = (req, res, next) => {
    
    let sesionId = req.headers.authorization.split(' ')
    
    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);

        let role = Users[findIt2].user.role;

        if (role === 'SUPER_ROLE') {
            next();
        } else {
            res.status(401).json({
                ok: false,
                err: {
                    message: 'The user must have Super-User premission'
                }
            });
        }
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'The user must have Logged in'
            }
        });
    }

};


/* *****************************************
*	TEST 1 SWITSH CASE
*	
/* *****************************************/

// get.js


let Validar_TechLead =  (req, res, next) => {
    console.log(req.headers);
    console.log(req.body);

        let sesionId = req.headers.authorization.split(' ')
    
        let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
        if (findIt2 >= 0) {
            console.log(`este usuario esta en la libreta de users`);
    
            let role = Users[findIt2].user.role;

    switch (role) {
        case 'SUPER_ROLE': 
            next()
            break;
        case 'ADMIN_ROLE': 
            next()
            break;
        case 'TECH_LEAD_ROLE': 
            next()
            break;
        case 'SALES_LEAD_ROLE': 
        res.status(401).json({
            ok: false,err: {message: 'The user must have premission to this section'}
        });
            break;
        case 'TECH_EMPLOYEE_ROLE': 
        next() 
            break;
        case 'SALES_EMPLOYEE_ROLE': 
        res.status(401).json({
            ok: false,err: {message: 'The user must have premission to this section'}
        });
            break;    
        default:
            res.status(401).json({
                ok: false,err: {message: 'The user must have premission to this section'}
            });
            break;
    }
    }
}

let validarSearchAsset =  (req, res, next) => {

    let sesionId = req.headers.authorization.split(' ')

    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);

        let role = Users[findIt2].user.role;

switch (role) {
    case 'SUPER_ROLE': 
        next()
        break;
    case 'ADMIN_ROLE': 
        next()
        break;
    case 'TECH_LEAD_ROLE': 
        next()
        break;
    case 'SALES_LEAD_ROLE': 
    next()
        break;
    case 'TECH_EMPLOYEE_ROLE': 
    next()
        break;
    case 'SALES_EMPLOYEE_ROLE': 
    next()
        break;    
    default:
        res.status(401).json({
            ok: false,err: {message: 'The user must have premission to this section'}
        });
        break;
}
}
}

// get user.js

let validarSalesUser =  (req, res, next) => {

    let sesionId = req.headers.authorization.split(' ')

    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);

        let role = Users[findIt2].user.role;

switch (role) {
    case 'SUPER_ROLE': 
        next()
        break;
    case 'ADMIN_ROLE': 
        next()
        break;
    case 'TECH_LEAD_ROLE': 
        next()
        break;
    case 'SALES_LEAD_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;
    case 'TECH_EMPLOYEE_ROLE': 
    next()
        break;
    case 'SALES_EMPLOYEE_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;    
    default:
        res.status(401).json({
            ok: false,err: {message: 'The user must have premission to this section'}
        });
        break;
}
}
}

//Put .js 

let validarUpTech =  (req, res, next) => {

    let sesionId = req.headers.authorization.split(' ')

    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);

        let role = Users[findIt2].user.role;

switch (role) {
    case 'SUPER_ROLE': 
        next()
        break;
    case 'ADMIN_ROLE': 
        next()
        break;
    case 'TECH_LEAD_ROLE': 
        next()
        break;

    case 'SALES_LEAD_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;

    case 'TECH_EMPLOYEE_ROLE': 
    next()
        break;

    case 'SALES_EMPLOYEE_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;    
    default:
        res.status(401).json({
            ok: false,err: {message: 'The user must have premission to this section'}
        });
        break;
}
}
}
//ACOMODAR ESTO ES IGUAL QUE EL VALIDAR SEARCHASSET
let validarUpAsset =  (req, res, next) => {

    let sesionId = req.headers.authorization.split(' ')

    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);

        let role = Users[findIt2].user.role;

switch (role) {
    case 'SUPER_ROLE': 
        next()
        break;
    case 'ADMIN_ROLE': 
        next()
        break;
    case 'TECH_LEAD_ROLE': 
        next()
        break;

    case 'SALES_LEAD_ROLE': 
        next()
        break;

    case 'TECH_EMPLOYEE_ROLE': 
        next()
        break;

    case 'SALES_EMPLOYEE_ROLE': 
        next()
        break;    
    default:
        res.status(401).json({
            ok: false,err: {message: 'The user must have premission to this section'}
        });
        break;
}
}
}



let validarUpUser =  (req, res, next) => {

    let sesionId = req.headers.authorization.split(' ')

    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);

        let role = Users[findIt2].user.role;

switch (role) {
    case 'SUPER_ROLE': 
        next()
        break;
    case 'ADMIN_ROLE': 
        next()
        break;
    case 'TECH_LEAD_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;

    case 'SALES_LEAD_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;

    case 'TECH_EMPLOYEE_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;

    case 'SALES_EMPLOYEE_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;    
    default:
        res.status(401).json({
            ok: false,err: {message: 'The user must have premission to this section'}
        });
        break;
}
}
}

//Create post.js


let validarPostTech =  (req, res, next) => {

    console.log(`Entre aca te doy permiso`);
    console.log(req.headers);
    console.log(req.body);

    console.log(Users);
    let sesionId = req.headers.authorization.split(' ')
    console.log(sesionId);
    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);

        let role = Users[findIt2].user.role;
        
switch (role) {
    case 'SUPER_ROLE': 
        next()
        break;
    case 'ADMIN_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;
    case 'TECH_LEAD_ROLE': 
        next()
        break;

    case 'SALES_LEAD_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;

    case 'TECH_EMPLOYEE_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;

    case 'SALES_EMPLOYEE_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;    
    default:
        res.status(401).json({
            ok: false,err: {message: 'The user must have premission to this section'}
        });
        break;
}
}else{
  res.status(408).json({
    ok: false,err: {message: 'TU MAMA'}
});  
}


}

//esto es igual que el primero  'Validar_TechLead'
let validarPostAsset =  (req, res, next) => {

    let sesionId = req.headers.authorization.split(' ')

    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);

        let role = Users[findIt2].user.role;

switch (role) {
    case 'SUPER_ROLE': 
        next()
        break;
    case 'ADMIN_ROLE': 
    next()
        break;
    case 'TECH_LEAD_ROLE': 
        next()
        break;

    case 'SALES_LEAD_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;

    case 'TECH_EMPLOYEE_ROLE': 
    next()
        break;

    case 'SALES_EMPLOYEE_ROLE': 
    res.status(401).json({
        ok: false,err: {message: 'The user must have premission to this section'}
    });
        break;    
    default:
        res.status(401).json({
            ok: false,err: {message: 'The user must have premission to this section'}
        });
        break;
}
}
}



module.exports = {
    verificartoken,

    Super_Role,
    // Admin_Role,
    // TechLeadRole,
    // TechEmployeeRole,
    // SalesLeadRole,
    // SalesEmployeeRole,
    roleAuthenticator,
    Validar_TechLead,
    validarSearchAsset,
    validarSalesUser,
    validarUpTech,
    validarUpAsset,
    validarUpUser,
    validarPostTech,
    validarPostAsset
}