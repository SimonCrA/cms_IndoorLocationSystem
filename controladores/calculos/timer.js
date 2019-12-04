const colors = require ('colors');
// const RawData = require('../../models/rawdata');
const Ubicacion = require('../../models/ubicacion');


const {validacion_Trilateracion} = require('./validacion');

let {startTrilateracion} = require('../variables')

let iniciarValidacion = async () =>{
    
    for (;;) {
        
        let res =await validacion_Trilateracion()
        // console.log(`RESPUESTA DE LA VALIDACION => ${res} <=`);
        if(startTrilateracion[0].a == false){
            console.log(`DETENER CICLO ETERNO`);
            break
        }
    }
}



module.exports = {
    iniciarValidacion
    // tiempoScanner
}