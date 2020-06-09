
/* *****************************************
*	Obtener La IP del cliente
/* *****************************************/

var sessionId = sessionStorage.getItem('sessionId')
// $.getJSON('https://api.ipify.org?format=json', function(data){
//   var mcy=''
//   console.log(`esto es?`);
//   console.log(data.ip);
//   mcy=data.ip || '192.168.168.168'
// });
  let json={sessionId,mac:'dc:a6:32:0b:a2:b4'}

  socket.emit('libreta', json);
/* *****************************************
*	Api:
* Consulta las Regiones que se encuentran en Base de datos
* Consulta los Tags que se encuentran en Base de datos
/* *****************************************/
var consulta = $.get( "../../../api/zona", function() {
  data = consulta.responseJSON;
  console.log(data.zone);
  
  for (let i = 0; i < data.zone.length; i++) {
    // console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    let zona = document.getElementById("List_IdZona");
    let zona2 = document.getElementById("RegionList2");
    let option = document.createElement("option");
    let option2 = document.createElement("option");
    option.text = `${data.zone[i].floorId.floorName} - ${data.zone[i].regionName} (${data.zone[i].regionNumber})`;
    option.value=data.zone[i]._id
    option2.value=data.zone[i]._id
    option2.text = `${data.zone[i].floorId.floorName} - ${data.zone[i].regionName} (${data.zone[i].regionNumber})`;
    zona.add(option);  
    zona2.add(option2); 
  }
  for (let i = 0; i < data.tags.length; i++) {
    // console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    let tags = document.getElementById("List_MacTag");    
    let option = document.createElement("option");
    option.text = data.tags[i].mactag;
    
    tags.add(option);  

  };
});



// function sendm(e){
//   let distE= document.getElementById('mensaj').value
//   console.log(distE)

//   let urlRequest = '/put/ubicacionrpiselect'

//   $.ajax({
//     contentType: 'application/json',
//     data: JSON.stringify({ "command": "on" }),
//     dataType: 'json',
//     success: function(data){
//         app.log("device control succeeded");
//     },
//     error: function(){
//         app.log("Device control failed");
//     },
//     processData: false,
//     type: 'PUT',
//     url: '/put/ubicacionrpiselect'
// });
//   return false;
// }

/* *****************************************
*	Modulo: Samples recolection.
*	El cual ordena que las rpi seleccionadas se ejecuten 
* para la recoleccion de datos 
/* *****************************************/ 
$("#mostrar").hide('fast');

function Send_to_particular_rpi(e) { 

  $("#mostrar").empty();
  $("#mostrar").append("Procesando...");
  $("#mostrar").show('slow');
  var sessionId = sessionStorage.getItem('sessionId')

    var array = [{ 
      distancia: document.getElementById('Distancia').value, 
      mac: document.getElementById('maclist1').value      
    },{ 
      distancia: document.getElementById('Distancia').value, 
      mac: document.getElementById('maclist2').value
    },{ 
      distancia: document.getElementById('Distancia').value, 
      mac: document.getElementById('maclist3').value
    }, 
    {sessionId}]; 
    socket.emit('accions', array);  
    console.log(array);

    return false;
}


socket.on('progressInfo', data=>{

  $("#mostrar").empty();
  $("#mostrar").append("FINISHED");
    // $("#mostrar").hide("slow");

})

/* *****************************************
*	De aca en adelante son las acciones de 
*	cada uno de los botones para tener interaccion 
* con las rpi y el backend
/* *****************************************/

function startDespliegue(e) { //Inicia el Tracking del sistema (se utiliza cuando ya este todo caracterizado)
  
  
  let aviso={sessionId, aviso:'Inicio la Tracking', tipo:'tracking'}

    socket.emit('despliegue', aviso); 
    console.log(aviso);
    return false;
}
function startValidacion(e) {//Se utiliza cuando se procede a validar las constantes
  let sessions= sessionStorage.getItem('sessionId')
  console.log(sessions);
  let region = document.getElementById('RegionList2').value
  
  let aviso={aviso:'Inicio la validacion', tipo:'validar', region, sessionId}

  socket.emit('despliegue', aviso); 
  console.log(aviso);
  return false;
}

function stoppedAll(e) {// Detiene la ejecucion de todas las RPIs

    let aviso= {aviso:'detener el tracking desde client', sessionId}

    socket.emit('stop-all', aviso); 
    console.log(aviso);
    return false;
}
function refresh(e) {//Actualiza la libreta de direcciones del  Socket
    let aviso={aviso:'Actualizar data del Server', sessionId}
    socket.emit('refresh-client', aviso); 
    console.log(aviso);
    return false;
}

/* *****************************************
*	Modulo: Graph managment
*	Se establece un dorpdown que contendra la lista de rpi-tag 
* para el momento de seleccionarle iniciar la segunda grafica 
* la cual muestra las constantes seleccionadas
/* *****************************************/
var value;
// var js={macrpi:'dc:a6:32:0b:a5:e6', mactag:'df:a9:ce:b7:4c:f1', regionid:'5dffc7e9c5a86004a87ca55c'}

var js={macrpi:'', mactag:'', regionid:''}

