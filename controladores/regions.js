var beaconM11 = {
    name: "Lemon O",
    mac: "D2:61:39:CF:C1:26",
    axis: "o",
    xpos: 0,
    ypos: 0,
    mesh: 0
};
var beaconM12 = {
    name: "Candy X",
    mac: "DA:93:A5:A9:62:1F",
    axis: "x",
    xpos: 2.10,
    ypos: 0,
    mesh: 0
};
var beaconM13 = {
    name: "Beetroot Y",
    mac: "E0:32:1F:95:E5:62",
    axis: "y",
    xpos: 0,
    ypos: 2.40,
    mesh: 0
};

var beaconM21 = {
    name: "Beetroot O",
    mac: "ED:22:F2:71:55:16",
    axis: "o",
    xpos: 0,
    ypos: 0,
    mesh: 1
};
var beaconM22 = {
    name: "Candy X",
    mac: "E4:56:FD:95:D5:F7",
    axis: "x",
    xpos: 4.0,
    ypos: 0,
    mesh: 1
};
var beaconM23 = {
    name: "Limon Y",
    mac: "C3:2E:EA:43:2B:E9",
    axis: "y",
    xpos: 0,
    ypos: 4.0,
    mesh: 1
};

var beaconRP1 = {
    name: "beetroot",
    mac: "ee:23:f3:72:56:17",
    axis: "o",
    xpos: 0,
    ypos: 0,
    mesh: 1
};
var beaconRP2 = {
    name: "Lemon  ",
    mac: "c4:2f:eb:44:2c:ea",
    axis: "x",
    xpos: 4.0,
    ypos: 0,
    mesh: 1
};
var beaconRP3 = {
    name: "Candy  ",
    mac: "e5:57:fe:96:d6:f8",
    axis: "y",
    xpos: 0,
    ypos: 4.0,
    mesh: 1
};

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