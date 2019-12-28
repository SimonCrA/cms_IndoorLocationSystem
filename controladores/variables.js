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
    {
    token:'',
    constantes:{nPropagacion:1,
                desviacionEstandar:1,
                rssiProm:1},
    graphRaw:[{name:'',
                data:[{x:1,y:1}]
            }],
    graphValidator:[{name:'',
                    data:[{x:1, y:1}]}],
    region:{id:'',
            rpi:[]},
    
}
]

module.exports = {
    globalFilter,globalDataGraphDistance,Users,globalDataGraphDistanceDos,
    paramsValidacionCaract,etiqueta2,
    globalDataGraph,jsoCanvas,
    globalDataGraphDos,
    etiqueta, startTrilateracion

}