function setOption(e){
   value = e.value
  console.log(e.value);
  let region = document.getElementById('RegionList2').value

  let array = []
  array = value.split('-')
  js.macrpi = array[0]
  js.mactag = array[1]
  js.regionid = region
  console.log(js);
  console.log(sessionId);

  $.ajax({
    contentType: 'application/json',
    data: JSON.stringify(js),
    headers: {
      'authorization': `barer ${sessionId}`
  },
    dataType: 'json',
    success: function(data){
        console.log(`"device control succeeded" ${JSON.stringify(data)}`);
    },
    error: function(){
        console.log("Device control failed");
    },
    processData: false,
    type: 'PUT',
    url: '/put/ubicacionrpiselect'
  });


  return false

}

/* *****************************************
*	Modulo: Calculation Application (fileConfig)
*	Inicia la generacion de constantes 
/* *****************************************/

function GetFromPagefileconfigData(e) { 
    var json = { 
      cantMuestras: document.getElementById('cantMuestras').value, 
      zona: document.getElementById('List_IdZona').value, 
      tags: document.getElementById('List_MacTag').value,
    }; 
    
  var consulta = $.get( `../../../api/fileconfig/${json.zona}/${json.tags}/${json.cantMuestras}`, function() {
    data = consulta.responseJSON;
  })
    console.log(json);
    return false;
}






function EstablecerConstants(e){

  $.ajax({
    contentType: 'application/json',
    data: JSON.stringify(js),
    dataType: 'json',
    success: function(data){
        console.log(`"device control succeeded" ${JSON.stringify(data)}`);
    },
    error: function(){
        console.log("Device control failed");
    },
    processData: false,
    type: 'POST',
    url: '/post/newconstant'
  });

  
  
  return false;
}




/* *****************************************
*	Desde el socket se establecen las opciones a aparecer 
* en las listas de seleccion de macs a caracterizar
*	la cual cada vez que se refresca la pagina solicita al server
* la libreta de direcciones del socket para mostrarlo en las listas.
/* *****************************************/
socket.on('libreta-list', function(data) { render(data); });

let render= async(data)=> { 
  console.log(`ACA VA RENDER`);
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


let  LogOut = async (e)=>{

  $.get("http://192.168.0.101:3000/users/logout", function(data, status){
    sessionStorage.clear()
      location.href ="http://192.168.0.101:3000/caracterizacion";
    
  });
  return false
}


socket.on('alarmlowbatery', tagLowBattery=>{
  console.log(`ALLLLLAAAAAARRRRMMMMM`);
  console.log(tagLowBattery);
  $("#lowBattery").empty();
  $("#lowBattery").append("Battery low...");
  $("#lowBattery").show('slow');

})



socket.on('alarm-low-batery',alarmLowBattery=>{

  $("#msgTagLost").empty();
  $("#ultest").empty();
  $("#msgTagLost").append(alarmLowBattery.msg);

  if(Array.isArray(alarmLowBattery.tagLowBattery) && alarmLowBattery.tagLowBattery.length ){
    for (let index = 0; index < alarmLowBattery.tagLowBattery.length; index++) {
      $("#ultest").append(`<li
                           class="list-group-item">
                          Tag: ${alarmLowBattery.tagLowBattery[index].macTag} -
                          batteryLevel: ${alarmLowBattery.tagLowBattery[index].batteryLevel}%
                          
                          </li>`); 
    }
  }
  $("#AlarmTagLost").modal("show");
})


socket.on('missing-Tag-Aalarm',alarmtaglost=>{

  $("#msgTagLost").empty();
  $("#ultest").empty();
  $("#msgTagLost").append(alarmtaglost.msg);

  if(Array.isArray(alarmtaglost.Tags) && alarmtaglost.Tags.length ){
    console.log(`HEEEEEEEEEEEEEEEEY`);
    for (let index = 0; index < alarmtaglost.Tags.length; index++) {
    console.log(alarmtaglost.Tags[index].taglost);

      $("#ultest").append(`<li
                           class="list-group-item">
                          Tag:${alarmtaglost.Tags[index].taglost}-
                          Piso:${alarmtaglost.Tags[index].piso}|
                          Region:${alarmtaglost.Tags[index].region}
                          </li>`); 
    }
  }
  $("#AlarmTagLost").modal("show");
})

socket.on('gateway-Aalarm', alarmGatewayDisconnected => {

  $("#msgTagLost").empty();
  $("#ultest").empty();
  $("#msgTagLost").append(alarmGatewayDisconnected.msg);

  if(Array.isArray(alarmGatewayDisconnected.gateways) && alarmGatewayDisconnected.gateways.length ){

    for (let index = 0; index < alarmGatewayDisconnected.gateways.length; index++) {

      $("#ultest").append(`<li
                           class="list-group-item">
                          Gateway:${alarmGatewayDisconnected.gateways[index].macRpi}-
                          Floor:${alarmGatewayDisconnected.gateways[index].floor}|
                          Region:${alarmGatewayDisconnected.gateways[index].region}
                          </li>`); 
    }
  }
  $("#AlarmTagLost").modal("show");
})
