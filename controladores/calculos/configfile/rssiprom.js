const configfile = require('../configfile/configfile');
const RawDataM = require('../../../models/rawdatamuestras');

let resRssi = new Array();


let  rssiProm = async (muestras, distancia, macrpi, mactag ) => {
    console.log("ENTRAMOS A RSSIPROM")

    let rssisum1 = 0;
    RawDataM.find({macRpi:macrpi, macTag:mactag, distancia: distancia })
                .limit(muestras)
                .sort({_id:-1})
                .exec( (err,rawdata) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
   

            // console.log(rawdata)
            for (var i = 0; i < muestras; i++) {
                ////console.log('s')
                rssisum1 += rawdata[i].rssi;
            }
            let rssiprom = rssisum1 / muestras
            // console.log(rssiprom);

            resRssi[0] = rssiprom;
            return rssiprom;
    


        });

    // return rssisum1;

};


/***************************************
 * La funcion RSSIprom pasó a ser una arrowFn
 * Se importan los parametros necsarios para 
 * que la funcion corra 
 * muestras, sample, mac.
 * 
 * 
 * El documento ahora quedará
 * en partes, ver carpeta configFile
 * cada cálculo en un archivo.
 **************************************/

module.exports = {
    rssiProm,
    resRssi
    // RSSIdataFromDB 
}