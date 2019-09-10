const filtrar = require('./kalmanfilter');
const colors = require ('colors');
const RawData = require('../../models/rawdata');


const {validacion_Trilateracion} = require('./validacion');


let tiempoEspera = () =>{
    
    setInterval(() => {
        console.log(`START`.green);
        validacion_Trilateracion();
        
    }, 10000);
    
}


// let tiempoScanner =async () =>{
//     let cont = 5;
//     let dato = await setTimeout ( async()=>{
//         /* *****************************************
        
//         *	luego de una espera de X segundos
//         *   se inicia el proceso de ubicacion 
//         *   de target en este punto.
        
//         /* ****************************************/
        
//         cont--;
//         try{
//         RawData.aggregate([{"$group":{_id:"$macRpi", count:{$sum:1}}}])
//         .exec(function (err, macrpi){
//             if (err) {
//                 console.log(`err`.blue + err);
//             }
//             RawData.aggregate([{"$group":{_id:"$macTag", count:{$sum:1}}}])
//             .exec(function (er, mactag){
//                 if (er) {
//                     console.log(`err`.yellow + er);
//                 }

//                 console.log(macrpi.length);
//                 console.log(macrpi.length);
//                 for (let i= 0;i<macrpi.length;i++){
//                     for(let j=0; j<mactag.length; j++){
//                         try{
//                             filtrar.filtrado( macrpi[i]._id , mactag[j]._id );

//                         }catch(err){

//                             console.log(`ERROR:`.red + `${err}`);
//                         }

//                     }
//                 }
//             });    


//         });
//     }catch(err){}

        
//     },5000);
//     setTimeout(() => {
//         console.log(`STOP`.red);
//         clearInterval(dato);
//         tiempoEspera();
//         clearTimeout
//     }, 5100);

// }


module.exports = {
    tiempoEspera
    // tiempoScanner
}