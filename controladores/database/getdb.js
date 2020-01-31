
const InfoUbicacion = require('../../models/ubicacion');
const Region = require('../../models/zona')
const Graficar = require('../../models/graficar')
const Activo = require('../../models/activo');

const Toptensales = require('../../models/reportetoptenventas');


const Reportetopten = require('../../models/reportetopten');
const {crearReporte} = require('./SaveDataToReports');

const {conversorM_P} = require('../variables')

const TagInfo = require ('../../models/tagInfo')


const async = require('async');

/* *****************************************
*	Buscar Activos
*	
/* *****************************************/

let searchAssets = async (req, res) => {
    try {

        let dataBusqueda = {
                tipo: '',
                nombre: '',
                date: 0
            }
        
        let promise_Activo = () => {
            return new Promise((resolve, reject) => {
                let termino = (req.params.termino).toLowerCase() ; 
                let item = (req.params.item).toLowerCase() 
                let regex = new RegExp(termino, 'g')
                if(item==='nombre'){ 
                    var busqueda2 = {nombre:regex, estado:true};
                }
                else if(item==='color'){
                    var busqueda2 = {color:regex, estado:true};
                    dataBusqueda.tipo = item;
                }
                else if(item==='modelo'){
                    var busqueda2 = {modelo:regex, estado:true};
                    dataBusqueda.tipo = item;
                }
                else if(item==='anio'){ 
                    var busqueda2 = {anio:regex, estado:true}
                    dataBusqueda.tipo = item
                 }

                 else{
                     return res.status(400).json({ok:false, error:{
                        mensaje: "there isn't any asset with that Item"
                     }})
                 }
            
                // Activo.find(JSON.parse(`{"${item}":"${regex}"}`))
                Activo.find(busqueda2)
                    // .limit(5)
                    .populate('idTag')
                    .exec((err, ActivoBuscado) => {
            
                    if(err){
                        reject(err)
                    }

                    if(Array.isArray(ActivoBuscado) && ActivoBuscado.length){

                        for(let i = 0; i< ActivoBuscado.length ; i++){
                            ActivoBuscado[i].idTag.batteryLevel = (((ActivoBuscado[i].idTag.batteryLevel /1000) /3) *100).toFixed(2)
                        }
                        dataBusqueda.date = new Date().getTime();
    
                        if (item === 'color') {
                            dataBusqueda.nombre = ActivoBuscado[0].color;
                        }else if (item === 'modelo'){
                            dataBusqueda.nombre = ActivoBuscado[0].modelo;
                        }
                        resolve(ActivoBuscado)
                    }else{
                        reject({error:'empty'})

                    }
                        

                    

                            crearReporte(dataBusqueda);
                            console.log(ActivoBuscado[0]);
                            
                           
                    });
            });

        }
        let promise_pointXY = (resultPromiseActivo)=>{
            return new Promise((resolve, reject) => {

                console.log(resultPromiseActivo);
                
                let idActivo = resultPromiseActivo.idTag.mactag
                // console.log(idActivo);

                Graficar.find({idTag:idActivo})
                    .populate([{
                        path:'region',
                        model:'zona',
                        populate:{
                            path:'idPiso',
                            model:'zona'
                        }
                }
            ])
                    // .populate('zona')
                    .sort({_id:-1}).limit(1)
                    .exec((err, puntoBuscado) => {

                        if (err) {
                            reject({
                                ok: false,
                                err
                            })
                        };

                        if (!puntoBuscado) {
                            reject({
                                ok: false,
                                err: {
                                    mensaje: "there isn't any asset with that name"
                                }
                            });
                        };
                        for(let i = 0 ; i < puntoBuscado.length ; i++){

                            puntoBuscado[i].x = conversorM_P(puntoBuscado[i].x)
                            puntoBuscado[i].y = conversorM_P(puntoBuscado[i].y)
                        }
                        // Graficar.countDocuments({idActivo}, (err, conteo) => {
                            resolve(puntoBuscado);
                        // });

                        
                    });  
                


                
            });
        }
        
        let arrayfinish =[]
        let js
        let resultPromiseActivo = await promise_Activo()

        dataBusqueda.date = new Date().getTime();
        crearReporte(dataBusqueda);

        // console.log(resultPromiseActivo);
        // console.log(`uno`);

        for (let i = 0; i < resultPromiseActivo.length; i++) {
            // console.log(`vuelta ${i}`);
            
            let resultPromisePoint = await promise_pointXY(resultPromiseActivo[i]);
            // console.log(resultPromisePoint);
            js={activo: resultPromiseActivo[i], puntoXY: resultPromisePoint[0]}
            arrayfinish.push(js)
        }

        // console.log(JSON.stringify(arrayfinish, null, 2));
        dataActivo = arrayfinish;
        if(arrayfinish[0]===undefined){
            
            return res.status(400).json({
                ok: true,
                err: {
                    mensaje: "there isn't any asset with that name"
                }
            });

        }else{


            return res.status(200).json({
                ok: true,
                activo: arrayfinish
            });
        }



        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ok:false, error})
        
    }
    
}

