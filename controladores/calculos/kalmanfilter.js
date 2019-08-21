const RawData = require('../../models/rawdata');
const Distancia = require('../calculos/getdistance')




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
let filtrado = async ( macrpi, mactag) =>{


    console.log(`estoy filtrando`);
    
    await RawData.find({macRpi:macrpi, macTag:mactag}).limit(5).sort({_id:-1})
    .exec( (err, device) =>{
        if (err) {
            console.log(`Error`.red + err);
            return 0;
        }
        if(device[device.length-1] !== undefined){
            // console.log(`${}`);
            let kalmanVariance = 8.184352498;       //var REAL
            let kalmanCovariance = 0.05;
            let Q = kalmanCovariance;
            let R = kalmanVariance;
            let Xt_predictiva = 0.0; //xt~
            let Xt_1 = device[device.length-1].rssi;          // x~1           
            let Xt_s= device[device.length-1].rssi;           //xt^
            let P_Covar_pre= 0.0;    //pt~
            let P_Covar_1= 0.0;      //pt~1   
            let P_Covar_s= 0.0;      //pt^
            let kalmanT= 0.0;        //kt^
            console.log(`el primer dato es: ${Xt_1}`);
            for(let i = (device.length)-1; i >-1; i--){
                
    
    
                Xt_predictiva = Xt_1;
                P_Covar_pre = P_Covar_1 + Q;
                kalmanT = (P_Covar_pre)/(P_Covar_pre + R);
                Xt_s = Xt_predictiva + kalmanT *(device[i].rssi- Xt_predictiva);
                P_Covar_s = (1-kalmanT)*P_Covar_pre; 
                Xt_1 = Xt_s; 
                P_Covar_1 = P_Covar_s;                             
                    
                // console.log(`${device[i].rpidate}`);
            }
            console.log(`rssi filtrado para macRpi:${macrpi} && macTag:${mactag}, es de rssi:${Xt_s}`);
            // Distancia.distancia(mac, Xt_s)
        }else{
            console.log(`No se encontro Registros para macRpi:${macrpi} && macTag:${mactag}`);
        }

    });
    

}
module.exports = {
    filtrado
}
