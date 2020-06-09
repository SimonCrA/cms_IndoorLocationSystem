const ConstDistancia= require('../../models/constantesdistancia');
const DistanciaTag= require('../../models/distancias');
const colors = require('colors')

var {validarFiltro1} = require('./kalmanfilter_distance')

let {DistanciaError} = require('../variables')

var {paramsValidacionCaract,globalDataGraphDistanceDos} = require('../variables')





var respuesta= '';
let distancia2 =  async (req) => { 
try {
    let getConstantes = () =>{
        return new Promise((resolve, reject)=>{
            ConstDistancia.find({macRpi:req.macrpi, macTag:req.mactag, type:`seleccionado`}).sort({_id:-1})
            .exec(function (err, data){
                err 
                ? reject(err) 
                : resolve(data[0])
            });

        });
    }

    let result = await getConstantes();
    // console.log(result);
    let pot = (-req.rssi + result.rssiProm + result.standardDeviation) / (10 * result.propagationN);
            let distancia = Math.pow(10, pot);
            // console.log(distancia);
            // console.log(`********************\n`);
            let error = Math.sqrt((Math.pow(paramsValidacionCaract[0].distError - parseFloat(distancia), 2)) )


            let datosJson = {
                Distancia:distancia,
                macRpi:req.macrpi,
                macTag:req.mactag, 
                tipo:req.tipo,
                tipov:'select',
                region: result.idRegion,
                error
                
            }
            validarFiltro1(datosJson);


            let name = `${req.macrpi}-${req.mactag}`

                let preDataGraphsDos= {
                    name: name,
                    data:[{x:0,y:parseFloat(distancia)}]
                }
                let findIt = globalDataGraphDistanceDos.findIndex(obj => (obj.name === name) );
                if(findIt>=0){
                    var point = {};
                    point.x = ((globalDataGraphDistanceDos[findIt].data).length) ;
                    point.y = parseFloat(distancia);
                    globalDataGraphDistanceDos[findIt].data.push(point)
                    
                    // console.log(paramsValidacionCaract[0]);
                
                }else{
                    // console.log(`Creo el dato nuevo`);
                    let findIt2 = globalDataGraphDistanceDos.findIndex(obj => (obj.name === 'rssi') );
                    if(findIt2>=0){
                    // console.log(`Creo el dato Real....`);
    
                        globalDataGraphDistanceDos[findIt2].name = preDataGraphsDos.name;
                        globalDataGraphDistanceDos[findIt2].data = preDataGraphsDos.data;
                        
                    // console.log(paramsValidacionCaract[0]);
    
    
                    }else{
                        globalDataGraphDistanceDos.push(preDataGraphsDos);
                        
                    // console.log(paramsValidacionCaract[0]);
    
    
                    }


            }

    
            // console.log(`GET2..Mcrpi= ${req.macrpi} && macTag= ${req.mactag}\nDistancia:`.blue +`  ${distancia}`.green +`Error:`+`${error}`.red);

 

            respuesta={
                ok: true,
                status: 200
            }
    
    return respuesta
} catch (error) {
    
console.log(error);
return respuesta ={ok:false,status:400}
}
    
    




}


let test = async(dato) =>{
    for (let index = 0; index < 20000000; index++) {
        dato+=index;
        
    }
    return dato +1
}

module.exports = {
    distancia2
}



