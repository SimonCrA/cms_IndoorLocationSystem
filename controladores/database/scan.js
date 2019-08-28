
const RawData = require('../../models/rawdata');
var Rawdatamuestras = require('../../models/rawdatamuestras');
const Fileconfig = require('../calculos/configfile/configfile');
const filtroKalman = require('../calculos/kalmanfilter');
const async = require('async');



exports.dato = function(req,res,next){
    let dato = new Date().getTime();
	console.log(`dato ${dato}`);
	
}


<<<<<<< HEAD
exports.rasptest = function(req, res, next) {
	console.log(req.body.length)
	// console.log(req.body);


	return res.json({
		ok:true
	})


=======
exports.dataRaspi = async (req, res, next)=>{
	
	let rawDataRaspi = new Array();
	const categoriaFiltrada = [];
	rawDataRaspi = req.body;
	// console.log(rawDataRaspi)
	// rawDataRaspi[0].mac
	rawDataRaspi.forEach(categoria => {
		
		if (!categoriaFiltrada.find(data => data.mactag === categoria.mactag)) {
			const  { mactag } = categoria;
			categoriaFiltrada.push({mactag})
			
		}
	});
	console.log(categoriaFiltrada);

	for (let i = 0; i < categoriaFiltrada.length; i++) {

			let dataToSendToKalmanF = rawDataRaspi.filter(data => data.mactag == categoriaFiltrada[i].mactag);

			// console.log(dataToSend.length);
			
			let resp = await filtroKalman.filtrado(dataToSendToKalmanF);
			
			if(resp === true){
				res.status(200).json({
					ok: true,
					status: 200
				})
			}else{
				res.status(400).json({
					ok: false,
					status: 400
				})

			}

		
	}
	
	res.status(200).json({
		ok: true,
	})
>>>>>>> 57e7e88ecb36c2c8bef0e81baf872a9cf8e7023f
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
