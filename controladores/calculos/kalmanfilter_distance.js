const RawData = require('../../models/rawdata');
const Distancia = require('../calculos/getdistance');
// const scan = require('../database/scan');

let {globalFilter} = require('../variables')


var respuesta='';





let validarFiltro = (req)=>{

    let kalmanVariance = 8.184352498;      //var REAL
    let kalmanCovariance = 0.05;


    let datosJs= {
        distancia: req.Distancia,
        macRpi:req.macRpi,
        macTag:req.macTag,
        filtrado:0,
        contador:0,
        Q : kalmanCovariance,
        R : kalmanVariance,
        Xt_predictiva : 0.0, //xt~
        Xt_1 : req.Distancia,          // x~1           
        Xt_s: req.Distancia,           //xt^
        P_Covar_pre: 0.0,    //pt~
        P_Covar_1: 0.0,      //pt~1   
        P_Covar_s: 0.0,      //pt^
        kalmanT: 0.0       //kt^
        
    }
    let findIt = globalFilter.findIndex(obj => (obj.macTag === req.macTag && obj.macRpi === req.macRpi) );
    if(findIt>=0){
        console.log(`%%%%%%%%%%%%%%%%%%%%%%%%%%`);
        globalFilter[findIt].distancia= req.Distancia
        filtradoDistance(findIt);
    
    }else{
        globalFilter.push(datosJs);
        console.log(`\n\n\========================`);

        let findIt2 = globalFilter.findIndex(obj => (obj.macTag === req.macTag && obj.macRpi === req.macRpi) );
        filtradoDistance(findIt2);
    }
    
}


let filtradoDistance = async ( index ) =>{

    // console.log(`estoy filtrando`);
    // console.log(scan);

    // console.log(globalFilter);
    // console.log(index);    
    if(index !== undefined){
            
        



// console.log(`el primer dato es: ${Xt_1}`);



        globalFilter[index].Xt_predictiva = globalFilter[index].Xt_1;
        globalFilter[index].P_Covar_pre = globalFilter[index].P_Covar_1 + globalFilter[index].Q;
        globalFilter[index].kalmanT = (globalFilter[index].P_Covar_pre)/(globalFilter[index].P_Covar_pre + globalFilter[index].R);
        globalFilter[index].Xt_s = globalFilter[index].Xt_predictiva + globalFilter[index].kalmanT *(globalFilter[index].distancia- globalFilter[index].Xt_predictiva);

        globalFilter[index].P_Covar_s = (1-globalFilter[index].kalmanT)*globalFilter[index].P_Covar_pre; 
        Xt_1 = globalFilter[index].Xt_s; 
        globalFilter[index].P_Covar_1 = globalFilter[index].P_Covar_s;                             
                


        globalFilter[index].contador ++;

        console.log(`Distancia Filtrada: ${globalFilter[index].Xt_s} ___cont=${globalFilter[index].contador}`);
            // console.log(`${device[i].rpidate}`);
       
        // console.log(`rssi filtrado para macRpi:${scan[2].macrpi} && macTag:${scan[1].mactag}, es de rssi:${Xt_s}`);
        
        
        
        
        // let dataToSendToDistance = {
        //     mactag: scan[1].mactag,
        //     macrpi: scan[2].macrpi,
        //     rssi: Xt_s
        // };

        // let resp = await Distancia.distancia( dataToSendToDistance);
        // console.log(`filtro ${JSON.stringify(resp, null, 2)}`);
    //     if(resp.ok === true){
    //         respuesta= {
    //             ok: true,
    //             status: 200
    //         }
    //     }else{
    //         respuesta= {
    //             ok: false,
    //             status: 400
    //         }
    //     }
    
    }else{
        respuesta= {
            ok: false,
            status: 400
        }
        console.log(`No se encontro Registros para macRpi: && macTag:`);
    }
return respuesta;
}
module.exports = {
    filtradoDistance,validarFiltro
}