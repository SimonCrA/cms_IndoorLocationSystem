const filtrar = require('./kalmanfilter')
const colors = require ('colors')
let tiempoEspera = () =>{

    setTimeout(() => {
        console.log(`START`.green);
        tiempoScanner();
    }, 10000);
    
}


let tiempoScanner =async () =>{
    let cont = 5;
    let dato = await setInterval ( async()=>{
        /* *****************************************
        
        *	luego de una espera de X segundos
        *   se inicia el proceso de ubicacion 
        *   de target en este punto.
        
        /* ****************************************/
        
        cont--;
        await filtrar.filtrado(cont);
    },1000);
    setTimeout(() => {
        console.log(`Stop`.red);
        clearInterval(dato);
        tiempoEspera();
    }, 5100);

}


module.exports = {
    tiempoEspera,
    tiempoScanner
}