// var socket_io = require('socket.io');
// var io = socket_io();
// var socketApi = {};
let client_countOld=0;
let client_count=0

const { io } = require('./bin/www');

let libreta=[];
byClient = new Map();
let dato = (id, mac) =>{
    let json={socketID:id, mac}

    let findIt = libreta.findIndex(tarea =>tarea.socketID === id);
    if(findIt>=0){
        console.log(`No estoy Autorizado para guardar a este Sr(${id})`);
    }else{
        libreta.push(json)
        console.log(libreta);
        
    }

}
let sendAccion = (js)=>{
    
    io.to(js.id).emit('accion', js.distancia);
    
}

let startTracking= () =>{
    let aviso = 'Inicio el despliegue';
    console.log(aviso);
    io.emit('asset-tracking', aviso);
}
let stoped= () =>{
    let aviso = 'detener el despliegue';
    console.log(aviso);
    io.emit('stoped-all', aviso);
}

let setlist = ()=>{
    
    io.emit('libreta-list', libreta)

}
let refresh = () =>{

    let actualiza=`Actualizar libreta del server`
    io.emit('refresh', actualiza)
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

io.on('connection', function(socket){
    console.log('An user connected......');
    // console.log(socket);
    client_count++
    
    socket.on('libreta', data=>{
        console.log(`entro aca`);
        dato(socket.id , data);
        setlist();
        
    })
    socket.on('refresh-client', data=>{
        console.log(data);
        refresh();
    })
    socket.on('sendDataToServer', (data)=>{
        console.log(data);
        processDataFromRpi(data)
        
    })
    
    socket.on('accions', data =>{
        // console.log(data);

        for (let i = 0; i < data.length; i++) {
            
            let resul = libreta.find(fin=>fin.mac === data[i].mac )
            if(resul.socketID === undefined){
                console.log(`ERROR: result= ${resul}\n Data= ${data[i]}`);
            }else{
                
                let js={
                    id:resul.socketID,
                    distancia:data[i].distancia
                }
                // console.log(resul);
                sendAccion(js)
                console.log(`ID:${socket.id} dice ${JSON.stringify(data,null, 2)}`);
            }
            
        }
    })
    socket.on('despliegue', data =>{
        console.log(data);
        startTracking()
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
