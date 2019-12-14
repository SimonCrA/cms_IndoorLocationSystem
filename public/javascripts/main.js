
/* *****************************************
*	Obtener La IP del cliente
/* *****************************************/
$.getJSON('https://api.ipify.org?format=json', function(data){
  var mcy=''
  console.log(`esto es?`);
  console.log(data.ip);
  mcy=data.ip
  let json={mac:mcy, token:'3242352fewf234e23fdef234fdswefjwneirj234kj2n3kj4n23k4nk23nm4k2h3b4k2nm34kh23kj4n23k4h2k3j4k23n4i2u3i4n23d'}
  socket.emit('libreta', json);
});

/* *****************************************
*	Api:
* Consulta las Regiones que se encuentran en Base de datos
* Consulta los Tags que se encuentran en Base de datos
/* *****************************************/
var consulta = $.get( "../../../api/zona", function() {
  data = consulta.responseJSON;

  console.log(data.idzonas);
  
  for (let i = 0; i < data.idzonas.length; i++) {
    // console.log(`data es ${i}====${JSON.stringify(data[i])}`);
    let zona = document.getElementById("List_IdZona");
    let zona2 = document.getElementById("RegionList2");

    let option = document.createElement("option");
    let option2 = document.createElement("option");
    option.text = data.idzonas[i]._id;
    option2.text = data.idzonas[i]._id;
    
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
  // $('#mostrar').attr("value", 'Procesando')
  
  // $("#mostrar").attr("value","OTRO TEXTO");
  // $("#mostrar").hide('slow');
  $("#mostrar").empty();
  $("#mostrar").show('slow');
  $("#mostrar").append("Procesando");
    var array = [{ 
      distancia: document.getElementById('Distancia').value, 
      mac: document.getElementById('maclist1').value      
    },{ 
      distancia: document.getElementById('Distancia').value, 
      mac: document.getElementById('maclist2').value
    },{ 
      distancia: document.getElementById('Distancia').value, 
      mac: document.getElementById('maclist3').value
    }]; 
    socket.emit('accions', array);  
    console.log(array);
    // $('#mostrar').show();

    return false;
}


socket.on('show', data=>{

  $("#mostrar").empty();
  $("#mostrar").append("FINISHED");
  // $("#mostrar").hide("slow");
  // $('#mostrar').show('slow');

})

/* *****************************************
*	De aca en adelante son las acciones de 
*	cada uno de los botones para tener interaccion 
* con las rpi y el backend
/* *****************************************/

function startDespliegue(e) { //Inicia el Tracking del sistema (se utiliza cuando ya este todo caracterizado)
  let aviso={aviso:'Inicio la Tracking', tipo:'tracking'}

    socket.emit('despliegue', aviso); 
    console.log(aviso);
    return false;
}
function startValidacion(e) {//Se utiliza cuando se procede a validar las constantes

  let region = document.getElementById('RegionList2').value
  let aviso={aviso:'Inicio la validacion', tipo:'validar', region}




  socket.emit('despliegue', aviso); 
  console.log(aviso);
  return false;
}
function stopedAll(e) {// Detiene la ejecucion de todas las RPIs
    let aviso='detener el tracking desde client'
    socket.emit('stop-all', aviso); 
    console.log(aviso);
    return false;
}
function refresh(e) {//Actualiza la libreta de direcciones del  Socket
    let aviso='Actualizar data del Server'
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

function setOption(e){
  let value = e.value
  console.log(e.value);
  let js={macrpi:'', mactag:''}
  let array = []
  array = value.split('-')
  js.macrpi = array[0]
  js.mactag = array[1]
  console.log(js);


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






/* *****************************************
*	Desde el socket se establecen las opciones a aparecer 
* en las listas de seleccion de macs a caracterizar
*	la cual cada vez que se refresca la pagina solicita al server
* la libreta de direcciones del socket para mostrarlo en las listas.
/* *****************************************/

let render= async(data)=> { 
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

socket.on('libreta-list', function(data) { render(data); });

