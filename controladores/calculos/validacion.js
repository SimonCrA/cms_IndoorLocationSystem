
const Distancia = require('../../models/distancias');
const colors = require('colors');
const Ubicacion = require ('../../models/ubicacion')
const {trilateracion} = require('../calculos/trilateracion')


var d1=0;
var d2=0;
var d3=0;
var x=0;
var y=0;
var resultadoUbicacion ;
let validacion_Trilateracion = ()=>{

    Ubicacion.find()
        .exec((err, ubicacionRaspi)=>{
            if(err){
                console.log();
            }
            // console.log(ubicacionRaspi);


            
            Distancia.aggregate([{"$group":{_id:"$region", count:{$sum:1}}}])
            .exec( (err, agregate_region) =>{
                if (err) {
                    console.log(`error`.red + err);
            }
            // console.log(agregate_region);
            for (let i = 0; i < agregate_region.length; i++) {

                Distancia.aggregate([{"$group": {_id:"$macRpi", count:{$sum:1}}}])
                .exec( (err, agregate_macrpi) =>{
                        if (err) {
                            console.log(`error`.red + err);
                        };
                        console.log(agregate_macrpi);
                        
                    Distancia.aggregate([{"$group": {_id:"$macTag", count:{$sum:1}}}])
                    .exec( (err, agregate_mactag) =>{
                        if (err) {
                            console.log(`error`.red + err);
                        };
    
                        for (let i = 0; i < agregate_mactag.length; i++) {// se ejecuta segun la cantidad de tag que existen
                            for (let j = 0; j < agregate_macrpi.length; j++) {// se ejecuta segun la cantidad
                                // console.log(agregate_macrpi[j]._id);
                                
                                Distancia.find({macTag:agregate_mactag[i]._id, macRpi:agregate_macrpi[j]._id}).sort({_id:-1}).limit(1)
                                .exec( (err, distancia) =>{
                                    // console.log(`distancia: ${JSON.stringify(distancia, null, 2)}`);
                                    if (err) {
                                        console.log(`err`.red + err);
                                    }
                                    resultadoUbicacion = ubicacionRaspi.find(data => data.macRpi ===agregate_macrpi[j]._id );
                                    console.log(resultadoUbicacion);
                                    if(resultadoUbicacion.axis === 'o'){
                                        d1 = distancia[0].distanciaTag

                                    }
                                    if(resultadoUbicacion.axis === 'x'){
                                        d2 = distancia[0].distanciaTag
                                        x = resultadoUbicacion.xpos

                                    }if(resultadoUbicacion.axis === 'y'){
                                        d3 = distancia[0].distanciaTag
                                        y = resultadoUbicacion.ypos
                                        
                                    }
                                    
                                    // console.log(`d1=${d1}, d2=${d2}, d3=${d3}, x=${x}, y=${y}`);

                                });
                            }

                            console.log(`d1=${d1}, d2=${d2}, d3=${d3}, x=${x}, y=${y}`);
                            trilateracion(d1, d2, d3, x, y)
                        }
                    });
                });
            }
        });
    });
}
    
    
module.exports = {
    validacion_Trilateracion
}