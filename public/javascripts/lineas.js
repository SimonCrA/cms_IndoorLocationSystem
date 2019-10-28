var socket = io();

//revisar si no sirve hay que sacar el agregado de la data con una variable fuera del socket.




// hc = Highcharts.chart('container1', {
//   chart: {
//         type: 'spline'
//     },
//   title: {
//       text: 'gráfica de datos generados'
//   },
//   subtitle: {
//       text: 'muestra los datos '
//   },
//   xAxis: {
//       type: 'data',
//       dateTimeLabelFormats: { // don't display the dummy year
//           month: '%e. %b',
//           year: '%b'
//       }
//   },
//   yAxis: {
//       title: {
//           text: 'distancia'
//       },
//       min: 0
//   },
//   tooltip: {
//     formatter: function() {
//               return '<b>'+ this.series.name +'</b><br/>'+
//               Highcharts.dateFormat('%e. %b', this.x) +': '+ this.y +' m';
//       }
//     },
//   series: []

// });


// var morris1 = new Morris.Line({
//   // ID of the element in which to draw the chart.
//   element: 'myfirstchart',
//   // Chart data records -- each entry in this array corresponds to a point on
//   // the chart.
//   data: [
//     { frame: '2008', valor: 20,  valorfiltrado: 21 },
//   ],
//   // The name of the data record attribute that contains x-values.
//   xkey: 'frame',
//   // A list of names of data record attributes that contain y-values.
//   ykeys: ['valor1', 'valor2','valor3', 'valor4'],
//   // Labels for the ykeys -- will be displayed when you hover over the
//   // chart.
//   labels: ['valor1', 'valor2','valor3', 'valor4'],
//   resize: true,
//   lineColors: ['#563d7c', '#29303b'],
//   lineWidth: 1
// });

// var morris2 = new Morris.Line({
//   // ID of the element in which to draw the chart.
//   element: 'myfirstchar',
//   // Chart data records -- each entry in this array corresponds to a point on
//   // the chart.
//   data: [
//     { frame: '21', valor: 20,  valorfiltrado: 21 },
//   ],
//   // The name of the data record attribute that contains x-values.
//   xkey: 'frame',
//   // A list of names of data record attributes that contain y-values.
//   ykeys: ['valor1', 'valor2'],
//   // Labels for the ykeys -- will be displayed when you hover over the
//   // chart.
//   labels: ['valor1', 'valor2'],
//   resize: true,
//   lineColors: ['#563d7c', '#29303b'],
//   lineWidth: 1
// });



// socket.on('datosGrafica2', function(data) {

//   //Agregar data a la grafica.
//   // morris2.setData(data);

  
// });



// socket.on('datosGrafica', function(data) {
//   console.log(data)
//   console.log(`simon que estamos bien te digo!`);
//   //Agregar data a la grafica.
//   // morris1.setData(data);
//   // highChartGraph(data);

  
    


  
// });


// console.log(`SIMON!!!`);
// // console.log(chartLine);
// $(function () {
//   $(document).ready(function() {
//       Highcharts.setOptions({
//           global: {
//               useUTC: false
//           }
//       });
  
//       var chart;
//       $('#container').highcharts({
//           chart: {
//               type: 'spline',
//               animation: Highcharts.svg, // don't animate in old IE
//               marginRight: 10,
//               events: {
//                   load: function() {
                    
//                       var series = this.series[0];
//                       // set up the updating of the chart each second
//                       var dat = 'dasdckjainesc' 
//                       socket.emit('datosGraficass', dat)
//                       socket.on('datosGrafica', function(callback) {
//                         console.log(callback);

//                         if(callback != undefined){

//                           var x = callback[callback.length -1].xs;
//                           var y = callback[callback.length -1].y
//                           series.addPoint([x, y], true, true);

