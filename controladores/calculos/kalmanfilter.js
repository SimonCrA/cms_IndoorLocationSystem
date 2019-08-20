const RawData = require('../../models/rawdata');


// for(var i=0; i<vector.length; i++){
//     vector[i].rssi = meshEval[i].rssi;

   

//     vector[i].Xt_predictiva = vector[i].Xt_1;
//     vector[i].P_Covar_pre = vector[i].P_Covar_1 + vector[i].Q;
//     vector[i].kalmanT = (vector[i].P_Covar_pre)/(vector[i].P_Covar_pre + vector[i].R);
//     vector[i].Xt_s = vector[i].Xt_predictiva + vector[i].kalmanT *(vector[i].rssi- vector[i].Xt_predictiva);
//     vector[i].P_Covar_s = (1-vector[i].kalmanT)*vector[i].P_Covar_pre; 
//     vector[i].Xt_1 = vector[i].Xt_s; 
//     vector[i].P_Covar_1 = vector[i].P_Covar_s;                             





//     // vector[i].estimation = (kf.filter(vector[i].rssi ));
    
    
//     // rssik = (vector[i].estimation );
//     rssik = (vector[i].Xt_s );
//     d = (calculateDistance(rssik, vector[i].mac));

//     arrDistance.push({mac:vector[i].mac, axis:vector[i].axis, xpos:vector[i].xpos,
//          ypos:vector[i].ypos, distance: d});

//     //var dlt = tendenceLine(rssik);

//     ////console.log("DDD");
//     var dseries = hcKalman.series[i];
//     var x = new Date().getTime();
//     // dseries.addPoint([x, vector[i].estimation ], true, true);
//     dseries.addPoint([x, vector[i].Xt_s ], true, true);

//     //////console.log("Distancias",d, dlt);							
// }
// var vector = new Array();
// let kalmanVariance = 8.184352498;       //var REAL
// let kalmanCovariance = 0.05;

// vector[i].Q = kalmanCovariance;
// vector[i].R = kalmanVariance;
// vector[i].Xt_predictiva = 0.0; //xt~
// vector[i].Xt_1 = -65.0;          // x~1           
// vector[i].Xt_s= -65.0;           //xt^
// vector[i].P_Covar_pre= 0.0;    //pt~
// vector[i].P_Covar_1= 0.0;      //pt~1   
// vector[i].P_Covar_s= 0.0;      //pt^
// vector[i].kalmanT= 0.0;        //kt^

var prueba=0;
let filtrado = (cont) =>{

    console.log(`estoy filtrando`);

    RawData.find().limit(5).sort({_id:-1})
        .exec(function (err, device) {
        if (err) {console.log("ER_dataR_Ln:13")}
        prueba= device[cont].rssi + 10;
        
        console.log(`data: ${prueba}`);

    });
    


}
module.exports = {
    filtrado
}
