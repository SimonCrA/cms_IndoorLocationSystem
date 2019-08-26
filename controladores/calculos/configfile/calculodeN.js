const RawDataM = require('../../../models/rawdatamuestras');
const RSSIprom = require('../configfile/rssiprom');
const gaussDesviaProm = require('../configfile/gaussiandesviaprom');

let respN = new Array();

respN[0] = {sumatoriaN:0, totalN:0}
respN[1] = {sumatoriaN:0, totalN:0}
respN[2] = {sumatoriaN:0, totalN:0}



let  calculoDeN = async (muestras, distancia, macrpi, mactag, iteracion ) => {
    console.log("ENTRAMOS A calculo De Constante de Propagacion N");

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

            let nsum = 0;
            let totalN =0;
            for (let j = 0; j < muestras; j++) {
                if (rawdata[j].distancia > 1) {
                    nsum += (-(rawdata[j].rssi) + RSSIprom.respRssi[iteracion] + gaussDesviaProm.respvgcde[iteracion].zmgvwsd) / (10 * Math.log10(rawdata[j].distancia))
                    console.log(`(-(${rawdata[j].rssi}) + ${RSSIprom.respRssi[iteracion]} + ${gaussDesviaProm.respvgcde[iteracion].zmgvwsd}) / (10 * ${Math.log10(rawdata[j].distancia)})`);
                }
        
            }
            console.log(`Muestra nsum: ${nsum}`);
            totalN = nsum / muestras;
            respN[iteracion].sumatoriaN += totalN;

 
        });
};

/***************************************
 * letiable modificadas
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