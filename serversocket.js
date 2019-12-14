// var socket_io = require('socket.io');
// var io = socket_io();
// var socketApi = {};
let client_countOld=0;
let client_count=0

const {processDataFromRpi} = require('./controladores/database/scan')
const {rawCaracterizacion} = require('./controladores/database/guardarbd')
let {globalDataGraph, globalDataGraphDos, globalDataGraphDistance,jsoCanvas,
    globalDataGraphDistanceDos, DistanciaError, paramsValidacionCaract, etiqueta,Users} = require('./controladores/variables')

const { io } = require('./bin/www');
let {startTrilateracion} = require('./controladores/variables')
const {iniciarValidacion} = require('./controladores/calculos/timer')
const {regionId} = require('./controladores/database/getdb')


var test = -1
var test2 = -1


let libreta=[];


byClient = new Map();
let dato = (id, mac, token) =>{
    let json
    if(token){
        json={socketID:id,  token }
        
    }
    else {
        json={socketID:id, mac, stat:false}

    }

    let findIt = libreta.findIndex(tarea =>tarea.socketID === id);
    let findIt2 = libreta.findIndex(tarea =>tarea.token === token);
    if(findIt>=0){
        console.log(`Socket.ID: (${id})||Mac: (${mac})`);
    }else{
        // if(findIt2>=0){
        //     libreta[findIt2].socketID=id;
        //     if(Users.length==1){
        //         Users[0].token=token;

        //     }
        //     // console.log(libreta);
        //     // console.log(Users);


        // }else{
            // let usr={
            //     token:token,
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
            // if(Users.length==1){
            //     Users[0].token=token;

            // }else{
            //     Users.push(usr)
            
            // }
            libreta.push(json)
            console.log(libreta);
            // console.log(JSON.stringify(Users,null, ' '));
            
            // }
            
        }
        
    }
    io.emit('test1', 'test');
let sendAccion = (js)=>{
    console.log(js);
    io.to(js.id).emit('accion', js.distancia);
    
}

let startTracking= (aviso) =>{
    
    console.log(aviso);
    startTrilateracion[0].a = true
    // validacion_Trilateracion();
    if(aviso.tipo === 'tracking'){
        
        iniciarValidacion() //trilateracion

    }
    io.emit('asset-tracking', aviso);
}
let startValidation= async(aviso) =>{
    try{


        console.log(aviso);
        // startTrilateracion[0].a = true
        // validacion_Trilateracion();
    
        await regionId(aviso.region).then(region=>{
    
            let arr=[]
            console.log(region.region.length);
    
            for (let i = 0; i < region.region.length; i++) {
                
                let resul = libreta.find(fin=>fin.mac === region.region[i].macRpi )
                if(!resul){
                    console.log(`No hay nada`);
                }
                else if(resul.socketID === undefined){
                    console.log(`ERROR: result= ${resul}\n Data= ${data[i]}`);
                }else{

                    let js={id:resul.socketID, tipo:aviso.tipo, mac:region.region[i].macRpi}
                    arr.push(js)
                    // console.log(resul.socketID);  
                        
                    
    
                    // console.log(resul);
                    
                    // console.log(`ID:${socket.id} dice ${JSON.stringify(data,null, 2)}`);
                }
                
            }
            if(arr.length===3){

                for (let i = 0; i < arr.length; i++) {
                    console.log(`HAY 3 MACS ${arr[i].id}|| ${arr[i].mac}`);
                    io.to(arr[i].id).emit('asset-tracking', aviso);
                }
            }
            // io.emit('asset-tracking', aviso);
    
        }, err => {console.log(err);});
    

    }catch(e){console.log(e);}    

}
let stoped= () =>{
    let aviso = 'detener el despliegue';
    console.log(aviso);
    startTrilateracion[0].a = false

    io.emit('stoped-all', aviso);
}

let setlist = ()=>{
    
    io.emit('libreta-list', libreta)
    io.emit('Option-to-Validator', etiqueta)

}
let refresh = () =>{

    let actualiza=`Actualizar libreta del server`
    io.emit('refresh', actualiza)
    io.emit('Option-to-Validator', etiqueta)

}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

