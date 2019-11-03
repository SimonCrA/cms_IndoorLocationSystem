const RawDataM = require('../../../models/rawdatamuestras');
const RSSIprom = require('../configfile/rssiprom');
const gaussDesviaProm = require('../configfile/gaussiandesviaprom');



let respN=[
    {sumatoriaN:0, totalN:0},
    {sumatoriaN:0, totalN:0,},
    {sumatoriaN:0, totalN:0}]



let  calculoDeN = async (muestras, distancia, macrpi, mactag, iteracion ) => {
    try {
        console.log("ENTRAMOS A calculo De Constante de Propagacion N");
        let promesabusquedaN = () =>{
            return new Promise((resolve, reject ) =>{
                RawDataM.find({macRpi:macrpi, macTag:mactag, distancia: distancia })
                            .limit(muestras)
                            .sort({_id:-1})
                            .exec( (err,rawdata) => {
            
                        if (err) {
                            reject(err);
                        }
                        if(rawdata[0] === undefined){
                            reject(`No se puede realizar calculos de Calculo de N para;
                            \n macRasp:${macrpi} ,  MacTag:${mactag} ,  Distancia:${distancia}`);
                        }else{
                            resolve(rawdata);
                        }
            
             
                    });

            });
        }
        let resultCalculoN = await promesabusquedaN().then(rawdata =>{

            let nsum = 0;
            let totalN =0;
            for (let j = 0; j < muestras; j++) {
                if (rawdata[j].distancia > 1) {
                    nsum += (-(rawdata[j].rssi) + RSSIprom.respRssi[iteracion] + gaussDesviaProm.respvgcde[iteracion].zmgvwsd) / (10 * Math.log10(rawdata[j].distancia))
                    // console.log(`(-(${rawdata[j].rssi}) + ${RSSIprom.respRssi[iteracion]} + ${gaussDesviaProm.respvgcde[iteracion].zmgvwsd}) / (10 * ${Math.log10(rawdata[j].distancia)})`);
                }
        
            }
            // console.log(`Muestra nsum: ${nsum}`);
            totalN = nsum / muestras;
            respN[iteracion].sumatoriaN += totalN;
        }, err => {console.log(err);})
        return respN[iteracion] 
    } catch (error) {
        
    }

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