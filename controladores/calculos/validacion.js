/* *******************************************************************
*   NOTA IMPORTANTE:
*   
*	SIMON TENEMOS UN PROBLEMA ACA CON LA VALIDACION Y EL STATUS TRUE DE DISTANCIA
*	NO SE SI HALLA QUE ACOMODAR EL CODIGO DEL RPI O ESTE CODIGO DE VALIDACION...
*   ESTABA REVISANDO Y AVECES QUEDA UN REGISTRO CON UN TAG Y UN RPI ESTO HACE QUE NO SE CONSIGAN
*   LAS TRES DISTANCIAS Y NO SE TRILATERE, SI NO SE TRILATERA ESE REGISTRO EN DISTANCIA
*   NUNCA SE ACTUALIZA A FALSE HACIENDO QUE APAREZCA SIEMPRE EN EL CONSOLE..... 
/* *******************************************************************/

const Distancia = require('../../models/distancias');
const constantes = require('../../models/constantesdistancia');
const colors = require('colors');
const Ubicacion = require ('../../models/ubicacion')
const {trilateracion} = require('../calculos/trilateracion')
const {trilateracionMatriz} = require('../calculos/trilateracion2')
const {jsoCanvas} = require('../variables')
// const {trilateracionMatriz2} = require('./trilateracion3')
const Graficar = require('../../models/graficar')

var r1=0, r2=0, r3=0, x1=0, x2=0, x3=0, y1=0, y2=0, y3=0;
// var fecha_actual =  new Date()

