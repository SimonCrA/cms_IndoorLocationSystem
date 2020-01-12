
const RawData = require('../../models/rawdata');
var Rawdatamuestras = require('../../models/rawdatamuestras');
const Fileconfig = require('../calculos/configfile/configfile');
const filtroKalman = require('../calculos/kalmanfilter');
const {validacion_Trilateracion} = require('../calculos/validacion');
const async = require('async');
var {paramsValidacionCaract, variablel1} = require('../variables');
const TagInfo = require ('../../models/tagInfo')

const d = require('../calculos/timer');



// let datbul = false
let avisar = false;
let dato = function(req,res,next){
    let dato = new Date().getTime();
	console.log(`dato ${dato}`);
	
}


let processDataFromRpi = async (data) => {
	let respuesta;
	// console.log(data);
	if(Array.isArray(data) && data.length){
		
		
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
				
				// console.log(dataToSendToKalmanF);
				
				resp = await filtroKalman.filtrado(dataToSendToKalmanF);
				// console.log(`scan ${JSON.stringify(resp, null, 2)}`);
					
				
			}
				
			if(resp.ok === true){
				// validacion_Trilateracion();
				
				
				// console.log(gobalabv.Xgloball);
				respuesta ={
					ok: true,
					status: 200
				}
				// console.log(respuesta);
			}else{
				respuesta = {
					ok: false,
					status: 400
				}
				// console.log(respuesta);
		
			}
		

	
	}
	else {
		console.log(`data from raspberry is`+` EMPTY`);
	}

}




let processGossipFromRpi = async (data) => {
	//Esta función se ejecutará cada vez que el raspi envíe nueva data
	//entonces recibe la data, y la compara con la base de datos
	//para así poder actualizar sólo los valores de telemetría de los tags
	//que están enviando o están siendo escaneados por el raspi.

	
	try {
		return new Promise(async(resolve, reject) => {
		
		
		
			let mactagTLM = ''
			let arrMactagTLM = [];
			let buscarTag = (dataTLM) => {
				return new Promise(  (resolve, reject) => {
	
					mactagTLM = dataTLM.mactag;
	
					TagInfo.find({mactag: mactagTLM})
						.exec((err, tagDB) => {
							// console.log(`TAGINFO`);
							// console.log(tagDB);
							if (err) {
								return reject({
									ok: false,
									err
								});
							}
							if (Array.isArray(tagDB) && tagDB.length) {
							
								return resolve({
									ok: true,
									tagDB
								})
							}else{
								return reject({
									ok: false,
									err: {
										msg: 'No hay tags registrados'
									}
								});
	
							}
							
						})
	
			})
	
			}
			for (let i = 0; i < data.length; i++) {
				
				
				let resultTagsFound = await buscarTag(data[i]);
	
				arrMactagTLM.push(resultTagsFound);
	
				
			}
	
			
			let id = '';
			let body = {};
	
			for (let i = 0; i < arrMactagTLM.length; i++) {
				
				id = arrMactagTLM[i].tagDB._id;
				body = {
					temperature: arrMactagTLM[i].tagDB.temperature,
					batteryLevel: arrMactagTLM[i].tagDB.batteryLevel
				}
	
				TagInfo.findByIdAndUpdate(id, body, {new:true, runValidators:true }, (err, tagActualizado)=>{
					if (err) {
						return reject({
							ok: false,
							err
						})
					}
					
					if (Array.isArray(tagActualizado) && tagActualizado.length) {
						console.log(tagActualizado);
						return resolve( {
							ok: true
						})
	
					}else{
						return reject({
							ok: false,
							err: {
								msg: 'no hay tags disponibles en la base de datos'
							}
						})
	
					}
	
	
				});
	
			}
		});

	} catch (error) {
		console.log(error);
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

let cambiar = (req, res, next) =>{

	paramsValidacionCaract[0].distError = parseInt(req.params.derror)
	// console.log(paramsValidacionCaract);
	
	return res.status(200)

}
let cambiar2 = (req, res, next) =>{
	

	paramsValidacionCaract[0].mostrarGrafica = true

	// console.log(paramsValidacionCaract);
	return res.status(200)

}

module.exports = {
	cambiar,
	cambiar2,
	processDataFromRpi,
	rpi,
	dato, avisar,
	processGossipFromRpi

}