
const Distancia = require('../../models/distancias');
const colors = require('colors');
const Ubicacion = require ('../../models/ubicacion')
const {trilateracion} = require('../calculos/trilateracion')
const Graficar = require('../../models/graficar')


var d1=0;
var d2=0;
var d3=0;
var x=0;
var y=0;

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
        let promesa_mactag = (region) =>{
            return new Promise((resolve, reject) => {

            Distancia.aggregate([{
                $match: {
                    region: region
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

        for (let i = 0; i < resultRegion.length; i++) {
            let resultrpi = await promesa_macrpi(resultRegion[i]._id);
            let resulttag = await promesa_mactag(resultRegion[i]._id);
            // console.log(resultrpi);
            // console.log(resulttag);
            // console.log(resultRegion.length);
            
                    for (let k = 0; k < resulttag.length; k++) {// se ejecuta segun la cantidad de tag que existen
                        for (let j = 0; j < resultrpi.length; j++) {// se ejecuta segun la cantidad
                            // console.log(resultrpi[j]._id);
                            let resultDistancia = await promise_findDistancia(resultrpi[j]._id, resulttag[k]._id);
                            // console.log(`resultdistanica ${JSON.stringify(resultDistancia, null, 2)}`);
                            let ubicacion = await promesa_ubicacion();
                            // console.log(resultrpi[j]._id);
                            let resultadoUbicacion = ubicacion.find(data => data.macRpi === resultrpi[j]._id);
                            // console.log(resultDistancia);
                            if (resultadoUbicacion.axis === 'o') {
                                d1 = resultDistancia[0].distanciaTag
                            }
                            if (resultadoUbicacion.axis === 'x') {
                                
                                d2 = resultDistancia[0].distanciaTag
                                x = resultadoUbicacion.xpos
                            }
                            if (resultadoUbicacion.axis === 'y') {
                                d3 = resultDistancia[0].distanciaTag
                                y = resultadoUbicacion.ypos
                            }
                            


                        }
                        
                        let punto =trilateracion(d1, d2, d3, x, y);
                        // console.log(punto);

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









        
    }catch(e){
        console.log("hola SOY UN HERRROR");
        console.log(e)
    }
}
    
    
module.exports = {
    validacion_Trilateracion
}