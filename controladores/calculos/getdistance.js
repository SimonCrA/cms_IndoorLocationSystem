const ConstDistancia= require('../../models/constantesdistancia');




<<<<<<< HEAD
    

    let mac = req.mac;
    let RSSIXe = req.rssi;
    await ConstDistancia.find().limit(3).sort({_id: -1})
        .exec((err, device) => {
=======
let distancia = async (mac, rssi) => {
>>>>>>> ed21c7fb1ad54aab7009ad7645f52b185c608246

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


    //         console.log(`${constant}`);
    //         let pot = (-RSSIXe + Cofing[a].rssi + Cofing[a].C) / (10 * Cofing[a].n);
    //         let distancia = Math.pow(10, pot);

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
