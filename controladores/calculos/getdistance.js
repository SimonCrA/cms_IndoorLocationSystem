const ConstDistancia= require('../../models/constantesdistancia');
const DistanciaTag= require('../../models/distancias');
const colors = require('colors')

let {validarFiltro1} = require('./kalmanfilter_distance');

let { cambiar } = require('../database/scan')

var {paramsValidacionCaract} = require('../variables')





var respuesta= '';
let distancia =  async (req) => { 


try {
    // console.log(`Mcrpi= ${req.macrpi} && macTag= ${req.mactag}`);

    let getConstantes = () =>{
        return new Promise((resolve, reject)=>{
            ConstDistancia.find({macRpi:req.macrpi, macTag:req.mactag, tipo:'generado'}).sort({_id:-1})
            .exec(function (err, data){
                err 
                ? reject(err) 
                : resolve(data[0])
            });

        });
    }

    let result = await getConstantes();
    // console.log(result);
    let pot = (-req.rssi + result.rssiProm + result.desviacionEstandar) / (10 * result.nPropagacion);
            let distancia = Math.pow(10, pot);
            // console.log(distancia);
            // console.log(`********************\n`);
            // console.log(paramsValidacionCaract);
            let error = Math.sqrt((Math.pow(paramsValidacionCaract[0].distError - parseFloat(distancia), 2)) )
            let datosJson = {
                Distancia:distancia,
                macRpi:req.macrpi,
                macTag:req.mactag,
                tipo:req.tipo,
                tipov:'generado',
                region: result.idRegion,
                error
                
            }
            validarFiltro1(datosJson);

    
            // console.log(`Mcrpi= ${req.macrpi} && macTag= ${req.mactag}\nDistancia:`.blue +`  ${distancia}`.green +`Error:`+`${error}`.red);

        

            respuesta={
                            ok: true,
                            status: 200
                        }
    
    return respuesta
} catch (error) {
    console.log(`Hay un error`);
    console.log(error);
    return respuesta ={ok:false,status:400}
}

    

}

/***************************************
 * variable modificadas
 * calculateDistancia = distancia
 * 
 * las funciones son la misma.
 * la que hace la busqueda en DB es
 *distancia.
 * 
 * 
 * El documento ahora quedará
 * en partes, ver carpeta configFile.
 * Cada cálculo en un archivo.
 **************************************/

module.exports = {
    distancia
}
