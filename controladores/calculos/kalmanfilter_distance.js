const RawData = require('../../models/rawdata');
const Distancia = require('../calculos/getdistance');
const DistanciaTag= require('../../models/distancias');


// const scan = require('../database/scan');

let {globalFilter} = require('../variables')
let {globalDataGraph, globalDataGraphDos} = require('../variables')
var {paramsValidacionCaract, etiqueta} = require('../variables')



var respuesta=''; 





let validarFiltro1 = (req)=>{

    let kalmanVariance = 3.2;      //var REAL
    let kalmanCovariance = 0.08;


    let datosJs= {
        error: req.error,
        distancia: req.Distancia,
        macRpi:req.macRpi,
        macTag:req.macTag,
        name:`${req.macRpi}-${req.macTag}`,
        tipo:req.tipo,
        tipov:req.tipov,
        filtrado:0,
        contador:0,
        Q : kalmanCovariance,
        R : kalmanVariance,
        Xt_predictiva : 0.0, //xt~
        Xt_1 : req.Distancia, // x~1           
        Xt_s: req.Distancia,  //xt^
        P_Covar_pre: 0.0,    //pt~
        P_Covar_1: 0.0,      //pt~1   
        P_Covar_s: 0.0,      //pt^
        kalmanT: 0.0,      //kt^
        
    }
    let findIt = globalFilter.findIndex(obj => (obj.macTag === req.macTag &&
                                                 obj.macRpi === req.macRpi && 
                                                 obj.tipov === req.tipov) );
    if(findIt>=0){
        // console.log(`%%%%%%%%%%%%%%%%%%%%%%%%%%`);
        globalFilter[findIt].distancia= req.Distancia
        globalFilter[findIt].tipo= req.tipo
        filtradoDistance(findIt);
    
    }else{
        let esto= {
            name:datosJs.name}
        etiqueta.push(esto)
        globalFilter.push(datosJs);
        // console.log(`\n\n\========================`);

        let findIt2 = globalFilter.findIndex(obj => (obj.macTag === req.macTag && 
                                                    obj.macRpi === req.macRpi && 
                                                    obj.tipov === req.tipov ) );
        filtradoDistance(findIt2);
    }
    
}

