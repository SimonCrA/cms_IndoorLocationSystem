const infoUbicacionRpi = require('../../../models/ubicacion')
const Zona = require('../../../models/zona')
const RSSIprom = require('../configfile/rssiprom');
const calculoDeN = require('../configfile/calculodeN');
const gaussDesviaProm = require('../configfile/gaussiandesviaprom'); 
// const desviacion = require('../configfile/gaussiandesviaprom');
// const macTags = require('../../regions');
const ConstsDistancia = require('../../../models/constantesdistancia');

let guardarzona = (req, res, next) =>{

    var zona = new Zona({
		edificio: req.params.edif,
		piso: req.params.piso,        
		oficina: req.params.oficina,
		tipodeZona: req.params.tipo
		
	});
	zona.save(function (err) {
		if (err) { 
			

			console.log(err);
			return next(err); 
			
		}
		console.log("guarde Esto:\n"+zona+"\n");
		// Successful - redirect to new author record.	
		res.status(200).jsonp({result:'SAVED'});	
		
	});

}

let guardarubicacion = (req, res, next) =>{


    Zona.find({edificio:req.params.edif}).exec((err, dato)=>{
        if(err){console.log(err);}

        let ubicacion = new infoUbicacionRpi ({
            macRpi: req.params.macrpi,
            axis: "x",
            xpos: 1.10,
            ypos: 0,
            idZona:dato[0]._id
    
    
        });

        ubicacion.save(function (err) {
            if (err) { 
                
    
                console.log(err);
                return next(err); 
                
            }
            console.log("guarde Esto:\n"+ubicacion+"\n");
            // Successful - redirect to new author record.	
            res.status(200).jsonp({result:'SAVED'});	
            
        });

    })
}

let ejecucionFnEnSerie = (req, res, next) =>{

    let region = req.params.region;
    let tag =  req.params.mactag;
    let muestras = 5;
   
   console.log(region);

   infoUbicacionRpi.find({idZona:region}).exec( async (err,macrpi) => {
        if(err){console.log(err);}

        // console.log(macrpi);
        for(let i=0; i<macrpi.length;i++){
            
            console.log('1/30');
            RSSIprom.rssiProm(muestras, 1, macrpi[i].macRpi, tag);
            console.log('2/30');
            await sleep(5000);
            gaussDesviaProm.desviacionEstandarGaussiana(muestras, 1, macrpi[i].macRpi, tag);
            console.log('3/30');
            await sleep(5000);
            calculoDeN.calculoDeN(muestras, 1, macrpi[i].macRpi, tag);
            console.log('4/30');
            await sleep(5000);

        };

        let constantesDeBD = new ConstsDistancia({

            macrpi: macrpi,
            mactag:  mactag,
            nPropagacion: calculoDeN.calculoDeN,
            rssiProm: RSSIprom.rssiProm,
            desviacionEstandar: gaussDesviaProm.desviacionEstandarGaussiana,

        });

        constantesDeBD.save(function (err){
            if(err){
                console.log(err);
                return next(err);
            };

            console.log("guarde Esto:\n" + ubicacion + "\n");
            // Successful - redirect to new author record.	
            res.status(200).jsonp({
                result: 'SAVED'
            });
        
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
     ejecucionFnEnSerie ,
     guardarzona,
     guardarubicacion,sleep
 }