// var fecha_vieja = new Date () -10min
let validacion_Trilateracion = async ()=>{
    try{

        let fecha = new Date().getTime();

        let promesa_ubicacion = () =>{
            return new Promise((resolve, reject) => {
                 Ubicacion.find()
                     .exec((err, ubicacionRaspi) => {
                             err
                                 ?
                                 reject(err) :
                                 resolve(ubicacionRaspi);
                            });
            });
        }
        let promesa_AggregateRegion = () =>{
            return new Promise((resolve, reject) => {
                Ubicacion.aggregate([{
                        "$group": {
                            _id:"$idZona",
                            count: {
                                $sum: 1
                            }
                        }
                    }])
                    .exec((err, aggregate_region) => {
                        err
                            ?
                            reject(err) :
                            resolve(aggregate_region);
                        });
            });
        }
        
        let promesa_macrpi = (region) =>{
            return new Promise((resolve, reject) => {

            Ubicacion.aggregate([{
                $match: {
                    idZona: region
                    // status:true
                }
            },
            {
                "$group": {
                    _id:"$macRpi",
                    count: {
                        $sum: 1
                    }
                }
            }])
            .exec( (err, agregate_macrpi) =>{
                err
                    ?
                    reject(err) :
                    resolve(agregate_macrpi);
                });
        
            });
        }
        let promesa_mactag = (region_) =>{
            return new Promise((resolve, reject) => {

            constantes.aggregate([
            {
                "$match": {
                    "idRegion": region_

                }
            },
            {
                "$group": {
                    _id:"$macTag",
                    count: {
                        $sum: 1
                    }
                }
            }])
            .exec( (err, agregate_mactag) =>{
                err
                    ?
                    reject(err) :
                    resolve(agregate_mactag);
                });
        
            });
        }


        let promise_findDistancia = (pMacRpi,pMacTag) => {
            return new Promise ((resolve, reject) =>{
                // var fecha_actual =  new Date()

                // var fecha_vieja = new Date () - 10min
                Distancia.find({macTag:pMacTag, macRpi:pMacRpi, status: true}).sort({_id:-1}).limit(1)
                .exec( (err, distancia) =>{
                    err 
                        ?
                        reject(err):
                        resolve(distancia)
                        // console.log(distancia);

                });
            });
        }
///////////////////////////////////////////////////////////////////////////////////

        let promesa_UpdateDistance =(id) =>{
            return new Promise((resolve, reject)=>{
                let body = {status:false}

                Distancia.findByIdAndUpdate(id, body, {new:true, runValidators:true },(e, updateDistance)=>{
                    e
                        ?
                        reject({
                            ok:false,
                            e
                        }) :
                        resolve({
                            ok:true,
                            updateDistance
                    })
                })
                    
            
            });

        }
        let promesa_puntoXY =(punto, mactag, region)=>{
            return new Promise((resolve, reject)=>{
                


                let graficar = new Graficar({
                    date: fecha,
                    x: punto.x,        
                    y: punto.y,
                    region,
                    idTag: mactag

                })
                graficar.save((e)=>{
                    e
                        ?
                        reject({
                            ok:false,
                            e
                        }) :
                        resolve({
                            ok:true,
                            graficar
                    })
                })
            });
        }
        
        let resultRegion = await promesa_AggregateRegion()
        console.log(`Esto es el result Region length: ${JSON.stringify(resultRegion, null, 2)}`);
        for (let i = 0; i < resultRegion.length; i++) {
            let resultrpi = await promesa_macrpi(resultRegion[i]._id);
            let resulttag = await promesa_mactag(resultRegion[i]._id);
            console.log(resultRegion[i]._id);

            console.log(resultrpi);

            console.log(resulttag);
            // console.log(resultRegion.length);

            
                    for (let k = 0; k < resulttag.length; k++) {// se ejecuta segun la cantidad de tag que existen
                        console.log(`Target=${resulttag[k]._id}`);
                        let datosPuntoXY = {};
                        for (let j = 0; j < resultrpi.length; j++) {// se ejecuta segun la cantidad
                            // console.log(resultrpi[j]._id);
                            let resultDistancia = await promise_findDistancia(resultrpi[j]._id, resulttag[k]._id);
                            // console.log(`resultdistanica ${JSON.stringify(resultDistancia, null, 2)}`);
                            if(resultDistancia[0] == undefined){
                                console.log(`is undefined`);
                            }else{
                                // console.log(`si esta definido`);
                                let id_distancia = resultDistancia[0]._id
                                let ubicacion = await promesa_ubicacion();
                                // console.log(resultrpi[j]._id);
                                let resultadoUbicacion = ubicacion.find(data => data.macRpi === resultrpi[j]._id);
                                // console.log(resultDistancia);
                                if (resultadoUbicacion.axis === 'o') {
                                    r1 = resultDistancia[0].distanciaTag;
                                    x1=resultadoUbicacion.xpos;
                                    y1=resultadoUbicacion.ypos;
    
                                }
                                if (resultadoUbicacion.axis === 'x') {
                                    
                                    r2 = resultDistancia[0].distanciaTag;
                                    x2 = resultadoUbicacion.xpos;
                                    y2 = resultadoUbicacion.ypos;
                                }
                                if (resultadoUbicacion.axis === 'y') {
                                    r3 = resultDistancia[0].distanciaTag;
                                    x3 = resultadoUbicacion.xpos;
                                    y3 = resultadoUbicacion.ypos;
                                }
                                
                                datosPuntoXY= {
                                    x1, x2, x3, y1, y2, y3, r1, r2, r3
                                }
    
                                let resultUpdateDistance = await promesa_UpdateDistance(id_distancia);
                                // console.log(resultUpdateDistance.ok);
                            }

                        }////Fin del for para las RaspberryPi
                        
                        let js={

                        }


                        let findIt = jsoCanvas.findIndex(obj => (obj.name === name) );
                        if(findIt>=0){
                            var point = {};
                            point.x = ((globalDataGraphDistance[findIt].data).length) ;
                            point.y = parseFloat(distancia);
                            globalDataGraphDistance[findIt].data.push(point)
                            
                            // console.log(paramsValidacionCaract[0]);
                        
                        }else{
                            console.log(`Creo el dato nuevo`);
                            let findIt2 = globalDataGraphDistance.findIndex(obj => (obj.name === 'rssi') );
                            if(findIt2>=0){
                            console.log(`Creo el dato Real....`);
            
                                globalDataGraphDistance[findIt2].name = preDataGraphsDos.name;
                                globalDataGraphDistance[findIt2].data = preDataGraphsDos.data;
                                
                            // console.log(paramsValidacionCaract[0]);
            
            
                            }else{
                                globalDataGraphDistance.push(preDataGraphsDos);
                                
                            // console.log(paramsValidacionCaract[0]);
            
            
                            }
        
        
                        }

                        jsoCanvas.push(js)

                        let punto =trilateracion(r1, r2, r3, x2, y3);
                        let punto2 =trilateracionMatriz(datosPuntoXY);
                        // let punto3 = trilateracionMatriz2(datosPuntoXY);
                        // console.log(resulttag[k]._id);




                        // console.log(`T_1: d1=${r1}, d2=${r2}, d3=${r3},`+`Error=${punto.error}`.red);
                        // console.log(`T_2: d1=${r1}, d2=${r2}, d3=${r3}, `+`Error=${punto2.error}`.red);
                        // console.log(`\n`);
                        console.log(`Trilateracion_1:`);
                        console.log(punto);
                        // console.log(`\n`);
                        // console.log(`Trilateracion_2:`);
                        // // // console.log(`\n`);
                        // console.log(punto2);
                        // console.log(`\n`);



                        // console.log(`Trilateracion_3:`);
                        // console.log(punto3);
                        // console.log(`\n`);
                        // if(punto.status === true){
                        //     // let resultUpdateDistance = await promesa_UpdateDistance(id_distancia);

                        //     // if(resultUpdateDistance.ok === true){
                        //         let guardarpuntoXY = await promesa_puntoXY(punto, resulttag[k]._id, resultRegion[i]._id);
                        //         console.log(guardarpuntoXY.ok);

                        //     // }else{console.log(`No se actualizo el estatus de las distancias `);}

                        // }else{console.log(`P(X,Y) fuera de la region no se puede guardar`);}
                    }////Fin del for para los TAGS
        }////Fin del for para las regiones

    // console.log(`======================FINALIZO=========================`.rainbow);

    }catch(e){
        console.log("hola SOY UN HERRROR");
        console.log(e)
    }
}
    
module.exports = {
    validacion_Trilateracion
}