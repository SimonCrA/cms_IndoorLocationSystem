const InfoUbicacion = require('../models/ubicacion');



        let da= InfoUbicacion.find({ })
                    .exec( (err,infoUbicacion) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            data = {
                name:infoUbicacion[9].name,
                
                mac: macRpi,
                axis,
                xpos,
                ypos,
                idzona,
                region
            };


        });

var beaconESP1 = {
    name: "ESP 32-1",
    mac: "c4:4f:33:0b:aa:1b",
    axis: "o",
    xpos: 0,
    ypos: 0,
    mesh: 1
};
var beaconESP2 = {
    name: "ESP 32-2",
    mac: "cc:50:e3:a9:8e:d6",
    axis: "x",
    xpos: 4.0,
    ypos: 0,
    mesh: 1
};
var beaconESP3 = {
    name: "ESP 32-3",
    mac: "c4:4f:33:0b:35:23",
    axis: "y",
    xpos: 0,
    ypos: 4.0,
    mesh: 1
};
var beaconESP4 = {
    name: "samsung",
    mac: "....",
    axis: "y2",
    xpos: 0,
    ypos: 4.0,
    mesh: 1
};


var meshUno = new Array();

var changeMesh = false;
var currentMesh = -1;



var validDevices = 0;
var arrValidDevices = new Array();

meshUno.push(beaconESP1);
meshUno.push(beaconESP2);
meshUno.push(beaconESP3);
meshUno.push(beaconESP4);

var globalIteracion = 0;
//console.log(meshUno);



let addDevicesToMesh = (arr) => {
    console.log('aniadiendo --->', arr)
    var meshE = new Array();
    for (var i = 0; i < arr.length; i++) {
        var macDevice = arr[i].mac;
        for (var j = 0; j < meshUno.length; j++) {
            var macMesh = meshUno[j].mac;
            if (macMesh == macDevice) {
                meshE.push({
                    mesh: meshUno[j].mesh,
                    name: meshUno[j].name,
                    mac: meshUno[j].mac,
                    axis: meshUno[j].axis,
                    rssi: arr[i].rssi,
                    xpos: meshUno[j].xpos,
                    ypos: meshUno[j].ypos
                });
            }
        }
    }
    return meshE;
}

let sameMeshValidate = (arr) => {
    for (var i = 1; i < arr.length; i++) {
        var idMesh = arr[i].mesh;
        if (arr[i - 1].mesh != idMesh)
            return false;
    }
    return true;
}

module.exports = {
    addDevicesToMesh,
    sameMeshValidate
}