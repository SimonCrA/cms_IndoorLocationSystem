var socket = io();
socket.emit('libreta', 'Client-Web');

var consulta = $.get( "../../../api/zona", function() {
  data = consulta.responseJSON;

  console.log(data.idzonas);
  
  for (let i = 0; i < data.idzonas.length; i++) {
    // console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    let zona = document.getElementById("zona");
    let option = document.createElement("option");
    option.text = data.idzonas[i]._id;
    
    zona.add(option);  
    
  }
  for (let i = 0; i < data.tags.length; i++) {
    // console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    let tags = document.getElementById("tags");    
    let option = document.createElement("option");
    option.text = data.tags[i].mactag;
    
    tags.add(option);  

  };
});



function addMessage(e) { 
    var json = { 
      distancia: document.getElementById('mensaje').value, 
      mac: document.getElementById('maclist1').value
    }; 
    socket.emit('accions', json); 
    console.log(json);
    return false;
}
function GetFromPagefileconfigData(e) { 
    var json = { 
      cantMuestras: document.getElementById('cantMuestras').value, 
      zona: document.getElementById('zona').value, 
      tags: document.getElementById('tags').value,
    }; 
    
  var consulta = $.get( `../../../api/fileconfig/${json.zona}/${json.tags}/${json.cantMuestras}`, function() {
    data = consulta.responseJSON;
  })
    console.log(json);
    return false;
}








let render= async(data)=> { 
  console.log(`entro aca_?`);
  console.log(data);
  let select1 = document.getElementById("maclist1");
  let select2 = document.getElementById("maclist2");
  let select3 = document.getElementById("maclist3");
  let length1 = select1.options.length;
  let length2 = select2.options.length;
  let length3 = select3.options.length;
  console.log(length);
  for (i = 0; i < length1+1; i++) {
    console.log(select1.options[i]);
    select1.options[i] = null;
  } 
  for (i = 0; i < length2+1; i++) {
    console.log(select2.options[i]);
    select2.options[i] = null;
  } 
  for (i = 0; i < length3+1; i++) {
    console.log(select3.options[i]);
    select3.options[i] = null;
  } 
  

  console.log(data.length);
  for (let i = 0; i < data.length; i++) {
    console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    let maclist1 = document.getElementById("maclist1");

    let option = document.createElement("option");
    option.text = data[i].mac;
    
    maclist1.add(option);  

    
  }
  for (let i = 0; i < data.length; i++) {
    console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    let maclist1 = document.getElementById("maclist2");

    let option = document.createElement("option");
    option.text = data[i].mac;
    
    maclist1.add(option);  

    
  }
  for (let i = 0; i < data.length; i++) {
    console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    let maclist1 = document.getElementById("maclist3");

    let option = document.createElement("option");
    option.text = data[i].mac;
    
    maclist1.add(option);  

    
  }



}
socket.on('test', data=>console.log(data))

socket.on('libreta-list', function(data) { render(data); });


// socket.on('new-client', function(data) {
//     libreta.push(data); 
//     io.sockets.emit('messages', messages); 
// });