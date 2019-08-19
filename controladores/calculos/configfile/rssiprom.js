const configfile = require('../configfile/configfile');

function RSSIprom(muestras, sample, mac) {
    // //console.log("ENTRAMOS A RSSIPROM")
    var rssiprom1 = 0
    var rssisum1 = 0
    var data;
    var a = 10;
    ////console.log('s='+muestras+ sample+ mac)
    var consulta = $.get("../../../../api/rssiprom/" + muestras + "/" + sample + "/" + mac, function () {
        data = consulta.responseJSON;
        datrssi = data.rssi[1].rssi
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
        var nsum;
        // var n;
        //console.log(data)
        for (var i = 0; i < muestras; i++) {
            ////console.log('s')
            rssisum1 += data.rssi[i].rssi

        }
        rssiprom1 = rssisum1 / muestras
        Cofing[a].rssiprom = rssiprom1;

        // console.log(Cofing[a])

    });

}

module.exports = {
    RSSIprom
}