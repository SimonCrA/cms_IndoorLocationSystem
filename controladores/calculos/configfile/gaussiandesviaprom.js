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


let desviacionEstandarGaussiana = async (muestras, distancia, macrpi, mactag, iteracion) => {
    console.log("ENTRAMOS A CALCULO DE DesviacionEstandarGaussiana");

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
        if(rawdata[0] === undefined){
            console.log(`No se puede realizar calculos de respvgcde para;
            \n macRasp:${macrpi} ,  MacTag:${mactag} ,  Distancia:${distancia}`);
        }else{
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
    
          
    

        }


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