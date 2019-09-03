var socket = io();
socket.emit('libreta', 'Client-Web');


function addMessage(e) { 
    var json = { 
      distancia: document.getElementById('mensaje').value, 
      mac: document.getElementById('maclist').value
    }; 
    socket.emit('accion', json); 
    console.log(json);
    return false;
}







let render= async(data)=> { 
  console.log(`entro aca_?`);
  console.log(data);
  let select = document.getElementById("maclist");
  let length = select.options.length;
  console.log(length);
  for (i = 0; i < length+1; i++) {
    console.log(select.options[i]);
    select.options[i] = null;
  } 
  
  console.log(data.length);
  for (let i = 0; i < data.length; i++) {
    console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    let maclist = document.getElementById("maclist");
    let option = document.createElement("option");
    option.text = data[i].mac;
    
    maclist.add(option);  
    
  }
}
socket.on('test', data=>console.log(data))

socket.on('libreta-list', function(data) { render(data); });


// socket.on('new-client', function(data) {
//     libreta.push(data); 
//     io.sockets.emit('messages', messages); 
// });