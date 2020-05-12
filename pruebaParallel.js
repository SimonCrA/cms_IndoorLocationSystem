const async = require('async');

let role = 'SUPER_ROLE';
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
      //  console.log(res);
       callback(null, res)
     } else {
       let res = false
       callback(null, res)
     }
     console.log('entre en adminRole parallel');
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
   SalesLRole: function (callback) {
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
     return err;
   }
   // Successful, so render.

   // console.log({'idzonas':results.idzona, 'tags':results.tags});
   let objRespuesta = {
       'superRole': results.superRole,
       'adminRole': results.adminRole,
       'techLRole': results.techLRole,
       'SalesLRole': results.SalesLRole,
       'techERole': results.techERole,
       'salesERole': results.salesERole, 
   };
   console.log(objRespuesta)
 });