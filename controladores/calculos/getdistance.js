const ConstDistancia= require('../../models/constantesdistancia');
const DistanciaTag= require('../../models/distancias');




let distancia = async (req) => {

    // console.log(req);

    

    ConstDistancia.find({macRpi:req.macrpi, macTag:req.mactag})
    .exec( (err, constsDataFromDB) => {
        if(err) {
            console.log(err);
        }
        if(constsDataFromDB[0] !== undefined){
            // console.log(`${constant}`);
            let pot = (-req.rssi + constsDataFromDB[0].rssiProm + constsDataFromDB[0].desviacionEstandar) / (10 * constsDataFromDB[0].nPropagacion);
            let distancia = Math.pow(10, pot);
            console.log(distancia);

            /* *****************************************n
            *	Guardado en bse de datos de las distancias de los Tags.
            /* *****************************************/

            let distanciasTags = new DistanciaTag({

                macRpi: req.macrpi,
                macTag: req.mactag,
                distanciaTag: distancia,
                region: constsDataFromDB[0].idRegion
            });

            distanciasTags.save(function (err) {
                if (err) {
                    console.log(err);
                    return  {
                        ok: false,
                        status: 400
                    }

                }else{

                    return {ok:true, status:200}
                }

            });

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
