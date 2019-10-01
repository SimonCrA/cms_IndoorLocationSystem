var socket = io();

//revisar si no sirve hay que sacar el agregado de la data con una variable fuera del socket.
socket.on('datosGrafica', function(data) {

  //Agregar data a la grafica.
  console.log(data);
  morris1.setData(data);

  
});

var morris1 = new Morris.Line({
  // ID of the element in which to draw the chart.
  element: 'myfirstchart',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: [
    { year: '2008', value: 20,  value2: 21 },
    { year: '2009', value: 10, value2: 30 },
    { year: '2010', value: 5,  value2: 40 },
    { year: '2011', value: 5,  value2: 10 },
    { year: '2012', value: 20,  value2: 80 }
  ],
  // The name of the data record attribute that contains x-values.
  xkey: 'frame',
  // A list of names of data record attributes that contain y-values.
  ykeys: ['valor', 'valorfiltrado'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['distancia1', 'distancia2'],
  resize: true,
  lineColors: ['#563d7c', '#29303b'],
  lineWidth: 1
});


// $("#Data").on("click", function() {
//     console.log(morris1);

//     var nuevaData = [
//     { year: '2013', value: 25,  value2: 51 },
//     { year: '2014', value: 15, value2: 60 },
//     { year: '2015', value: 15,  value2: 40 },
//     { year: '2016', value: 30,  value2: 20 },
//     { year: '2017', value: 40,  value2: 15 }
//   ]

//   morris1.setData( nuevaData );

// })
