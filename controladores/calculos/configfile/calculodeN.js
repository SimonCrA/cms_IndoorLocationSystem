const configfile = require('../configfile/configfile');


function calculoDeN(muestras, sample, mac) {
    // console.log("ENTRAMOS A calN")
    var a = 10;
    var data;
    var total = 0
    ////console.log('s='+muestras+ sample+ mac)


    var consulta = $.get("../../../../api/rssiprom/" + muestras + "/" + sample + "/" + mac, function () {
        data = consulta.responseJSON;
        if (mac == meshUno[0].mac) {
            a = 0
        }
        if (mac == meshUno[1].mac) {
            a = 1
        }
        if (mac == meshUno[2].mac) {
            a = 2
        }
        if (mac == '') {
            a = 3
        }
        if (mac == '') {
            a = 4
        }
        if (mac == '') {
            a = 5
        }

        // //console.log(data.rssi[0].conditions.distance)
        var nsum = 0;
        for (var j = 0; j < muestras; j++) {
            if (data.rssi[j].distance > 1) {
                nsum += (-(data.rssi[j].rssi) + Cofing[a].rssiprom + Cofing[a].C) / (10 * Math.log10(data.rssi[j].distance))
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
        Cofing[a].n = Cofing[a].nAcum / 4;
        console.log(Cofing[a])

    });
    // //console.log(consulta)
}

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
    calculoDeN
}