let getTopTen = (req, res) =>{
    
    try {
        let tipo = req.params.tipo
        let order= req.params.order
        let counter
        if(order==="up"){
            counter=-1;
        }else if(order==="down"){ 
            counter=1;
        }
        let busquedaDeReporte = () =>{
            
            return new Promise((resolve, reject) => {
                Reportetopten.find({tipo: tipo}).sort({count:counter}).exec((err, toptenBuscado) => {
                    
                   if(err){

                       reject({
                            ok: false,
                            err
                        }) 
                   } 
                    if (!toptenBuscado) {
                        reject({
                            ok: false,
                            err: {
                                msg: 'No han habido busquedas recientemente'
                                    }
                                })
                        }
                            resolve(
                                {
                                    ok: true,
                            toptenBuscado
                        })
                        
                    })
                    
            });
    }
    
    busquedaDeReporte().then(data =>{
        let body = data.toptenBuscado
        let arrayjs=[]
        for (let i = 0; i < body.length; i++) {
            arrayjs.push({
                n: i+1,
                modelo: body[i].nombre,
                busquedas:body[i].count
            })
            
        }
        console.log(body);
        res.status(200).jsonp({
            arrayjs
        })
    }, err =>{
        console.log(err);
        res.status(400).jsonp({
            err
        })

    });
    } catch (error) {
        console.log(error);
    }

}




let getTopTenSales = (req, res) =>{
    try {
        console.log('entre en ventas');
         let order= req.params.order
        let counter
        if(order === "up"){
            counter=-1;
        }else if(order === "down"){ 
            counter=1;
        }
         let busquedaDeReporte = () => {
            return new Promise((resolve, reject) => {
                Toptensales.find()
                    .sort({count: counter})
                    .exec((err, activoEncontrado)=>{
                        if (err) {

                            reject({
                                ok: false,
                                err
                            })
                        }
                        if (!activoEncontrado) {
                            reject({
                                ok: false,
                                err: {
                                    msg: 'No han habido busquedas recientemente'
                                }
                            })
                        }
                        resolve({
                            ok: true,
                            activoEncontrado
                        })
                        
                    })
            });
        }
    busquedaDeReporte().then(data => {
        let body = data.activoEncontrado
        let arrayjs = []
        for (let i = 0; i < body.length; i++) {
            arrayjs.push({
                n: i + 1,
                marca:body[i].brand,
                modelo: body[i].model,
                anio: body[i].year,
                color: body[i].color,
                busquedas: body[i].count
            })

        }
        console.log(body);
        res.status(200).jsonp({
            arrayjs
        })
    }, err => {
        console.log(err);
        res.status(400).jsonp({
            err
        })

    });

        
    } catch (error) {
        console.log(error);
    }
}

/* *****************************************
*	ZONA
*	
/* *****************************************/

let findZona = (req, res, next) => {
	
	// console.log(sample, mac, muestras)
	async.parallel({
		idzona: function(callback) {
            InfoUbicacion.aggregate([
            {
                "$group": {
                    _id:"$idZona",
                    count: {
                        $sum: 1
                    }
                }
            }])
            .exec(callback)
        },
		tags: function(callback) {
			TagInfo.find().select('mactag')
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
		// Successful, so render.
		
		// console.log({'idzonas':results.idzona, 'tags':results.tags});
		res.status(200).jsonp({'idzonas':results.idzona, 'tags':results.tags});
		
    });

};


/* *****************************************************************************************************
*	GET RPI DE REGIONES
*	
/* *****************************************/



let regionId = (region) =>{
    return new Promise((resolve, reject ) =>{

        InfoUbicacion.find({ estatus: true, idZona:region })
            .populate('idZona')
    
            .exec((err, region) => {
    
                if (err) {
                    return reject(err)
                }
                if(Array.isArray(region) && region.length){
                    return resolve({
                        ok: true,
                        region
                    })
                }else{
                    return reject('Data is Empty')

                }

                   
            });
    })

}


/* *****************************************
*	Region
*	
/* *****************************************/



let region = (req, res, next) =>{
        
    Region.find({ estatus: true, tipo:'region' })
        .populate('idPiso')

        .exec((err, region) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            for(let i = 0 ; i < region.length ; i++){

                region[i].bottomLeft = conversorM_P(region[i].bottomLeft)
                region[i].bottomRigth = conversorM_P(region[i].bottomRigth)
                region[i].topLeft = conversorM_P(region[i].topLeft)
                region[i].topRight = conversorM_P(region[i].topRight)
            }
            
            res.json({
                ok: true,
                region
            });

        });

}

/* *****************************************
*	Activos
*	
/* *****************************************/


let activoGet = (req, res, next) =>{
        
    Activo.find({estado:true})
        .populate('idTag')
        .exec((err, activoBuscado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            
            res.status(200).json({
                ok: true,
                activoBuscado
            });

        });

}

