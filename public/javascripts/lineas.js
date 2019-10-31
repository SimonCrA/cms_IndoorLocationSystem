var socket = io();


var hchart = null;
socket.on('completeData', function (data) {
    // console.log(`Recibir!`);
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
    
    // console.log(series);
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
    // console.log(`Recibir||||||`);
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
    
    // console.log(series);
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

socket.on('Option-to-Validator', data=>{
    console.log(`VALIDO SI HAY ETIQUETAS!`);
    var a =  data;
    console.log(a);
    for(x in a){
        $('#downbtn').
            append($('<button>').
                attr("class", "dropdown-item").
                attr("type", "button").
                attr("value", a[x].name).
                attr("onclick", 'setOption(this)').
                text(a[x].name)
            );

    // if ($('#downbtn').length >  -1) {
    //     // hay por lo menos un elemento
    //     console.log($('#downbtn').length);
    //     $("button.dropdown-item").remove();
        
    //   } else {
    //       //no hay ni un elemento
    //       console.log(`estoy agregando esta wea!`);
    //   }


    }
})