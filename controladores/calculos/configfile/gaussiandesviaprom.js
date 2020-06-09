const RawDataM = require('../../../models/rawdatamuestras');
const RSSIprom = require('../configfile/rssiprom');

let respvgcde = [{
    sumatoria:0,
    zmgvwsd:0
},{
    sumatoria:0,
    zmgvwsd:0
},{
    sumatoria:0,
    zmgvwsd:0
}]

// respvgcde[0] ={sumatoria:0,zmgvwsd:0}


let gaussianStandardDeviation = async (muestras, distancia, macrpi, mactag, iteracion) => {
    try {
        console.log("ENTRAMOS A CALCULO DE gaussianStandardDeviation");
        let promesaBusquedaGauss = ()=>{
            return new Promise((resolve, reject ) =>{
                RawDataM.find({macRpi:macrpi, macTag:mactag, distance: distancia })
                        .limit(muestras)
                        .sort({_id:-1})
                        .exec( (err,rawdata) => {
            
                    if (err) {
                        reject(err)
                    }
                    if(rawdata[0] === undefined){
                        reject(`No se puede realizar calculos de respvgcde para;
                        \n macRasp:${macrpi} ,  MacTag:${mactag} ,  Distancia:${distancia}`);
                    }else{
                        resolve(rawdata);
                    }
            
            
                });

            })
        } 
        let resultPromesaGauss = await promesaBusquedaGauss().then(rawdata =>{
            
            let rssisum = 0;
            let rssiprom = 0;
            let desviacion = 0;
            let desviacionT = 0;
            
            for (let i = 0; i < muestras; i++) {
                rssisum += rawdata[i].rssi;
            };
    
            rssiprom = rssisum / muestras;
    
            //console.log(rssiprom);
    
            for (let i = 0; i < muestras; i++) {
                desviacion += Math.pow(RSSIprom.respRssi[iteracion] - rssiprom, 2);
            }
            desviacionT = Math.sqrt(desviacion / muestras)
            // console.log('esto es DesviaT= ',desviaT,' de la mac=',mac)

            respvgcde[iteracion].sumatoria += desviacionT
        }, err => {console.log(err);}) 
        // console.log(respvgcde[iteracion]);
        
        return respvgcde[iteracion]
    } catch (error) {
        console.log(error);
        
    }

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
    gaussianStandardDeviation,
    respvgcde
}