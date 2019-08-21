const RawData = require('../../models/rawdata');



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
    vector[i].Q = kalmanCovariance;
    vector[i].R = kalmanVariance;
    vector[i].Xt_predictiva = 0.0; //xt~
    vector[i].Xt_1 = -65.0;          // x~1           
    vector[i].Xt_s= -65.0;           //xt^
    vector[i].P_Covar_pre= 0.0;    //pt~
    vector[i].P_Covar_1= 0.0;      //pt~1   
    vector[i].P_Covar_s= 0.0;      //pt^
    vector[i].kalmanT= 0.0;        //kt^
    RawData.find().limit(5).sort({_id:-1})
        .exec(function (err, device) {
        if (err) {console.log("ER_dataR_Ln:13")}
        prueba= device[cont].rssi + 10;
        for(let i = (device.length)-1; i >-1; i--){
            


            meshEvaluate[i].Xt_predictiva = meshEvaluate[i].Xt_1;
            meshEvaluate[i].P_Covar_pre = meshEvaluate[i].P_Covar_1 + meshEvaluate[i].Q;
            meshEvaluate[i].kalmanT = (meshEvaluate[i].P_Covar_pre)/(meshEvaluate[i].P_Covar_pre + meshEvaluate[i].R);
            meshEvaluate[i].Xt_s = meshEvaluate[i].Xt_predictiva + meshEvaluate[i].kalmanT *(meshEvaluate[i].rssi- meshEvaluate[i].Xt_predictiva);
            meshEvaluate[i].P_Covar_s = (1-meshEvaluate[i].kalmanT)*meshEvaluate[i].P_Covar_pre; 
            meshEvaluate[i].Xt_1 = meshEvaluate[i].Xt_s; 
            meshEvaluate[i].P_Covar_1 = meshEvaluate[i].P_Covar_s;                             

            console.log(`${device[i].rpidate}`);
        }

    });
    


}
module.exports = {
    filtrado
}
