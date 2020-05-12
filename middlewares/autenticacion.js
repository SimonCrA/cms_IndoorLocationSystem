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

        let role = req.user.role;
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
                'salesLRole': results.SalesLRole,
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
//Verificar Admin_Role
//============================

let Admin_Role = (req, res, next) => {


    let sesionId = req.headers.authorization.split(' ')

    console.log(sesionId[1]);

    let findIt2 = Users.findIndex(tarea =>tarea.sessionId === sesionId[1]);
    if(findIt2>=0){
        console.log(`este usuario esta en la libreta de users`);
        let role = Users.user.role;
        if (role === 'ADMIN_ROLE') {
            next();
        } else {
            res.status(401).json({
                ok: false,
                err: {
                    message: 'The user must have Admin premission'
                }
            });
        }
    }else{
        res.status(401).json({
            ok: false,
            err: {
                message: 'The user must be logged in'
            }
        });
    }

};


//============================
//Verificar Super_Role
//============================

let Super_Role = (req, res, next) => {
    
    let sesionId = req.headers.authorization.split(' ')

    console.log(sesionId[1]);

    let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
    if (findIt2 >= 0) {
        console.log(`este usuario esta en la libreta de users`);
        let role = Users.user.role;

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

// //============================
// //Verificar Tech_Lead_Role
// //============================

// let TechLeadRole = (req, res, next) => { 

//     let sesionId = req.headers.authorization.split(' ')

//     console.log(sesionId[1]);

//     let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
//     if (findIt2 >= 0) {
//         console.log(`este usuario esta en la libreta de users`);
//     } else {
//         res.status(401).json({
//             ok: false,
//             err: {
//                 message: 'The user must have Super-User premission'
//             }
//         });
//     }
//     let role = Users.user.role;

//     if (role === 'TECH_LEAD_ROLE') {
//         next();
//     } else {
//         res.status(401).json({
//             ok: false,
//             err: {
//                 message: 'The user must have Tech-Lead-Role premission'
//             }
//         });
//     }

// };

// //============================
// //Verificar Tech_Employee_Role
// //============================

// let TechEmployeeRole = (req, res, next) => {

//     let sesionId = req.headers.authorization.split(' ')

//     console.log(sesionId[1]);

//     let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
//     if (findIt2 >= 0) {
//         console.log(`este usuario esta en la libreta de users`);
//     } else {
//         res.status(401).json({
//             ok: false,
//             err: {
//                 message: 'The user must have Super-User premission'
//             }
//         });
//     }
//     let role = Users.user.role;

//     if (role === 'TECH_EMPLOYEE_ROLE') {
//         next();
//     } else {
//         res.status(401).json({
//             ok: false,
//             err: {
//                 message: 'The user must have Tech-Employee-Role premission'
//             }
//         });
//     }

// };

// //============================
// //Verificar Sales_Lead_Role
// //============================

// let SalesLeadRole = (req, res, next) => {

//     let sesionId = req.headers.authorization.split(' ')

//     console.log(sesionId[1]);

//     let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
//     if (findIt2 >= 0) {
//         console.log(`este usuario esta en la libreta de users`);
//     } else {
//         res.status(401).json({
//             ok: false,
//             err: {
//                 message: 'The user must have Super-User premission'
//             }
//         });
//     }
//     let role = Users.user.role;

//     if (role === 'SALES_LEAD_ROLE') {
//         next();
//     } else {
//         res.status(401).json({
//             ok: false,
//             err: {
//                 message: 'The user must have Sales-Lead-Role premission'
//             }
//         });
//     }

// };

// //============================
// //Verificar Sales_Employee_Role
// //============================

// let SalesEmployeeRole = (req, res, next) => {

//     let sesionId = req.headers.authorization.split(' ')

//     console.log(sesionId[1]);

//     let findIt2 = Users.findIndex(tarea => tarea.sessionId === sesionId[1]);
//     if (findIt2 >= 0) {
//         console.log(`este usuario esta en la libreta de users`);
//     } else {
//         res.status(401).json({
//             ok: false,
//             err: {
//                 message: 'The user must have Super-User premission'
//             }
//         });
//     }
//     let role = Users.user.role;

//     if (role === 'SALES_EMPLOYEE_ROLE') {
//         next();
//     } else {
//         res.status(401).json({
//             ok: false,
//             err: {
//                 message: 'The user must have Sales-Employee-Role premission'
//             }
//         });
//     }

// };

module.exports = {
    verificartoken,

    Super_Role,
    Admin_Role,
    TechLeadRole,
    TechEmployeeRole,
    SalesLeadRole,
    SalesEmployeeRole,
    roleAuthenticator
}