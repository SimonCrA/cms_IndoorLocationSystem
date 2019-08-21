const filtrar = require('./kalmanfilter')
const colors = require ('colors')

let tiempoEspera = () =>{

    setTimeout(() => {
        console.log(`START`.green);
        tiempoScanner();
    }, 7000);
    
}


let tiempoScanner =async () =>{
    let cont = 5;
    let dato = await setTimeout ( async()=>{
        /* *****************************************
        
        *	luego de una espera de X segundos
        *   se inicia el proceso de ubicacion 
        *   de target en este punto.
        
        /* ****************************************/
        
        cont--;
        await filtrar.filtrado(cont);
    },5000);
    setTimeout(() => {
        console.log(`STOP`.red);
        clearInterval(dato);
        tiempoEspera();
    }, 5100);

}


module.exports = {
    tiempoEspera,
    tiempoScanner
}