/* *****************************************
*	Pisos
*	
/* *****************************************/


let pisos = (req, res, next) =>{
        
    Region.find({ estatus: true, tipo:'piso' })
        .populate('tagInfo')

        .exec((err, pisos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok: true,
                pisos
            });

        });

}


/* *****************************************
*	Ubicacion Rpi
*	
/* *****************************************/
let ubicacion = (req, res, next) =>{
        
    InfoUbicacion.find({ estatus: true })
        .populate('idZona')
        .populate('compartido')

        .exec((err,infoUbicacion ) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            // console.log(infoUbicacion);

            for(let i = 0 ; i < infoUbicacion.length ; i++){

                infoUbicacion[i].xpos = conversorM_P(infoUbicacion[i].xpos)
                infoUbicacion[i].ypos = conversorM_P(infoUbicacion[i].ypos)
            }

            res.json({
                ok: true,
                infoUbicacion
            });

        });

}


/* *****************************************
*	TAGS ACTIVOS
*	
/* *****************************************/
let getTags = (req, res, next) =>{
        
    TagInfo.find()

        .exec((err,tagGuardado ) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }


            tagGuardado.forEach((element, index) => {
                if(element.batteryLevel != undefined ){
                    // console.log(index);
                    console.log(element.batteryLevel);
                    
                    tagGuardado[index].batteryLevel = (((element.batteryLevel/1000) /3) *100)   .toFixed(2)
                    
                    console.log(element.batteryLevel);
                }
            });

            // console.log(tagGuardado);
            res.status(200).json({
                ok: true,
                tagGuardado
            });

        });

}
/* *****************************************
*	TAGS inactivos
*	
/* *****************************************/
let getTagsfalse = (req, res, next) =>{
        
    TagInfo.find({estado: false})

        .exec((err,tagGuardado ) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }


            tagGuardado.forEach((element, index) => {
                if(element.batteryLevel != undefined ){
                    // console.log(index);
                    console.log(element.batteryLevel);
                    
                    tagGuardado[index].batteryLevel = (((element.batteryLevel/1000) /3) *100)   .toFixed(2)
                    
                    console.log(element.batteryLevel);
                }
            });

            // console.log(tagGuardado);
            res.status(200).json({
                ok: true,
                tagGuardado
            });

        });

}

let contador = (req, res, next)=>{

	async.parallel({
		tagTrue: function(callback) {
            TagInfo.find({estado: true}).count()
              .exec(callback);
        },
		tagFalse: function(callback) {
            TagInfo.find({estado: false}).count()
              .exec(callback);
        },
		tagBateryhigh: function(callback) {
            TagInfo.find({batteryLevel:{$gt:2250}}).count()
              .exec(callback);
        },
		tagBaterymedium: function(callback) {
            TagInfo.find({$and: 
                [ 
                  {batteryLevel:{$lt:2249}}, 
                  {batteryLevel:{$gt:1050}} 
                ] 
            }).count()
              .exec(callback);
        },
		tagBateryLow: function(callback) {
            TagInfo.find({batteryLevel:{$lt:1049}}).count()
              .exec(callback);
        },
		regionesTrue: function(callback) {
			Region.find({tipo:'region', estatus: true}).count()
              .exec(callback);
        },
		regionesFalse: function(callback) {
			Region.find({tipo:'region', estatus: false}).count()
              .exec(callback);
        },
		pisoTrue: function(callback) {
			Region.find({tipo:'piso', estatus: true}).count()
              .exec(callback);
        },
		pisoFalse: function(callback) {
			Region.find({tipo:'piso', estatus: false}).count()
              .exec(callback);
        },
		gatewayTrue: function(callback) {
			InfoUbicacion.find({estatus:true}).count()
              .exec(callback);
        },
		gatewayFalse: function(callback) {
			InfoUbicacion.find({estatus:false}).count()
              .exec(callback);
        }

    }, function(err, results) {
        if (err) { return next(err); }
		// Successful, so render.
		
		// console.log({'idzonas':results.idzona, 'tags':results.tags});
		res.status(200).jsonp({
            'tagTrue':results.tagTrue,
             'tagFalse':results.tagFalse,
             'tagBateryhigh':results.tagBateryhigh,
             'tagBaterymedium':results.tagBaterymedium,
             'tagBateryLow': results.tagBateryLow,

             'regionesTrue': results.regionesTrue,
             'regionesFalse': results.regionesFalse,
             'pisoTrue': results.pisoTrue,
             'pisoFalse': results.pisoFalse,
             'gatewayTrue': results.gatewayTrue,
             'gatewayFalse': results.gatewayFalse
            
            });
		
    });


}

module.exports = {
    region,
    ubicacion,
    findZona,
    pisos,
    searchAssets,
    activoGet,
     getTags, 
    regionId, 
    getTopTen,
    getTopTenSales,
    contador,
    getTagsfalse
}
