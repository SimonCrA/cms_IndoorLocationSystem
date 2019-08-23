const ConstDistancia= require('../../models/constantesdistancia');




let distancia = async (req) => {

    

    ConstDistancia.find({macRpi:req.macrpi, macTag:req.mactag})
    .exec( (err, callback) => {
        if(err) {
            console.log(err);
        }
        if(device[device.length-1] !== undefined){
            console.log(`${constant}`);
            let pot = (-req.rssi + callback[0].rssiProm + callback[0].desviacionEstandar) / (10 * callback[0].nPropagacion);
            let distancia = Math.pow(10, pot);
            /* *****************************************n
            *	siguiene modulo es TRILATERACION, para esto se deben enviar tres distancias
            *	como hacer que envie tres distancias el modulo de getDistancia si solo resive
            *   1 paramtro de busqueda...hb
            /* *****************************************/

        }else{
            console.log(`--------------\n`+
            `No existe registro de constantes para esta busqueda "\nMacRasp: ${req.macrpi} , MacTag: ${req.mactag}"`+
            `\n--------------`);
        }

    });



    // // let mac = req.mac;
    // // let RSSIXe = req.rssi;
    // await ConstDistancia.find({macTag:mac, sampleId}).limit(3).sort({sampleId})
    //     .exec((err, device) => {

    //         if (err) {
    //             return res.status(400).json({
    //                 ok: false,
    //                 err
    //             });
    //         }

    //         ConstsFromDB = device;

    //         var a = 10;



    //         return distancia;

    //     });
}




/***************************************
 * variable modificadas
 * calculateDistancia = distancia
 * 
 * las funciones son la misma.
 * la que hace la busqueda en DB es
 *distancia.
 * 
 * 
 * El documento ahora quedará
 * en partes, ver carpeta configFile.
 * Cada cálculo en un archivo.
 **************************************/

module.exports = {
    distancia
}
