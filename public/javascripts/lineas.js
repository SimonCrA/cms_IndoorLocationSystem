var socket = io();

/* *****************************************
*	En esta seccion del codigo donde se grafica la data
*	es necesario que el encargado del front-end corrija 
*   un error que se tiene en la misma ya que la grafica 
*   se actualiza cada vexz que se envie datos desde el 
*   socket y lo que se requiere es que muestre los datos 
*   en real-time de la forma correcta la cual es que 
*   agregue los datos sin tener que recargar la grafica
/* *****************************************/



/* *****************************************
*	Grafica 1: Graph Raw Data
/* *****************************************/
var hchart = null;
socket.on('completeData', function (data) {
    var series = data;
   
    $('#hchart').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, 
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

/* *****************************************
*	Grafica 2: Graph Validator Data
*	
/* *****************************************/

socket.on('completeData2', function (data) {
    var series = data;
    
    $('#hchart2').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, 
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
/* *****************************************
*	agrega las opciones/elementos que contendra
*	el dropdown el cual prermite seleccionar una constante
/* *****************************************/
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


    }
})