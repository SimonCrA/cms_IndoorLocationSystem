const infoUbicacionRpi = require('../../../models/ubicacion')
const Zona = require('../../../models/zona')
const RSSIprom = require('../configfile/rssiprom');
const calculoDeN = require('../configfile/calculodeN');
const gaussDesviaProm = require('../configfile/gaussiandesviaprom');
// const calculoDeN = require('../configfile/calculodeN');
// const desviacion = require('../configfile/gaussiandesviaprom');
// const macTags = require('../../regions');
// const RawData = require('../../../models/rawdata');




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






let ejecucionFnEnSerie = async (req, res, next) =>{

    let region = req.params.region;
    let tag =  req.params.mactag;
    let muestras = 5;
   
   console.log(region);

   infoUbicacionRpi.find({idZona:region}).exec( async (err,macrpi) => {
        if(err){console.log(err);}

        // console.log(macrpi);
        for(let i=0; i<macrpi.length;i++){

            
            console.log('1/30')
            RSSIprom.rssiProm(muestras, 1, macrpi[i].macRpi, tag);
            console.log('2/30')
            await sleep(5000)
            calculoDeN.rssiProm(muestras, 1, macrpi[i].macRpi, tag);
            
            
            await sleep(5000)
            config[i].rssiprom =RSSIprom.resRssi;
            config[i].calculoDeN =calculoDeN.resN;



            // desviacion(muestras, sample + 1, macrpi[i].macRpi, tag)
            // await sleep(5000)
            // console.log('3/30')

            // desviacion(muestras, sample + 2, macrpi[i].macRpi, tag);
            // await sleep(5000)
            // console.log('4/30')
            // desviacion(muestras, sample + 3, macrpi[i].macRpi, tag)
            // await sleep(5000)
            // console.log('5/30')
            // desviacion(muestras, sample + 4, macrpi[i].macRpi, tag)
            // await sleep(5000)
            // console.log('6/30')
            // desviacion(muestras, sample + 5, macrpi[i].macRpi, tag)
            // await sleep(5000)
            // console.log('7/30')
            // calculoDeN(muestras, sample + 2, macrpi[i].macRpi, tag)
            // await sleep(5000)
            // console.log('8/30')
            // calculoDeN(muestras, sample + 3, macrpi[i].macRpi, tag)
            // await sleep(5000)
            // console.log('9/30')
            // calculoDeN(muestras, sample + 4, macrpi[i].macRpi, tag)
            // await sleep(5000)
            // console.log('10/30')
            // calculoDeN(muestras, sample + 5, macrpi[i].macRpi, tag)
            // await sleep(5000)
            // console.log('11/30')






        }
        















    });
   
   
   
    // let mactag = req.params.mactag;
    // let macrpi = req.params.macrpi;


    // console.log(qwert)
    // await sleep(5000)
    // console.log('1/30')
    // mac = meshUno[0].mac;
    // RSSIprom(muestras, sample + 1, mac)
    // await sleep(5000)
    // console.log('2/30')

    // desviacion(muestras, sample + 1, mac)
    // await sleep(5000)
    // console.log('3/30')

    // desviacion(muestras, sample + 2, mac)
    // await sleep(5000)
    // console.log('4/30')
    // desviacion(muestras, sample + 3, mac)
    // await sleep(5000)
    // console.log('5/30')
    // desviacion(muestras, sample + 4, mac)
    // await sleep(5000)
    // console.log('6/30')
    // desviacion(muestras, sample + 5, mac)
    // await sleep(5000)
    // console.log('7/30')
    // calculoDeN(muestras, sample + 2, mac)
    // await sleep(5000)
    // console.log('8/30')
    // calculoDeN(muestras, sample + 3, mac)
    // await sleep(5000)
    // console.log('9/30')
    // calculoDeN(muestras, sample + 4, mac)
    // await sleep(5000)
    // console.log('10/30')
    // calculoDeN(muestras, sample + 5, mac)
    // await sleep(5000)
    // console.log('11/30')







    // mac = meshUno[1].mac
    // RSSIprom(muestras, sample + 1, mac)
    // await sleep(5000)
    // console.log('12/30')
    // desviacion(muestras, sample + 1, mac)
    // await sleep(5000)
    // console.log('13/30')
    // desviacion(muestras, sample + 2, mac)
    // await sleep(5000)
    // console.log('14/30')
    // desviacion(muestras, sample + 3, mac)
    // await sleep(5000)
    // console.log('15/30')
    // desviacion(muestras, sample + 4, mac)
    // await sleep(5000)
    // console.log('16/30')
    // desviacion(muestras, sample + 5, mac)
    // await sleep(5000)
    // console.log('17/30')
    // calculoDeN(muestras, sample + 2, mac)
    // await sleep(5000)
    // console.log('18/30')
    // calculoDeN(muestras, sample + 3, mac)
    // await sleep(5000)
    // console.log('19/30')
    // calculoDeN(muestras, sample + 4, mac)
    // await sleep(5000)
    // console.log('20/30')
    // calculoDeN(muestras, sample + 5, mac)
    // await sleep(5000)
    // console.log('21/30')
    // mac = meshUno[2].mac
    // RSSIprom(muestras, sample + 1, mac)
    // await sleep(5000)
    // console.log('22/30')
    // desviacion(muestras, sample + 1, mac)
    // await sleep(5000)
    // console.log('23/30')
    // desviacion(muestras, sample + 2, mac)
    // await sleep(5000)
    // console.log('24/30')
    // desviacion(muestras, sample + 3, mac)
    // await sleep(5000)
    // console.log('25/30')
    // desviacion(muestras, sample + 4, mac)
    // await sleep(5000)
    // console.log('26/30')
    // desviacion(muestras, sample + 5, mac)
    // await sleep(5000)
    // console.log('27/30')
    // calculoDeN(muestras, sample + 2, mac)
    // await sleep(5000)
    // console.log('28/30')
    // calculoDeN(muestras, sample + 3, mac)
    // await sleep(5000)
    // console.log('29/30')
    // calculoDeN(muestras, sample + 4, mac)
    // await sleep(5000)
    // console.log('30/30')
    // calculoDeN(muestras, sample + 5, mac)
    // await sleep(5000)
    // console.log('31/31')
    // var consulta = $.get("../../../../api/guardarConstantes/" + varsConfFile[0].mac + 
    //                         "/" + varsConfFile[0].n + "/" + varsConfFile[0].rssiprom +
    //                         '/' + varsConfFile[0].C + '/' + varsConfFile[0].mesh +
    //                         '/' +sample, function () {data = consulta.responseJSON;})
    // await sleep(5000)
    // console.log('32/33')
    // var consulta = $.get("../../../../api/guardarConstantes/" + varsConfFile[1].mac +
    //                         "/" + varsConfFile[1].n + "/" + varsConfFile[1].rssiprom + 
    //                         '/' + varsConfFile[1].C + '/' + varsConfFile[1].mesh + 
    //                         '/' + sample, function () {data = consulta.responseJSON;})
    // await sleep(5000)
    // console.log('33/33')
    // var consulta = $.get("../../../../api/guardarConstantes/" + varsConfFile[2].mac +
    //                         "/" + varsConfFile[2].n + "/" + varsConfFile[2].rssiprom +
    //                         '/' + varsConfFile[2].C + '/' + varsConfFile[2].mesh +
    //                         '/' + sample, function () {data = consulta.responseJSON;})


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
    //  inicializarVariables,
     ejecucionFnEnSerie ,
     guardarzona,
     guardarubicacion
 }