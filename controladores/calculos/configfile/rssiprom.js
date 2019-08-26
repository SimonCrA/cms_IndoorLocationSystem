const RawDataM = require('../../../models/rawdatamuestras');

let respRssi = new Array();


let  rssiProm = async (muestras, distancia, macrpi, mactag , iteracion) => {
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
            if(rawdata[0] === undefined){
                console.log(`No se puede realizar calculos de RSSI Promedio para;
                \n macRasp:${macrpi} ,  MacTag:${mactag} ,  Distancia:${distancia}`);
            }else{


                // console.log(rawdata)
                for (var i = 0; i < muestras; i++) {
                    ////console.log('s')
                    rssisum1 += rawdata[i].rssi;
                }
                let rssiprom = rssisum1 / muestras
                // console.log(rssiprom);
    
                respRssi[iteracion] = rssiprom;

            }

        });

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
    respRssi 
}