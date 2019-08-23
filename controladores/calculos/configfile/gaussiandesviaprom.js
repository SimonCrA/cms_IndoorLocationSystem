const configfile = require('../configfile/configfile');
const RawDataM = require('../../../models/rawdatamuestras');
const RSSIprom = require('../configfile/rssiprom');

let vgcde = new Array();

let rx = RSSIprom.respRssi;

let desviacionEstandarGaussiana = async (muestras, distancia, macrpi, mactag) => {
    console.log("ENTRAMOS A CALCULODEN");

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

        for (var i = 0; i < muestras; i++) {
            rssisum += rawdata[i].rssi;
        };

        rssiprom = rssisum / muestras;

        //console.log(rssiprom);

        let desviacion = 0;
        for (let i = 0; i < muestras; i++) {
            desviacion += Math.pow(rx - rssiprom, 2);
        }
        desviacionT = Math.sqrt(desviacion / muestras)
        // console.log('esto es DesviaT= ',desviaT,' de la mac=',mac)



        desviacionSum += desviacionT

        let promedioDesviacion = desviacionSum / 5;
        let z = 1.65;
        let zmgvwsd = z * promedioDesviacion;

        respvgcde[0] = zmgvwsd;

        //console.log(Cofing[a])

    });
}

/***************************************
 * variable modificadas
 * desviasion = desviacion
 * respvgcde= resppuesta de variable gaussiana con desviacion estandar
 * zmgvwsd = zero mean gaussian variable with standard deviation
 * 
 * 
 * El documento ahora quedará
 * en partes, ver carpeta configFile
 * cada cálculo en un archivo.
 **************************************/

module.exports = {
    desviacionEstandarGaussiana,
    respvgcde
}