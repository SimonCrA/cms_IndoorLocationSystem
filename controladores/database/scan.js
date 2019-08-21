
var RaspData = require('../../models/rawdata');
var async = require('async');

exports.dato = function(req,res,next){
    let dato = new Date().getTime();
    console.log(`dato ${dato}`);
}
exports.rpi = function(req, res, next) {	
    console.log(`hey u`);
	// console.log('resivo esto:\nMAC: ', req.params.mac,'\nRssi: ',req.params.rssi,'\nMac Rpi: ',req.params.macRpi,'\nFecha: ',req.params.date,'\n BeaconType: ',req.params.beaconType)
	
	var raspData = new RaspData({
		macRpi: req.params.macRpi,
		macTag: req.params.macBeacon,        
        // tx: parseInt(req.params.txPower),
		rssi: parseInt(req.params.rssi),
		rpidate: new Date(parseInt(req.params.date)),
		// rpidate: new Date().getTime(),
        beacontype: req.params.beaconType,
        sampleId: req.params.sampleId
	});
	raspData.save(function (err) {
		if (err) { 
			console.log("....:\n"+raspData+"\n");

			console.log(err);
			return next(err); 
			
		}
		console.log("guarde Esto:\n"+raspData+"\n");
		// Successful - redirect to new author record.	
		res.status(200).jsonp({result:'SAVED'});	
		
	});

		
	
	
	

};