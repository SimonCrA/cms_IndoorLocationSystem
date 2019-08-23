const configfile = require('../configfile/configfile');
const RawDataM = require('../../../models/rawdatamuestras');
const RSSIprom = require('../configfile/rssiprom');
const gaussDesviaProm = require('../configfile/gaussiandesviaprom');

let respN = new Array();

rx = RSSIprom.respRssi;
vgcde= gaussDesviaProm.respvgcde;



let  calculoDeN = async (muestras, distancia, macrpi, mactag ) => {
    console.log("ENTRAMOS A calcul0DeN");

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

            var nsum = 0;
            for (var j = 0; j < muestras; j++) {
                if (rawdata.distancia > 1) {
                    nsum += (-(rawdata.rssi) + rx + vgcde) / (10 * Math.log10(rawdata.distancia))
                    // console.log('rssi= '+data.rssi[j].rssi+'rssiprom= '+Cofing[a].rssiprom+'C='+Cofing[a].C+'Distance= '+data.rssi[j].conditions.distance)
        
                }
        
            }
            // console.log('HEPA MENOL!')
            // console.log(nsum, mac)
            totalN = nsum / muestras;
            console.log(totalN);
            respN[0] += totalN;
            console.log(respN[0], mac)
            console.log('********************************')
            resN[1] = respN[0] / 4;
            console.log(respN[1]);

        });
};

/***************************************
 * variable modificadas
 * calN = calculoDeN
 * respN[0] = sumatoria de n
 * respN[1] = promedio de n
 * rx = valor que se obtiene de RSSIprom
 * vgdc= valor que se obtiene de gaussiandesviaprom
 * 
 * 
 * El documento ahora quedará
 * en partes, ver carpeta configFile
 * cada cálculo en un archivo.
 **************************************/

module.exports = {
    calculoDeN,
    respN
}