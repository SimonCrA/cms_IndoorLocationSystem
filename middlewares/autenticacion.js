const jwt = require('jsonwebtoken');

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
//Verificar Admin_Role
//============================

let Admin_Role = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'The user must have Admin premission'
            }
        });
    }

};

//============================
//Verificar Super_Role
//============================

let Super_Role = (req, res, next) => {
    
    console.log(req.user.role);
    
    // //De alberto
    // let sesionId = req.headers.authorization.split(' ')

    // console.log(sesionId[1]);

    // let findIt2 = Users.findIndex(tarea =>tarea.sessionId === sesionId[1]);
    // if(findIt2>=0){
    //     console.log(`este usuario esta en la libreta de users`);
    // }else{
    //     res.status(401).json({
    //         ok: false,
    //         err: {
    //             message: 'The user must have Super-User premission'
    //         }
    //     });
    // }

    // //esta libreta de users se actualiza cada vez que un usuario entra o sale de la sesion 


    let user = req.user;
    console.log(user);

    if (user.role === 'SUPER_ROLE') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'The user must have Super-User premission'
            }
        });
    }

};

//============================
//Verificar Tech_Lead_Role
//============================

let TechLeadRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'TECH_LEAD_ROLE') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'The user must have Tech-Lead-Role premission'
            }
        });
    }

};

//============================
//Verificar Tech_Employee_Role
//============================

let TechEmployeeRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'TECH_EMPLOYEE_ROLE') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'The user must have Tech-Employee-Role premission'
            }
        });
    }

};

//============================
//Verificar Sales_Lead_Role
//============================

let SalesLeadRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'SALES_LEAD_ROLE') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'The user must have Sales-Lead-Role premission'
            }
        });
    }

};

//============================
//Verificar Sales_Employee_Role
//============================

let SalesEmployeeRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'SALES_EMPLOYEE_ROLE') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'The user must have Sales-Employee-Role premission'
            }
        });
    }

};

module.exports = {
    verificartoken,

    Super_Role,
    Admin_Role,
    TechLeadRole,
    TechEmployeeRole,
    SalesLeadRole,
    SalesEmployeeRole
}