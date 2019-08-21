const configfile = require('../configfile/configfile');
const RawData = require('../../../models/rawdata');

let params = configfile;

muestras = params.muestras;
sample = params.sample;
mac = params.mac;

let  RSSIprom = (muestras,sample,mac) => {
    // //console.log("ENTRAMOS A RSSIPROM")

    let RSSIdataFromDB = (req, res) => {

    var rssiprom1 = 0
    var rssisum1 = 0
    var data;
    var a = 10;


    RawData.find({sampleId: sample, macBeacon:mac })
                .limit(muestras)
                .sort({_id:-1})
                .exec( (err,rawdata) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            data = rawdata;
            datrssi = data.rssi[1].rssi;
    
            if (mac === meshUno[0].mac) {a = 0}
            if (mac === meshUno[1].mac) {a = 1}
            if (mac === meshUno[2].mac) {a = 2}
            if (mac === '') {a = 3}
            if (mac === '') {a = 4}
            if (mac === '') {a = 5}
            //console.log(data)
            for (var i = 0; i < muestras; i++) {
                ////console.log('s')
                rssisum1 += data.rssi[i].rssi
    
            }
            rssiprom1 = rssisum1 / muestras
            cofing[a].rssiprom = rssiprom1;
    
            // console.log(Cofing[a])

        });
    };
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
    RSSIprom,
    RSSIdataFromDB
}