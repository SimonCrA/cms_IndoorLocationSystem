
var RawData = require('../../models/rawdata');
var Rawdatamuestras = require('../../models/rawdatamuestras');
const Fileconfig = require('../calculos/configfile/configfile');
var async = require('async');

exports.dato = function(req,res,next){
    let dato = new Date().getTime();
    console.log(`dato ${dato}`);
}


exports.rasptest = function(req, res, next) {
	console.log(req.body);
}


exports.rpi = function(req, res, next) {	
    console.log(`hey u`);
	// console.log('resivo esto:\nMAC: ', req.params.mac,'\nRssi: ',req.params.rssi,'\nMac Rpi: ',req.params.macRpi,'\nFecha: ',req.params.date,'\n BeaconType: ',req.params.beaconType)
	
	var rawData = new RawData({
		macRpi: req.params.macRpi,
		macTag: req.params.macBeacon,        
        // tx: parseInt(req.params.txPower),
		rssi: parseInt(req.params.rssi),
		rpidate: new Date(parseInt(req.params.date)),
		// rpidate: new Date().getTime(),
        beacontype: req.params.beaconType,
        sampleId: req.params.sampleId
	});
	rawData.save(function (err) {
		if (err) { 
			console.log("....:\n"+rawData+"\n");

			console.log(err);
			return next(err); 
			
		}
		console.log("guarde Esto:\n"+rawData+"\n");
		// Successful - redirect to new author record.	
		res.status(200).jsonp({result:'SAVED'});	
		
	});

};





exports.guardarRawDataMuestras = function(req, res, next) {	
	// console.log(`raw data muestras`);
	
	// setTimeout(() => {
		
	// 	RawData.find({macRpi:req.params.macrpi, macTag:req.params.mactag})
	// 		.limit(5).sort({_id:-1})
	// 		.exec((err, callback) =>{
	// 			if (err){console.log(err);}
		
	// 			for (let i = 0; i<callback.length;i++){


	// 				var rawdatamuestras = new Rawdatamuestras({
	// 					macRpi: req.params.macRpi,
	// 					macTag: req.params.macTag,
	// 					rssi: parseInt(callback[i].rssi),
	// 					distancia: parseInt(req.params.distancia),
	// 				});
	// 				rawdatamuestras.save(function (err) {
	// 					if (err) { 
	// 						console.log("....:\n"+rawdatamuestras+"\n");
				
	// 						console.log(err);
							
	// 					}
	// 					console.log("guarde Esto:\n"+rawdatamuestras+"\n");
	// 					// Successful - redirect to new author record.	
						
	// 				});

	// 				await Fileconfig.sleep(200);
	// 			}
	// 			res.status(200).jsonp({result:'SAVED'});	

	// 		});
				

	// }, 5000);






};