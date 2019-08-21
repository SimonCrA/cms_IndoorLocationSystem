const configfile = require('../configfile/configfile');

let params = configfile.ejecucionFnEnSerie;

muestras = params.muestras;
sample = params.sample;
mac = params.mac;

let desviacion = (muestras, sample, mac) =>  {
    var rssiprom = 0
    var rssisum = 0
    var a = 10;
    var data;
    ////console.log('s='+muestras+ sample+ mac)


        // //console.log(desviap)

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

        if (mac == meshUno[0].mac) {a = 0}
        if (mac == meshUno[1].mac) {a = 1}
        if (mac == meshUno[2].mac) {a = 2}
        if (mac == '') {a = 3}
        if (mac == '') {a = 4}
        if (mac == '') {a = 5}

        data = rawdata;


        for (var i = 0; i < muestras; i++) {
            ////console.log('s')
            rssisum += data.rssi[i].rssi

        }
        rssiprom = rssisum / muestras
        var desvia = 0
        //console.log(rssiprom)
        for (var i = 0; i < muestras; i++) {
            desvia += Math.pow(data.rssi[i].rssi - rssiprom, 2);
        }
        desviaT = Math.sqrt(desvia / muestras)
        // console.log('esto es DesviaT= ',desviaT,' de la mac=',mac)



        Cofing[a].desviap += desviaT

        var prom = Cofing[a].desviap / 5

        // console.log(prom)
        var z = 1.65;
        var Cc = z * prom;

        // console.log(Cc)
        Cofing[a].Cprom = prom;
        Cofing[a].C = Cc;

        //console.log(Cofing[a])

    });
}

/***************************************
 * variable modificadas
 * desviasion = desviacion
 * 
 * 
 * El documento ahora quedará
 * en partes, ver carpeta configFile
 * cada cálculo en un archivo.
 **************************************/

module.exports = {
    desviacion
}