io.on('connection', function(socket){
    // console.log('An user connected......');
    // console.log(socket);
    client_count++
    //añadir datos a la grafica...
    // setInterval(() => {
        
    //     socket.emit('datosGrafica', globalDataGraph);
    //     socket.emit('datosGrafica2', globalDataGraphDos);
    // }, 1000);
    
    socket.on('libreta', data=>{

        console.log(`Add to libreta! serversockert.js line 84`);
        console.log(data);
        dato(socket.id , data );
        setlist();
        
    })

    socket.on('datosGraficass', (res) =>{
        console.log(res);
        socket.emit('datosGrafica', globalDataGraph);
    })
    socket.emit('completeData', globalDataGraph);

    setInterval(() => {
        
        // if(paramsValidacionCaract[0].signal === true){

            socket.emit('completeData', globalDataGraph);
            socket.emit('completeData2', globalDataGraphDos);


            // socket.emit('completeData3', globalDataGraphDistance);
            // socket.emit('completeData4', globalDataGraphDistanceDos);
            socket.emit('show-canvas', jsoCanvas[jsoCanvas.length-1]);
            // paramsValidacionCaract[0].signal=false
            // console.log(`Cambio de signal`);
            // console.log(paramsValidacionCaract[0]);

        // }
             

        
    },5000);


    socket.emit('dataUpdate', {name: 'this.query.name', data: 43});


    socket.on('variables', data=>{
        DistanciaError = data.valor

        console.log(DistanciaError);
    })

    socket.on('refresh-client', data=>{
        console.log(data);
        refresh();
    })
    socket.on('sendDataToServer', (dataTracking)=>{
        // console.log(`tracking! ${socket.id}`);
        // console.log(dataTracking.length);
        // clg

        processDataFromRpi(dataTracking);
        let findIt = libreta.findIndex(obj => (obj.mac === dataTracking[0].macrpi) );
        if(findIt>=0){
            libreta[findIt].stat = true;
            // console.log(libreta);
            
        }else{
            console.log(`Full: No se consigue dato en libreta.. se procede a guardar`);
            refresh();
        }
        
    })
    socket.on('sendDataToServerEmpty',data=>{
        let findIt = libreta.findIndex(obj => (obj.mac === data.rpimac) );
        if(findIt>=0){
            libreta[findIt].stat = false;
            // console.log(libreta);

        }else{
            console.log(`Empty: No se consigue dato en libreta.. se procede a guardar`);

            refresh();

        }
        })
    socket.on('sendDataCToServer', (dataCaracterizacion)=>{
        console.log(`CARACTERIZACION ${socket.id}`);
        // console.log(dataCaracterizacion.length);
        // console.log(dataCaracterizacion[0].macrpi);
        rawCaracterizacion(dataCaracterizacion);
        
        
    })
    socket.on('test1',data=>{console.log(data);})

    socket.on('stop_DataCToServer',data =>{
        console.log(`FINISHED:`.green+` la recoleccion de data ha terminado ${data}`.magenta);
        socket.emit('show',data)
    })


    socket.on('accions', data =>{
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            
            let resul = libreta.find(fin=>fin.mac === data[i].mac )
            if(!resul){
                console.log(`NO DATA`);
            }
            else if(resul.socketID === undefined){
                console.log(`ERROR: result= ${resul}\n Data= ${data[i]}`);
            }else{
                
                let js={
                    id:resul.socketID,
                    distancia:data[i].distancia
                }
                // console.log(resul);
                sendAccion(js)
                // console.log(`ID:${socket.id} dice ${JSON.stringify(data,null, 2)}`);
            }
            
        }
    })
    socket.on('despliegue', data =>{
        console.log(data);
        if(data.tipo==='validar'){
            
            startValidation(data)
        }else{
            startTracking(data)

        }
    })
    socket.on('stop-all', data =>{
        console.log(data);
        stoped()
    })

    
    
    
    
    socket.on("disconnect", () => {
        // sequenceNumberByClient.delete(socket);
        // libreta
        // let resul = libreta.find(fin=>fin.socketID === socket.id )
        // let resultadoUbicacion = ubicacion.find(data => data.macRpi === resultrpi[j]._id);


        let nuevoListado = libreta.filter(tarea=>{
            return tarea.socketID !== socket.id;
    
        });
        if (libreta.length === nuevoListado.length){
    
        }else{
            libreta=nuevoListado;
    
        }

        console.log(libreta.indexOf({socket:socket.id}));
        client_count--;
        console.info(`Client gone [id=${socket.id}]`);
        console.log(libreta);
        setlist()
    });
});
// io.on

module.exports = io
