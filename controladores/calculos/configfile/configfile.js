const infoUbicacionRpi = require('../../../models/ubicacion')
const Zona = require('../../../models/zona')
const RSSIprom = require('../configfile/rssiprom');
const calculoDeN = require('../configfile/calculodeN');
const gaussDesviaProm = require('../configfile/gaussiandesviaprom'); 
// const desviacion = require('../configfile/gaussiandesviaprom');
// const macTags = require('../../regions');
const ConstsDistancia = require('../../../models/constantesdistancia');
const colors = require('colors')



let ejecucionEnSerie = (req, res, next) =>{
    console.log(req.params);

    let region = req.params.zona;
    let tag =  req.params.tags;
    let muestras = 80;
    let cantidad_Muestras = req.params.cantmuestras
   
    let numeroFinal = (cantidad_Muestras * 6) + (3*2)
   infoUbicacionRpi.find({idZona:region}).exec( async (err,macrpi) => {
        if(err){console.log(err);}
        let cont=0;
        // console.log(macrpi);
        for(let i=0; i<macrpi.length;i++){
            /* *****************************************
            *	Calculo de Rssi Promedio
            /* *****************************************/
            cont++;
            console.log(`${cont}/${numeroFinal}`.blue);
            console.log(`MACRPI:${macrpi[i].macRpi}`.green);
            
            let rssipromedio = await RSSIprom.rssiProm(muestras, 1, macrpi[i].macRpi, tag, i);
            console.log(rssipromedio);
            cont++;
            console.log(RSSIprom.respRssi);
            console.log(`${cont}/${numeroFinal}`.blue);

            /* *****************************************
            *	            CALCULO DE
            *	Desviacion Estandar Gaussiana
            /* *****************************************/

            for (let j = 0 ; j<cantidad_Muestras; j ++){
                let resultGauss = await gaussDesviaProm.gaussianStandardDeviation(muestras, j+ 1, macrpi[i].macRpi, tag,i);
                console.log(resultGauss);
                cont++;
                console.log(`${cont}/${numeroFinal}`.blue);
                
            } ;

            

            let promedioDesviacion = gaussDesviaProm.respvgcde[i].sumatoria / cantidad_Muestras;
            let z = 1.65;
            gaussDesviaProm.respvgcde[i].zmgvwsd = z * promedioDesviacion;

            console.log(gaussDesviaProm.respvgcde[i].zmgvwsd);

            /* *****************************************
            *	            CALCULO DE
            *	Constante de Propagacion { [ ( N ) ] }
            /* *****************************************/
            for (let j = 0 ; j<cantidad_Muestras; j ++){
                
                let resultCalculoN = await calculoDeN.calculoDeN(muestras, j+1, macrpi[i].macRpi, tag,i);
                console.log(resultCalculoN);

                cont++;
                console.log(`${cont}/${numeroFinal}`.blue);
            
            }

            calculoDeN.respN[i].totalN = calculoDeN.respN[i].sumatoriaN / cantidad_Muestras;
            console.log(`Total N es: ${calculoDeN.respN[i].totalN}`);


            /* *****************************************
            *	Guardar en Base de datos las constantes
            *	para realizar el calculo de distancia
            /* *****************************************/

            
            let constantesDeBD = new ConstsDistancia({
    
                macRpi: macrpi[i].macRpi,
                macTag:  tag,
                rssiProm: RSSIprom.respRssi[i],
                propagationN: calculoDeN.respN[i].totalN,
                standardDeviation: gaussDesviaProm.respvgcde[i].zmgvwsd,
                idRegion:region,
                type: 'generado'
    
            });
    
            constantesDeBD.save(function (err){
                if(err){
                    console.log(err);
                    return next(err);
                };
    
                // console.log("guarde Esto:\n" + constantesDeBD + "\n");

            
            });

            let constantesDeB = new ConstsDistancia({
    
                macRpi: macrpi[i].macRpi,
                macTag:  tag,
                rssiProm: RSSIprom.respRssi[i],
                propagationN: calculoDeN.respN[i].totalN,
                standardDeviation: gaussDesviaProm.respvgcde[i].zmgvwsd,
                idRegion:region,
                type: 'seleccionado'
    
            });
    
            constantesDeB.save(function (err){
                if(err){
                    console.log(err);
                    return next(err);
                };
    
                // console.log("guarde Esto:\n" + constantesDeBD + "\n");

            
            });
        
        }

        res.status(200).jsonp({

            result: 'Finished'


        });


    });

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
 * doLemon = llamarArchivosDeConfig
 * 
 * 
 * El documento ahora quedará
 * en partes, ver carpeta configFile
 * cada cálculo en un archivo.
 **************************************/

 module.exports = {
    ejecucionEnSerie ,
    sleep
 }






//  {
//     "_id" : ObjectId("5d8bdbd89338a508e858e09c"),
//     "macRpi" : "b8:27:eb:bd:36:61",
//     "macTag" : "c4:4f:33:0b:35:23",
//     "rssiProm" : -59.13,
//     "propagationN" : 4.55347085397453,
//     "standardDeviation" : 13.3551,
//     "idRegion" : "5d716b1a1d173a0d68dfc699",
//     "__v" : 0
// }








// {
    
//     "macRpi" : "b8:27:eb:bd:36:61",
//     "macTag" : "c4:4f:33:0b:35:23",
//     "rssiProm" : -59.13,
//     "propagationN" : 4.55347085397453,
//     "standardDeviation" : 13.3551,
//     "idRegion" : "5d68150b83e5ee05cc9a1eb3",
//     "test" : "1"
// }


// {
    
//     "macRpi" : "b8:27:eb:d4:04:c9",
//     "macTag" : "c4:4f:33:0b:35:23",
//     "rssiProm" : -59.13,
//     "propagationN" : 4.55347085397453,
//     "standardDeviation" : 13.3551,
//     "idRegion" : "5d68150b83e5ee05cc9a1eb3",
//     "test" : "1"
// }

// {
    
//     "macRpi" : "b8:27:eb:de:9f:60",
//     "macTag" : "c4:4f:33:0b:35:23",
//     "rssiProm" : -59.13,
//     "propagationN" : 4.55347085397453,
//     "standardDeviation" : 13.3551,
//     "idRegion" : "5d68150b83e5ee05cc9a1eb3",
//     "test" : "1"
// }