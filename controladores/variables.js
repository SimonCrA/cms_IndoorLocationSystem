let globalFilter = [];
let etiqueta = [];
let etiqueta2 = [];

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

let startTrilateracion = [
    {
        a: true
    }
]

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
let jsoCanvas=[]

var paramsValidacionCaract = [{distError: 1, mostrarGrafica: false, signal:false}];




let Users=[
//     {
//     sessionId:'',
//     constantes:{nPropagacion:1,
//                 desviacionEstandar:1,
//                 rssiProm:1},
//     graphRaw:[{name:'',
//                 data:[{x:1,y:1}]
//             }],
//     graphValidator:[{name:'',
//                     data:[{x:1, y:1}]}],
//     region:{id:'',
//             rpi:[]},
    
// }
]
let timeTLM = 3600000

let nameFile= ['']


// conversion : (3.281)p = 1m


/// 0.3048m = 1m

let conversorM_P = (metro)=>{
    let pie = 3.281;
    return (metro * pie).toFixed(2);
    
}
let conversorP_M = (pie)=>{
    let metro = 0.3048;
    return (metro * pie).toFixed(2);

}


module.exports = {
    conversorM_P, conversorP_M,
    globalFilter,timeTLM,nameFile,
    globalDataGraphDistance,
    Users,
    globalDataGraphDistanceDos,
    paramsValidacionCaract,
    etiqueta2,
    globalDataGraph,
    jsoCanvas,
    globalDataGraphDos,
    etiqueta, startTrilateracion

}