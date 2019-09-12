const ConstDistancia= require('../../models/constantesdistancia');
const DistanciaTag= require('../../models/distancias');
const colors = require('colors')



var respuesta= '';
let distancia =  async (req) => {
try {
    let getConstantes = () =>{
        return new Promise((resolve, reject)=>{
            ConstDistancia.find({macRpi:req.macrpi, macTag:req.mactag})
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
            // console.log(`Distancia:`.blue +`  ${distancia}`.green);

            /* *****************************************n
            *	Guardado en bse de datos de las distancias de los Tags.
            /* *****************************************/

            let distanciasTags = new DistanciaTag({

                macRpi: req.macrpi,
                macTag: req.mactag,
                distanciaTag: distancia,
                region: result.idRegion
            });
            respuesta ={
                ok:true, status:200
            }

            distanciasTags.save((err) => {
                if (err) {
                    console.log(err);
                        respuesta={
                        ok: false,
                        status: 400
                    }
                }              

            });
        


    
    return respuesta
} catch (error) {
    
console.log(error);
return respuesta ={ok:false,status:400}
}
    // // console.log(req);
    



    //     ConstDistancia.find({macRpi:req.macrpi, macTag:req.mactag})
    //     // .exec(  (err, constsDataFromDB) => {
    //     .then(  (constsDataFromDB) => {
    //         // if(err) {
    //         //     console.log(err);
    //         // }
    //         if(constsDataFromDB[0] !== undefined){
    //             // console.log(`${constant}`);
                
    
    //         }else{
    //             console.log(`--------------\n`+
    //             `No existe registro de constantes para esta busqueda "\nMacRasp: ${req.macrpi} , MacTag: ${req.mactag}"`+
    //             `\n--------------`);
    
    //             res={
    //                 ok: true,
    //                 status: 200
    //             }
    
    //         }
            
    //     });
    // })

    // return   res
    

}


let test = async(dato) =>{
    for (let index = 0; index < 20000000; index++) {
        dato+=index;
        
    }
    return dato +1
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
