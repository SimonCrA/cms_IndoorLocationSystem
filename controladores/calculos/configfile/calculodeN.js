const configfile = require('../configfile/configfile');
const RawData = require('../../../models/rawdata');
const RSSIprom = require('../configfile/rssiprom');

let resN = new Array();

rx = RSSIprom.resRssi;



let  calculoDeN = async (muestras, distancia, macrpi, mactag ) => {
    console.log("ENTRAMOS A calcul0DeN")

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
                if (data.rssi[j].distance > 1) {
                    nsum += (-(data.rssi[j].rssi) + [a].rssiprom + Cofing[a].C) / (10 * Math.log10(data.rssi[j].distance))
                    // console.log('rssi= '+data.rssi[j].rssi+'rssiprom= '+Cofing[a].rssiprom+'C='+Cofing[a].C+'Distance= '+data.rssi[j].conditions.distance)
        
                }
        
            }
            // console.log('HEPA MENOL!')
            console.log(nsum, mac)
            total = nsum / muestras;
            console.log(total)
            Cofing[a].nAcum += total
            // console.log(cont)
        
        
        
            console.log(Cofing[a].nAcum, mac)
            console.log('********************************')
            resN[0].n = Cofing[a].nAcum / 4;
            console.log(Cofing[a]) 

        });
};

    
    // //console.log(consulta)

/***************************************
 * variable modificadas
 * calN = calculoDeN
 * 
 * 
 * El documento ahora quedará
 * en partes, ver carpeta configFile
 * cada cálculo en un archivo.
 **************************************/

module.exports = {
    calculoDeN,
    resN
}