let filtradoDistance = async ( index ) =>{

    // console.log(`estoy filtrando ${index}`);
   
    // console.log(scan);

    // console.log(globalFilter);
    // console.log(index);    
    if(index !== undefined){
            
        globalFilter[index].Xt_predictiva = globalFilter[index].Xt_1;
        globalFilter[index].P_Covar_pre = globalFilter[index].P_Covar_1 + globalFilter[index].Q;
        globalFilter[index].kalmanT = (globalFilter[index].P_Covar_pre)/(globalFilter[index].P_Covar_pre + globalFilter[index].R);
        globalFilter[index].Xt_s = globalFilter[index].Xt_predictiva + globalFilter[index].kalmanT *(globalFilter[index].distancia- globalFilter[index].Xt_predictiva);

        globalFilter[index].P_Covar_s = (1-globalFilter[index].kalmanT)*globalFilter[index].P_Covar_pre; 
        Xt_1 = globalFilter[index].Xt_s; 
        globalFilter[index].P_Covar_1 = globalFilter[index].P_Covar_s;                             
                


        globalFilter[index].contador ++;
        // console.log(`Distancia Filtrada: ${globalFilter[index].Xt_s} ___cont=${globalFilter[index].contador}`);

        if( globalFilter[index].contador === 5){
            globalFilter[index].contador = 0;
            let error = Math.sqrt((Math.pow(paramsValidacionCaract[0].distError - parseFloat(globalFilter[index].Xt_s), 2)) )
            globalFilter[index].error = error
            console.log(`Mcrpi= ${globalFilter[index].macRpi} && macTag= ${globalFilter[index].macTag}\nDistancia:`.blue 
                    +`  ${globalFilter[index].Xt_s}`.green +`Error:`+`${globalFilter[index].error}`.red +`\n`);

            //=====================================================================================
            //=====================================================================================
            //=====================================================================================
            if(globalFilter[index].tipov==='generado'){

                let preDataGraphs= {
                    name: globalFilter[index].name,
                    data:[{x:0,y:parseFloat(globalFilter[index].Xt_s)}]
                }
                let findIt = globalDataGraph.findIndex(obj => (obj.name === globalFilter[index].name) );
                if(findIt>=0){
                    var point = {};
                    point.x = ((globalDataGraph[findIt].data).length) ;
                    point.y = parseFloat(globalFilter[index].Xt_s);
                    globalDataGraph[findIt].data.push(point)
                    paramsValidacionCaract[0].signal=true
                    // console.log(paramsValidacionCaract[0]);
                    
                }else{
                    console.log(`Creo el dato nuevo`);
                    let findIt2 = globalDataGraph.findIndex(obj => (obj.name === 'rssi') );
                    if(findIt2>=0){
                    console.log(`Creo el dato Real....`);
    
                        globalDataGraph[findIt2].name = preDataGraphs.name;
                        globalDataGraph[findIt2].data = preDataGraphs.data;
                        paramsValidacionCaract[0].signal=true
                    // console.log(paramsValidacionCaract[0]);
                    
    
                    }else{
                        globalDataGraph.push(preDataGraphs);
                        paramsValidacionCaract[0].signal=true
                    // console.log(paramsValidacionCaract[0]);
    
    
                    }
            }
        }


            //=====================================================================================
            //=====================================================================================
            //=====================================================================================

            if(globalFilter[index].tipov === 'select'){
                let preDataGraphsDos= {
                    name: globalFilter[index].name,
                    data:[{x:0,y:parseFloat(globalFilter[index].Xt_s)}]
                }
                let findIt = globalDataGraphDos.findIndex(obj => (obj.name === globalFilter[index].name) );
                if(findIt>=0){
                    var point = {};
                    point.x = ((globalDataGraphDos[findIt].data).length) ;
                    point.y = parseFloat(globalFilter[index].Xt_s);
                    globalDataGraphDos[findIt].data.push(point)
                    paramsValidacionCaract[0].signal=true
                    // console.log(paramsValidacionCaract[0]);
                
                }else{
                    console.log(`Creo el dato nuevo`);
                    let findIt2 = globalDataGraphDos.findIndex(obj => (obj.name === 'rssi') );
                    if(findIt2>=0){
                    console.log(`Creo el dato Real....`);
    
                        globalDataGraphDos[findIt2].name = preDataGraphsDos.name;
                        globalDataGraphDos[findIt2].data = preDataGraphsDos.data;
                        paramsValidacionCaract[0].signal=true
                    // console.log(paramsValidacionCaract[0]);
    
    
                    }else{
                        globalDataGraphDos.push(preDataGraphsDos);
                        paramsValidacionCaract[0].signal=true
                    // console.log(paramsValidacionCaract[0]);
    
    
                    }


            }
                // console.log(`\n\n\========================`);
        
            }

            
            // let jso= {
            //     name: 'distancia',
            //     xs:new Date().getTime(),
            //     y:globalFilter[index].Xt_s
            // }
            // globalDataGraph.push(jso)

            /* *****************************************
            *	Guardado en base de datos de las distancias Filtrada de los Tags.
            /* *****************************************/
            if(globalFilter[index].tipo == 'tracking'){
                let distanciasTags = new DistanciaTag({

                    macRpi:  globalFilter[index].macRpi,
                    macTag:  globalFilter[index].macTag,
                    distanciaTag:  globalFilter[index].Xt_s,
                    region:  globalFilter[index].region,
                    status: true
                });
                

                distanciasTags.save((err) => {
                    if (err) {
                        console.log(err);
                            respuesta={
                            ok: false,
                            status: 400
                        }
                    }
                    respuesta ={
                        ok:true, status:200
                    }              

                });
            }
        }


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
    filtradoDistance, validarFiltro1
}

