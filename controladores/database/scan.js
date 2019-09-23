
const RawData = require('../../models/rawdata');
var Rawdatamuestras = require('../../models/rawdatamuestras');
const Fileconfig = require('../calculos/configfile/configfile');
const filtroKalman = require('../calculos/kalmanfilter');
const {validacion_Trilateracion} = require('../calculos/validacion');
const async = require('async');

const d = require('../calculos/timer')



// let datbul = false
let avisar = false;
let dato = function(req,res,next){
    let dato = new Date().getTime();
	console.log(`dato ${dato}`);
	
}


let processDataFromRpi = async (data) => {
	
	let rawDataRaspi = new Array();
	const categoriaFiltrada = [];
	rawDataRaspi = data;
	// console.log(rawDataRaspi)
	// rawDataRaspi[0].mac
	rawDataRaspi.forEach(categoria => {
		
		if (!categoriaFiltrada.find(data => data.mactag === categoria.mactag)) {
			const  { mactag } = categoria;
			categoriaFiltrada.push({mactag})
			
		}
	});
	// console.log(categoriaFiltrada);
	let resp;
	for (let i = 0; i < categoriaFiltrada.length; i++) {

		let dataToSendToKalmanF = rawDataRaspi.filter(data => data.mactag == categoriaFiltrada[i].mactag);
		
		// console.log(dataToSendToKalmanF.length);
		
		resp = await filtroKalman.filtrado(dataToSendToKalmanF);
		// console.log(`scan ${JSON.stringify(resp, null, 2)}`);
			
		
	}
		
	if(resp.ok === true){
		// validacion_Trilateracion();
		
		d.tiempoEspera();
		
		// console.log(gobalabv.Xgloball);
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




let rpi = function(req, res, next) {	
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


module.exports = {
	processDataFromRpi,
	rpi,
	dato, avisar

}