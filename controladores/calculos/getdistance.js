const ConstDistancia= require('../../models/constantesdistancia');
const DistanciaTag= require('../../models/distancias');
const colors = require('colors')

let {validarFiltro1} = require('./kalmanfilter_distance');

let { cambiar } = require('../database/scan')

var {paramsValidacionCaract , etiqueta2, globalDataGraphDistance} = require('../variables')





var respuesta= '';
let distancia =  async (req) => { 


try {
    // console.log(req);
    let type='';
    if(req.tipo==='tracking'){
        type='established'
    }
    else if(req.tipo==='validar'){
        type='generado'
    }

    let getConstantes = () =>{
        return new Promise((resolve, reject)=>{
            ConstDistancia.find({macRpi:req.macrpi, macTag:req.mactag, type:type}).sort({_id:-1})
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
        // console.log(req.rssi);
        let pot = (-req.rssi + dato.rssiProm + dato.standardDeviation) / (10 * dato.propagationN);
        // console.log(pot);
                let distance = Math.pow(10, pot);
                // console.log(distance);
                // console.log(`********************\n`);
                // console.log(paramsValidacionCaract);
                let error = Math.sqrt((Math.pow(paramsValidacionCaract[0].distError - parseFloat(distance), 2)) )
                
                // console.log(distance, req.macrpi, req.mactag);
                let datosJson = {
                    Distancia:distance,
                    macRpi:req.macrpi,
                    macTag:req.mactag,
                    tipo:req.tipo,
                    tipov:'generado',
                    region: dato.idRegion,
                    error
                    
                }
                // console.log(req);
                // console.log(datosJson);
                let res = validarFiltro1(datosJson);
                let name = `${req.macrpi}-${req.mactag}`

                let preDataGraphsDos= {
                    name: name,
                    data:[{x:0,y:parseFloat(distancia)}]
                }
                let findIt = globalDataGraphDistance.findIndex(obj => (obj.name === name) );
                if(findIt>=0){
                    var point = {};
                    point.x = ((globalDataGraphDistance[findIt].data).length) ;
                    point.y = parseFloat(distancia);
                    globalDataGraphDistance[findIt].data.push(point)
                    
                    // console.log(paramsValidacionCaract[0]);
                
                }else{
                    // console.log(`Creo el dato nuevo`);
                    let findIt2 = globalDataGraphDistance.findIndex(obj => (obj.name === 'rssi') );
                    if(findIt2>=0){
                    // console.log(`Creo el dato Real....`);
    
                        globalDataGraphDistance[findIt2].name = preDataGraphsDos.name;
                        globalDataGraphDistance[findIt2].data = preDataGraphsDos.data;
                        
                    // console.log(paramsValidacionCaract[0]);
    
    
                    }else{
                        globalDataGraphDistance.push(preDataGraphsDos);
                        
                    // console.log(paramsValidacionCaract[0]);
    
    
                    }


                }
        
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

        console.log(`Error: ${JSON.stringify(err)}|| macRpi: ${req.macrpi}, macTac: ${req.mactag}`);
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
