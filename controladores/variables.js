let globalFilter = [];
let etiqueta = []
let etiqueta2 = []

let globalDataGraph = [
    {
    name: 'rssi',
    data:[{x:1, y:1}
    ]
    }

];

console.log((globalDataGraph[0].data).length);

let globalDataGraphDos = [
    {
        name: 'rssi',
        data:[{x:1, y:1}
        ]
        }
];

let globalDataGraphDistance = [
    {
        name: 'rssi',
        data:[{x:1, y:1}
        ]
        }
];
let globalDataGraphDistanceDos = [
    {
        name: 'rssi',
        data:[{x:1, y:1}
        ]
        }
];


var paramsValidacionCaract = [{distError: 4, mostrarGrafica: false, signal:false}];

module.exports = {
    globalFilter,globalDataGraphDistance,globalDataGraphDistanceDos,
    paramsValidacionCaract,etiqueta2,
    globalDataGraph,
    globalDataGraphDos,
    etiqueta

}