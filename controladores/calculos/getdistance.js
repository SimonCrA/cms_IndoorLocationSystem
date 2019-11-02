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
                // console.log(`linea26: ${JSON.stringify(data)}`);
                if(err){
                    // console.log(`ACA NUNCA DEBE ENTRAR`);
                    reject(
                        {ok:false,err}
                    ) 
                }

                else if(data !== undefined && data.length > 0){
                    // console.log(`YUPIIIIII`);
                    resolve(data[0])
                }
                else{
                    // console.log(`NO SE ENCONTRO NADA`);
                    reject(
                        {ok:false,mesage:'data is empty'}
                    ) 
                    
                }
            });

        });
    }

    let result = await getConstantes().then(dato=>{
        // console.log(dato);
        let pot = (-req.rssi + dato.rssiProm + dato.desviacionEstandar) / (10 * dato.nPropagacion);
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
                    region: dato.idRegion,
                    error
                    
                }
                validarFiltro1(datosJson);
    
        
                // console.log(`Mcrpi= ${req.macrpi} && macTag= ${req.mactag}\nDistancia:`.blue +`  ${distancia}`.green +`Error:`+`${error}`.red);
    
            
    
                respuesta={
                                ok: true,
                                status: 200
                            }
        

    
    }, err =>{

        respuesta={
            ok: false,
            status: 400
        }
        console.log(`Error: ${JSON.stringify(err)}`);
    } );
    
    
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
