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
    let muestras = 100;
    let cantidad_Muestras = req.params.cantmuestras
   

   infoUbicacionRpi.find({idZona:region}).exec( async (err,macrpi) => {
        if(err){console.log(err);}
        let cont=0;
        // console.log(macrpi);
        for(let i=0; i<macrpi.length;i++){
            /* *****************************************
            *	Calculo de Rssi Promedio
            /* *****************************************/
            cont++;
            console.log(`${cont}`.blue);
            console.log(`MACRPI:${macrpi[i].macRpi}`.green);
            RSSIprom.rssiProm(muestras, 1, macrpi[i].macRpi, tag, i);
            await sleep(5000);
            cont++;
            console.log(RSSIprom.respRssi);
            console.log(`${cont}`.blue);

            /* *****************************************
            *	            CALCULO DE
            *	Desviacion Estandar Gaussiana
            /* *****************************************/

            for (let j = 0 ; j<cantidad_Muestras; j ++){
                gaussDesviaProm.desviacionEstandarGaussiana(muestras, j+ 1, macrpi[i].macRpi, tag,i);
                await sleep(5000);
                cont++;
                console.log(`${cont}`.blue);
                
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
                
                calculoDeN.calculoDeN(muestras, j+1, macrpi[i].macRpi, tag,i);
                await sleep(5000);
                cont++;
                console.log(`${cont}`.blue);
            
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
                nPropagacion: calculoDeN.respN[i].totalN,
                desviacionEstandar: gaussDesviaProm.respvgcde[i].zmgvwsd,
                idRegion:region
    
            });
    
            constantesDeBD.save(function (err){
                if(err){
                    console.log(err);
                    return next(err);
                };
    
                console.log("guarde Esto:\n" + constantesDeBD + "\n");
                // Successful - redirect to new author record.	

            
            });
        
        }

        res.status(200).jsonp({
            result: 'SAVED'
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