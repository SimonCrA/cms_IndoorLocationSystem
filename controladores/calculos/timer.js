const colors = require ('colors');
// const RawData = require('../../models/rawdata');
const Ubicacion = require('../../models/ubicacion');


const {validacion_Trilateracion} = require('./validacion');
const {avisar} = require ('../database/scan')

let Xgloball=false;
console.log(`esta es la variable global ${avisar}`);


let contadorDePost = 0;

let tiempoEspera = async () =>{
    
    let promesa_macrpi = () => {
        return new Promise((resolve, reject) => {
    
            Ubicacion.aggregate([
                    {
                        "$group": {
                            _id: "$macRpi",
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ])
                .exec((err, agregate_macrpi) => {
                    err
                        ?
                        reject(err) :
                        resolve(agregate_macrpi);
                });
    
        });
    }
    
    let resultrpi = await promesa_macrpi();
    
    contadorDePost ++;

    console.log(`contador= ${contadorDePost},,,, result = ${resultrpi.length}`);
    
    
    if (contadorDePost === resultrpi.length) {
        // console.log(`ESTO ES CANTIDAD DE RPIS ${resultrpi.length}`.inverse);
        //validacion_Trilateracion();
        contadorDePost = 0;
    }

}
let iniciar = ()=>{
    setInterval(() => {
        console.log(`esta es ============================================`);
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
    tiempoEspera,
    Xgloball
    // tiempoScanner
}