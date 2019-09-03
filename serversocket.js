// var socket_io = require('socket.io');
// var io = socket_io();
// var socketApi = {};
let client_countOld=0;
let client_count=0

const { io } = require('./bin/www');

let libreta=[
];
byClient = new Map();
let dato = (id, mac) =>{
    let json={socketID:id, mac}
    libreta.push(json)
    console.log(libreta);
}
let sendAccion = (js)=>{
    
    io.to(js.id).emit('accion', js.distancia)
}

let setlist = ()=>{
    
    io.emit('libreta-list', libreta)

}
io.on('connection', function(socket){
    console.log('An user connected......');
    // console.log(socket);
    client_count++
    
    socket.on('libreta', data=>{
        console.log(`entro aca`);
        dato(socket.id , data);
        setlist();
        
    })
    
    socket.on('accion', data =>{
        console.log(data);
        let resul = libreta.find(fin=>fin.mac === data.mac )
        let js={
            id:resul.socketID,
            distancia:data.distancia
        }
        // console.log(resul);
        sendAccion(js)
        console.log(`ID:${socket.id} dice ${JSON.stringify(data,null, 2)}`);
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
