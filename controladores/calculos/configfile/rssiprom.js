const RawDataM = require('../../../models/rawdatamuestras');

let respRssi = new Array();


let  rssiProm = async (muestras, distancia, macrpi, mactag , iteracion) => {
    try{
        
        console.log("ENTRAMOS A RSSIPROM")
        let rssisum1 = 0;
        let promesaBusqueda = () =>{
            return new Promise((resolve, reject ) =>{
                RawDataM.find({macRpi:macrpi, macTag:mactag, distance: distancia })
                .limit(muestras)
                .sort({_id:-1})
                .exec( (err,rawdata) => {

                    if (err){
                        reject(err)
                    }
                    if(rawdata[0] === undefined){
                        reject(`No se puede realizar calculos de RSSI Promedio para;
                        \n macRasp:${macrpi} ,  MacTag:${mactag} ,  Distancia:${distancia}`)
                    }
                    else
                        {resolve(rawdata);
                    }
                })

            })

        }

        let resultPromiseRssi = await promesaBusqueda().then(rawdata=>{
            for (var i = 0; i < muestras; i++) {
                ////console.log('s')
                rssisum1 += rawdata[i].rssi;
            }
            let rssiprom = rssisum1 / muestras
            // console.log(rssiprom);

            respRssi[iteracion] = rssiprom;

            return respRssi[iteracion];
        }, err =>{

            console.log(`Error: ${JSON.stringify(err)}`);
        } )

        


    
        
    }catch(e){


    }

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
    rssiProm,
    respRssi 
}