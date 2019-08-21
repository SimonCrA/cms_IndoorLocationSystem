
const RSSIprom = require('../configfile/rssiprom');
const calculoDeN = require('../configfile/calculodeN');
const desviacion = require('../configfile/gaussiandesviaprom');
const macTags = require('../../regions');
const RawData = require('../../../models/rawdata');

function inicializarVariables() {
    varsConfFile[0].rssiprom = 0;
    varsConfFile[0].n = 0;
    varsConfFile[0].C = 0;
    varsConfFile[0].Cprom = 0;
    varsConfFile[0].desviap = 0;
    varsConfFile[0].nAcum = 0
    varsConfFile[1].rssiprom = 0;
    varsConfFile[1].n = 0;
    varsConfFile[1].C = 0;
    varsConfFile[1].Cprom = 0;
    varsConfFile[1].desviap = 0;
    varsConfFile[1].nAcum = 0;
    varsConfFile[2].rssiprom = 0;
    varsConfFile[2].n = 0;
    varsConfFile[2].C = 0;
    varsConfFile[2].Cprom = 0;
    varsConfFile[2].desviap = 0;
    varsConfFile[2].nAcum = 0;

    //validar ubicacion de esta función.
};


function ejecucionFnEnSerie() {
    inicializarVariables()
    muestras= '200',
    sample= ''
    let mac = macTags.addDevicesToMesh.mac;
    console.log('SE HA INICIADO EL CALCULO DE LAS CONSTANTES...', sample, muestras)

    const doLemon = async (qwert) => {
        console.log(qwert)
        await sleep(5000)
        console.log('1/30')
        mac = meshUno[0].mac;
        RSSIprom(muestras, sample + 1, mac)
        await sleep(5000)
        console.log('2/30')

        desviacion(muestras, sample + 1, mac)
        await sleep(5000)
        console.log('3/30')

        desviacion(muestras, sample + 2, mac)
        await sleep(5000)
        console.log('4/30')
        desviacion(muestras, sample + 3, mac)
        await sleep(5000)
        console.log('5/30')
        desviacion(muestras, sample + 4, mac)
        await sleep(5000)
        console.log('6/30')
        desviacion(muestras, sample + 5, mac)
        await sleep(5000)
        console.log('7/30')
        calculoDeN(muestras, sample + 2, mac)
        await sleep(5000)
        console.log('8/30')
        calculoDeN(muestras, sample + 3, mac)
        await sleep(5000)
        console.log('9/30')
        calculoDeN(muestras, sample + 4, mac)
        await sleep(5000)
        console.log('10/30')
        calculoDeN(muestras, sample + 5, mac)
        await sleep(5000)
        console.log('11/30')
        mac = meshUno[1].mac
        RSSIprom(muestras, sample + 1, mac)
        await sleep(5000)
        console.log('12/30')
        desviacion(muestras, sample + 1, mac)
        await sleep(5000)
        console.log('13/30')
        desviacion(muestras, sample + 2, mac)
        await sleep(5000)
        console.log('14/30')
        desviacion(muestras, sample + 3, mac)
        await sleep(5000)
        console.log('15/30')
        desviacion(muestras, sample + 4, mac)
        await sleep(5000)
        console.log('16/30')
        desviacion(muestras, sample + 5, mac)
        await sleep(5000)
        console.log('17/30')
        calculoDeN(muestras, sample + 2, mac)
        await sleep(5000)
        console.log('18/30')
        calculoDeN(muestras, sample + 3, mac)
        await sleep(5000)
        console.log('19/30')
        calculoDeN(muestras, sample + 4, mac)
        await sleep(5000)
        console.log('20/30')
        calculoDeN(muestras, sample + 5, mac)
        await sleep(5000)
        console.log('21/30')
        mac = meshUno[2].mac
        RSSIprom(muestras, sample + 1, mac)
        await sleep(5000)
        console.log('22/30')
        desviacion(muestras, sample + 1, mac)
        await sleep(5000)
        console.log('23/30')
        desviacion(muestras, sample + 2, mac)
        await sleep(5000)
        console.log('24/30')
        desviacion(muestras, sample + 3, mac)
        await sleep(5000)
        console.log('25/30')
        desviacion(muestras, sample + 4, mac)
        await sleep(5000)
        console.log('26/30')
        desviacion(muestras, sample + 5, mac)
        await sleep(5000)
        console.log('27/30')
        calculoDeN(muestras, sample + 2, mac)
        await sleep(5000)
        console.log('28/30')
        calculoDeN(muestras, sample + 3, mac)
        await sleep(5000)
        console.log('29/30')
        calculoDeN(muestras, sample + 4, mac)
        await sleep(5000)
        console.log('30/30')
        calculoDeN(muestras, sample + 5, mac)
        await sleep(5000)
        console.log('31/31')
        var consulta = $.get("../../../../api/guardarConstantes/" + varsConfFile[0].mac + 
                                "/" + varsConfFile[0].n + "/" + varsConfFile[0].rssiprom +
                                '/' + varsConfFile[0].C + '/' + varsConfFile[0].mesh +
                                '/' +sample, function () {data = consulta.responseJSON;})
        await sleep(5000)
        console.log('32/33')
        var consulta = $.get("../../../../api/guardarConstantes/" + varsConfFile[1].mac +
                                "/" + varsConfFile[1].n + "/" + varsConfFile[1].rssiprom + 
                                '/' + varsConfFile[1].C + '/' + varsConfFile[1].mesh + 
                                '/' + sample, function () {data = consulta.responseJSON;})
        await sleep(5000)
        console.log('33/33')
        var consulta = $.get("../../../../api/guardarConstantes/" + varsConfFile[2].mac +
                                "/" + varsConfFile[2].n + "/" + varsConfFile[2].rssiprom +
                                '/' + varsConfFile[2].C + '/' + varsConfFile[2].mesh +
                                '/' + sample, function () {data = consulta.responseJSON;})

    }
    doLemon('hola soy qqwery')
    // console.log(varsConfFile[3])
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
    //consult
}


/***************************************
 * variable modificadas:
 * cofing = varsconfFile
 * inicializar = incializarVariables
 * conf = ejecucionFnEnSerie
 * 
 * 
 * El documento ahora quedará
 * en partes, ver carpeta configFile
 * cada cálculo en un archivo.
 **************************************/

 module.exports = {
     inicializarVariables,
     ejecucionFnEnSerie 
 }