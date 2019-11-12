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

    console.log(`contador= ${contadorDePost},,,, result = ${(resultrpi.length)}`);
    
    
    if (contadorDePost === (resultrpi.length )) {
        // console.log(`ESTO ES CANTIDAD DE RPIS ${resultrpi.length}`.inverse);
        validacion_Trilateracion();
        // console.log(`\n`);
        contadorDePost = 0;
    }

}



module.exports = {
    tiempoEspera,
    Xgloball
    // tiempoScanner
}