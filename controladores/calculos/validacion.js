
const Distancia = require('../../models/distancias');
const colors = require('colors');
const Ubicacion = require ('../../models/ubicacion')
const {trilateracion} = require('../calculos/trilateracion')
const {trilateracionMatriz} = require('../calculos/trilateracion2')
const Graficar = require('../../models/graficar')


var r1=0;
var r2=0;
var r3=0;
var x1=0;
var x2=0;
var x3=0;
var y1=0;
var y2=0;
var y3=0;
// var fecha_actual =  new Date()

// var fecha_vieja = new Date () -10min
let validacion_Trilateracion = async ()=>{
    try{


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
                Distancia.aggregate([{
                        "$group": {
                            _id:"$region",
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

            Distancia.aggregate([{
                $match: {
                    region: region
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

            Distancia.aggregate([
            {
                "$match": {
                    "region": region_
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
                Distancia.find({macTag:pMacTag, macRpi:pMacRpi}).sort({_id:-1}).limit(1)
                .exec( (err, distancia) =>{
                    err 
                        ?
                        reject(err):
                        resolve(distancia)
                        // console.log(distancia);


            });




            });

        }

        let promesa_puntoXY =(punto, mactag, region)=>{
            return new Promise((resolve, reject)=>{
                


                let graficar = new Graficar({
                    date: new Date().getTime(),
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
        console.log(`Esto es el result Region length: ${JSON.stringify(resultRegion)}`);
        for (let i = 0; i < resultRegion.length; i++) {
            let resultrpi = await promesa_macrpi(resultRegion[i]._id);
            let resulttag = await promesa_mactag(resultRegion[i]._id);
            // console.log(resultrpi);

            console.log(`resultTag: ${JSON.stringify(resulttag,null, 1)}`);
            // console.log(resultRegion.length);
            
                    for (let k = 0; k < resulttag.length; k++) {// se ejecuta segun la cantidad de tag que existen
                        let datosPuntoXY = {};
                        for (let j = 0; j < resultrpi.length; j++) {// se ejecuta segun la cantidad
                            // console.log(resultrpi[j]._id);
                            let resultDistancia = await promise_findDistancia(resultrpi[j]._id, resulttag[k]._id);
                            // console.log(`resultdistanica ${JSON.stringify(resultDistancia, null, 2)}`);
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
                                x1,
                                x2,
                                x3,
                                y1,
                                y2,
                                y3,
                                r1,
                                r2,
                                r3
                            }


                        }
                        
                        let punto =trilateracion(r1, r2, r3, x2, y3);
                        let punto2 =trilateracionMatriz(datosPuntoXY);
                        console.log(resulttag[k]._id);
                        console.log(`T_1: d1=${r1}, d2=${r2}, d3=${r3},`+`Error=${punto.e}`.red);
                        console.log(`T_2: d1=${r1}, d2=${r2}, d3=${r3}, `+`Error=${punto2.e}`.red);

                        console.log(punto);
                        console.log(punto2);

                        let guardarpuntoXY = await promesa_puntoXY(punto, resulttag[k]._id, resultRegion[i]._id);
                        console.log(guardarpuntoXY.ok);
                    }
        }
        
        //     // console.log(agregate_macrpi[j]._id);
            
        //     Distancia.find({macTag:agregate_mactag[i]._id, macRpi:agregate_macrpi[j]._id}).sort({_id:-1}).limit(1)
        //     .exec( (err, distancia) =>{
        //         // console.log(`distancia: ${JSON.stringify(distancia, null, 2)}`);
        //         if (err) {
        //             console.log(`err`.red + err);
        //         }
        //         resultadoUbicacion = ubicacionRaspi.find(data => data.macRpi ===agregate_macrpi[j]._id );
        //         console.log(resultadoUbicacion);
        //         if(resultadoUbicacion.axis === 'o'){
        //             d1 = distancia[0].distanciaTag
    
        //         }
        //         if(resultadoUbicacion.axis === 'x'){
        //             d2 = distancia[0].distanciaTag
        //             x = resultadoUbicacion.xpos
    
        //         }if(resultadoUbicacion.axis === 'y'){
        //             d3 = distancia[0].distanciaTag
        //             y = resultadoUbicacion.ypos
                    
        //         }
                
        //         // console.log(`d1=${d1}, d2=${d2}, d3=${d3}, x=${x}, y=${y}`);
    
        //     });
        // }
    
        // console.log(`d1=${d1}, d2=${d2}, d3=${d3}, x=${x}, y=${y}`);
        // trilateracion(d1, d2, d3, x, y);                 









    console.log(`======================FINALIZO=========================`.rainbow);
    }catch(e){
        console.log("hola SOY UN HERRROR");
        console.log(e)
    }
}
    
    
module.exports = {
    validacion_Trilateracion
}