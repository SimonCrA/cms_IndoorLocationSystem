let globalFilter = [];
let etiqueta = []

let globalDataGraph = [
    {
    name: 'rssi',
    data:[{x:1, y:1}
    ]
    }
// ,{
//     name: 'dist',
//     data:[{x:2, y:30},
//         {x:3, y:15},
//         {x:4, y:17},
//         {x:5, y:16},
//         {x:6, y:14},
//         {x:7, y:21}
//     ]
// },{
//     name: 'xts',
//     data:[{x:2, y:1},
//         {x:3, y:2},
//         {x:4, y:1},
//         {x:5, y:2.3},
//         {x:6, y:3.3},
//         {x:7, y:1.4}
//     ]
// }
];

console.log((globalDataGraph[0].data).length);

let globalDataGraphDos = [
    {
        name: 'rssi',
        data:[{x:1, y:1}
        ]
        }
];


var paramsValidacionCaract = [{distError: 1, mostrarGrafica: false, signal:false}];

module.exports = {
    globalFilter,
    paramsValidacionCaract,
    globalDataGraph,
    globalDataGraphDos,
    etiqueta

}