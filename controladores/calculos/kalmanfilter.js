const RawData = require('../../models/rawdata');
const Distancia = require('../calculos/getdistance');
const Distancia2 = require('../calculos/getdistance2');
// const scan = require('../database/scan');

var {paramsValidacionCaract} = require('../variables')



// vector[i].Q = kalmanCovariance;
// vector[i].R = kalmanVariance;
// vector[i].Xt_predictiva = 0.0; //xt~
// vector[i].Xt_1 = -65.0;          // x~1           
// vector[i].Xt_s= -65.0;           //xt^
// vector[i].P_Covar_pre= 0.0;    //pt~
// vector[i].P_Covar_1= 0.0;      //pt~1   
// vector[i].P_Covar_s= 0.0;      //pt^
// vector[i].kalmanT= 0.0;        //kt^ 

var respuesta='';
let filtrado = async ( scan ) =>{

    // console.log(`estoy filtrando`);
    // console.log(scan);



    if(scan !== undefined){
        // console.log(`${}`);
        let kalmanVariance = 65.689//75.86 //74.95 //8.184352498;       //var REAL
        let kalmanCovariance = 0.05;
        let Q = kalmanCovariance;
        let R = kalmanVariance;
        let Xt_predictiva = 0.0; //xt~
        let Xt_1 = scan[0].rssi          // x~1           
        let Xt_s= scan[0].rssi           //xt^
        let P_Covar_pre= 0.0;    //pt~
        let P_Covar_1= 0.0;      //pt~1   
        let P_Covar_s= 0.0;      //pt^
        let kalmanT= 0.0;        //kt^
        // console.log(`el primer dato es: ${Xt_1}`);

        for(let i = 0; i < scan.length; i++){

            Xt_predictiva = Xt_1;
            P_Covar_pre = P_Covar_1 + Q;
            kalmanT = (P_Covar_pre)/(P_Covar_pre + R);
            Xt_s = Xt_predictiva + kalmanT *(scan[i].rssi- Xt_predictiva);

            P_Covar_s = (1-kalmanT)*P_Covar_pre; 
            Xt_1 = Xt_s; 
            P_Covar_1 = P_Covar_s;                             
                
            // console.log(`${device[i].rpidate}`);
        }
        // console.log(`rssi filtrado para macRpi:${scan[2].macrpi} && macTag:${scan[1].mactag}, es de rssi:${Xt_s}`);
        let dataToSendToDistance = {
            mactag: scan[0].mactag,
            macrpi: scan[0].macrpi,
            rssi: Xt_s,
            tipo: scan[0].tipo
        };
        // console.log(`/////////////`);
        // console.log(dataToSendToDistance);
        // console.log(`____________________`);



        let resp = await Distancia.distancia( dataToSendToDistance);


        //ESTA LINEA SE DESCOMENTA PARA HACER TRACK CON LAS CONSTANTES 

        // let resp = await Distancia2.distancia2( dataToSendToDistance);
   


        if(paramsValidacionCaract[0].mostrarGrafica == true){
            let resp2 = await Distancia2.distancia2( dataToSendToDistance);
            // console.log(resp2);

        }

        // console.log(`filtro ${JSON.stringify(resp, null, 2)}`);
        if(resp.ok === true){
            respuesta= {
                ok: true,
                status: 200
            }
        }else{
            respuesta= {
                ok: false,
                status: 400
            }
        }
    }else{
        respuesta= {
            ok: false,
            status: 400
        }
        console.log(`No se encontro Registros para macRpi:${scan[1].macrpi} && macTag:${scan[1].mactag}`);
    }
return respuesta;
}
module.exports = {
    filtrado
}



