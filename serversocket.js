// var socket_io = require('socket.io');
// var io = socket_io();
// var socketApi = {};
let client_countOld=0;
let client_count=0

const { processDataFromRpi,verificarRpis, processGossipFromRpi } = require('./controladores/database/scan')
const {rawCaracterizacion} = require('./controladores/database/guardarbd')
let {globalDataGraph, globalDataGraphDos, globalDataGraphDistance,jsoCanvas,
    globalDataGraphDistanceDos, DistanciaError, paramsValidacionCaract, etiqueta,Users} = require('./controladores/variables')

const { io } = require('./bin/www');
let {startTrilateracion, timeTLM} = require('./controladores/variables')
const {iniciarValidacion} = require('./controladores/calculos/timer')
const {regionId} = require('./controladores/database/getdb')
const {logSistem} =  require('./controladores/write_Log')
let {nameFile} = require('./controladores/variables')

const InfoUbicacionRpi = require("./models/ubicacion");
const Promesa = require('./controladores/database/promesas')

let Variables = require('./controladores/variables')

try {

    
/* *****************************************
*	Alarma Tag Lost
*	
/* *****************************************/

let pathObtainTag = {estado:true}
Promesa.getTag(pathObtainTag).then(obj=>{
    console.log(`ServerSocket line 32`);

    for (let index = 0; index < obj.length; index++) {
        let js ={
            _id:obj[index]._id,
            mactag:obj[index].mactag

        }
        Variables.tagList.push(js)

        
    }

},er=>console.log(er))

let StartDatetoTagLost = new Date().getTime()
setInterval(async () => {
    Variables.tagLost = [];
    let pathObtainLastTaginSystem = {date:{$gte:new Date(StartDatetoTagLost)}}
    await Promesa.GetGraficar(pathObtainLastTaginSystem).then( async obj=>{

        for (let j = 0; j < Variables.tagList.length; j++) {

            let findIt = obj.findIndex(dato =>dato.idTag === Variables.tagList[j].mactag);
            if(findIt>=0){
                
            }else{
                let js={taglost:Variables.tagList[j].mactag, region:'', piso:''}

                await Promesa.promise_pointXY(Variables.tagList[j].mactag).then(objPointXY=>{

                    console.log(objPointXY[0]);
                    js.region = objPointXY[0].region.nombreRegion
                    js.piso = objPointXY[0].region.idPiso.nombrePiso

                }, er=>{console.log(`ServerSocket:line66- ${er}`);})

                Variables.tagLost.push(js)
            }
            
            
        }
        if(Variables.tagLost.length != 0){

            io.emit('missing-Tag-Aalarm',{msg:'the following tags are missing from the system',
                                         Tags:Variables.tagLost})
        }

    }, er=>{console.log(er);

        io.emit('missing-Tag-Aalarm',{msg:'Danger no target is detected in the system', Tags:Variables.tagLost})
       
    
    })

    console.log(Variables.tagList);
    console.log(Variables.tagList.length);
    console.log(`-----`);
    console.log(Variables.tagLost.length);
    console.log(Variables.tagLost);
    
    StartDatetoTagLost = new Date().getTime()
    console.log(new Date(StartDatetoTagLost));
}, 6000000);

/* *****************************************
*	Gateway Lost Alarm
*	
/* *****************************************/

setInterval( async () => {
    let arrRpisDB = [];
    Variables.RpisDisconnected = [];
    let busquedaDeRpis = () =>{
        return new Promise((resolve, reject) => {
            InfoUbicacionRpi.find({})
                .exec((err, rpiDB) =>{
                    if (err) {

                        reject({
                            ok: false,
                            err
                        })
                    }
                    if (!rpiDB) {
                        reject({
                            ok: false,
                            err: {
                                msg: 'No Rpis Found'
                            }
                        })
                    }
                    resolve({
                        ok: true,
                        rpiDB
                    })
                })

        })
    }
    let resultRpisSearched = busquedaDeRpis();

    for (let i = 0; i < resultRpisSearched.rpiDB.length; i++) {
        arrRpisDB.push({macRpi: resultRpisSearched.rpiDB[i].macRpi})
    };

    for (let j = 0; j < arrRpisDB.length; j++) {
        
        let indexFound = Variables.listRpisConnected.findIndex(dato => dato.macRpi === arrRpisDB[j].macRpi);
        if (indexFound >= 0) {

        } else {
            let dataRpiLost = {macRpi: arrRpisDB[j].macRpi, region: '', floor : ''};
            let path = { macRpi: arrRpisDB[j].macRpi }
            await Promesa.getRpis(path).then(async dataRpiRes => {

                dataRpiLost.region = dataRpiRes.idZona.regionName;
                dataRpiLost.floor = dataRpiRes.idZona.floorName;

            }, err=>{console.log(err);})

            Variables.RpisDisconnected.push(dataRpiLost);
        }
        
    }
    if (Variables.RpisDisconnected.length != 0) {

        io.emit('gateway-Aalarm', {
            msg: 'Caution Gateways disconnected',
            gateways: Variables.RpisDisconnected
        })
    }

}, 10000000);

/* *****************************************
*	
*	
/* *****************************************/
    
    var test = -1
    var test2 = -1
    
    
    let libreta=[];
    
    
    byClient = new Map();
    let dato = (id, mac, sessionid) =>{
        let json
        if(sessionid){
            json={
                socketID:id,
                sessionid, 
                mac
                }
            
        }
        else {
            json={
                socketID:id,
                mac
                }
    
        }
    
        let findIt = libreta.findIndex(tarea =>tarea.socketID === id);
        if(findIt>=0){
            logSistem(`Socket.ID: (${id})||Mac: (${mac})`, nameFile[0])

        }
        else{
          
            libreta.push(json)

            logSistem(`${JSON.stringify(libreta, null, 1)}`, nameFile[0])

            console.log(libreta);
            }
                
            
        }
        io.emit('test1', 'test');
    
    
     let validacion_de_Usuario = (sesionId)=>{
        return new Promise((resolve, reject)=>{
                
            let find1 = Users.findIndex(obj =>obj.sessionId === sesionId);
    
            if(find1 >= 0 ){
                return resolve(true)
            }else {
                return reject(false)
            }
    
    
        })
     }
    


setInterval(() => {
console.log(`INCIIO ESTO de gossip`);
    io.emit('getTLMPacket', 'StartGossip');

}, timeTLM);

    
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
    let stoped_caracter= (data)=>{
        io.emit('progressInfo',data)
    
    }
    
    let alarmLowBatery = (tagLowBattery)=>{

        io.emit('alarmlowbatery', tagLowBattery)
    }
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    
    io.on('connection', async (socket)=>{



        console.log(`'An user connected...... ${socket.id}'`);
        client_count++
        //añadir datos a la grafica...
        // setInterval(() => {
            
        //     socket.emit('datosGrafica', globalDataGraph);
        //     socket.emit('datosGrafica2', globalDataGraphDos);
        // }, 1000);
        
        socket.on('libreta',async data=>{
            
            logSistem(`Add to libreta! serversockert.js line 84`, nameFile[0])
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
        socket.on('sendGossipToServer', async (data) => {
            console.log(`SENDGOSSIPTOSERVER`);
            console.log(data);
             res= await processGossipFromRpi(data)
            if(res.ok===true){
                
                console.log(`ALARMA`);
                console.log(res.tagLowBattery);

                alarmLowBatery(res.tagLowBattery)
            }
    
        })
        socket.on('sendGossipToServerEmpty', (data)=>{
            console.log(`265- gossip empty`);
            console.log(data);
    
        })
        socket.on('sendDataToServer', (dataTracking)=>{
            // console.log(`tracking! ${socket.id}`);
            // console.log(dataTracking.length);
            // clg
    
            processDataFromRpi(dataTracking);
            let findIt = libreta.findIndex(obj => (obj.mac === dataTracking[0].macrpi) );
            if(findIt>=0){
                libreta[findIt].stat = true;

                verificarRpis(libreta);

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
            stoped_caracter(data)
        })
    
    
        socket.on('accions', data =>{
            console.log(data);
    
            for (let i = 0; i <( data.length - 1); i++) {
                
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
        socket.on('despliegue', async data =>{

            // let res = await validacion_de_Usuario(data.sessionId).then(respons=>{
            //     if(respons===true){
                    console.log(data);
                    if(data.tipo==='validar'){
                        
                        startValidation(data)
                    }else{
                        startTracking(data)
            
                    }

            //     }
                

            // }, err=>console.log(err));
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

} catch (error) {
    console.log(`CATCH DE SERVERSOCKET.JS `);
    console.log(error);
}

module.exports = io