//                         }
//                       })
//                   }
//               }
//           },
//           title: {
//               text: 'distancias del gateway a los tags'
//           },
//           xAxis: {
//               type: 'datetime',
//               tickPixelInterval: 10000
//           },
//           yAxis: {
//               title: {
//                   text: 'Value'
//               },
//               plotLines: [{
//                   value: 0,
//                   width: 1,
//                   color: '#808080'
//               }]
//           },
//           tooltip: {
//               formatter: function() {
//                       return '<b>'+ this.series.name +'</b><br/>'+
//                       Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
//                       Highcharts.numberFormat(this.y, 2);
//               }
//           },
//           legend: {
//               enabled: false
//           },
//           exporting: {
//               enabled: false
//           },
//           series: [{
//               name: 'Random data',
//               data: [14]

//           }]
//       });
//   });
  
// });

var hchart = null;
socket.on('completeData', function (data) {
    console.log(`Recibir!`);
    // document.getElementById('complete-data').innerHTML = JSON.stringify(data);
    var series = data;
    // series.name = 'KPI';
    // series.data = [];
    // console.log(`he`);
    // Object.keys(data).sort().forEach(function (key) {
    //     console.log(`hey -> ${key}`);
    //     if (data.hasOwnProperty(key)) {
    //         var point = {};
    //         point.x = key;
    //         point.y = parseInt(data[key].y);
    //         series.data.push(point);
    //     }
    // });
    
    console.log(series);
    $('#hchart').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    hchart = this;
                }
            }
        },
        colors: ['#7cb5ec', '#ff8528', '#90ed7d', '#f7a35c', '#8085e9',
            '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
        title: {
            text: 'Raw Data Constant'
        },
        xAxis: {
            reversed: false,
            title: {
                enabled: true,
                text: 'Rpi-Tag'
            },
            labels: {
                format: '{value}'
            },
            maxPadding: 0.001,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Distancia'
            },
            labels: {
                format: '{value} m'
            },
            lineWidth: 2,
            min:0
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: true
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            spline: {
                marker: {
                    enable: false
                }
            }
        },
        series: series,
        credits: {
            enabled: false
        }
    });
});

socket.on('completeData2', function (data) {
    console.log(`Recibir||||||`);
    // document.getElementById('complete-data').innerHTML = JSON.stringify(data);
    var series = data;
    // series.name = 'KPI';
    // series.data = [];
    // console.log(`he`);
    // Object.keys(data).sort().forEach(function (key) {
    //     console.log(`hey -> ${key}`);
    //     if (data.hasOwnProperty(key)) {
    //         var point = {};
    //         point.x = key;
    //         point.y = parseInt(data[key].y);
    //         series.data.push(point);
    //     }
    // });
    
    console.log(series);
    $('#hchart2').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    hchart = this;
                }
            }
        },
        colors: ['#7cb5ec', '#ff8528', '#90ed7d', '#f7a35c', '#8085e9',
            '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
        title: {
            text: 'One Constant'
        },
        xAxis: {
            reversed: false,
            title: {
                enabled: true,
                text: 'Rpi - Tag'
            },
            labels: {
                format: '{value}'
            },
            maxPadding: 0.05,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Distancia'
            },
            labels: {
                format: '{value} m'
            },
            lineWidth: 2,
            min:0
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: true
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            spline: {
                marker: {
                    enable: false
                }
            }
        },
        series: series,
        credits: {
            enabled: false
        }
    });
});



// socket.on('dataUpdate', function (data) {
//     document.getElementById('updated-data').innerHTML += JSON.stringify(data) + "\n";
//     var series = hchart.series[0].data;
//     for (var key in data) {
//         if (data.hasOwnProperty(key)) {
//             var bOld = false;
//             for (var i = 0; i < series.length; i++) {
//                 if (series[i].x === key) {
//                     bOld = true;
//                     series[i].update(data[key].value);
//                     break;
//                 }
//             }
//             if (!bOld) {
//                 console.log('new point');
//                 hchart.series[0].addPoint([parseInt(key), data[key].value], true, true);
//             }
//         }
//     }
// });





//   socket.on('datosGrafica', function(msg){
//     console.log(msg);
    
//     var seriesModule1 = chartLine.series[0];
//     var x = msg.data.x; // UTC time
//     var y = msg.data.y;
//     seriesModule1.addPoint([x, y], true, true);
//   })
