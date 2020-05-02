// import mongoose from 'mongoose';
const mongoose =require('mongoose')
const InfoUbicacion = require('../../models/ubicacion');
const Region = require('../../models/zona')
const Graficar = require('../../models/graficar')
const Activo = require('../../models/activo');
const timerToreciveActive = require('../../models/timerToreciveActive');
const promesas = require('./promesas')

const Toptensales = require('../../models/reportetoptenventas');
const ReporteAtendidos = require('../../models/reporteatendidosperuser')

const Reportetopten = require('../../models/reportetopten');
const {

    crearReporteAtendidosVendedor,
    crearReporte, crearReporteTiempoVenta,
    crearReporteTiempoServicio,
    crearReporteMasTiempoDealer,crearReporteTiempoSinMoverse
    
        } = require('./SaveDataToReports');

const {conversorM_P,Users} = require('../variables')

const TagInfo = require ('../../models/tagInfo')


const async = require('async');


/* *****************************************
*	Buscar activos en una reigon
*	
/* *****************************************/
let searchAssetsRegion = async (req, res, next) =>{
    try{
    let idRegion = req.params.idregion
    let fechaActual = (new Date().getTime()) - 180000
    let arrayTags = []
    let Active=[]
    let buscarAactivosenRegion = (region, fecha)=>{
        
        return new Promise((resolve, reject)=>{

            // console.log(region);
            Graficar.aggregate([
                {$match:{
                    region:mongoose.Types.ObjectId(region),
                    // date:{$gte:new Date(fecha)}
                }},
        
                {$group:{_id:"$idTag", cantidad_Registros:{$sum:1}}}
        ])
            .exec((err, puntoBuscado) => {
                // console.log(puntoBuscado);

                if (err) {
                    return reject({
                        ok: false,
                        err
                    })
                }

                if (!puntoBuscado) {
                    return reject({
                        ok: false,
                        err: {
                            mensaje: "there isn't any asset with that name"
                        }
                    });
                }
                return resolve(puntoBuscado);    
                });   
            });
        }


        let buscarIdTag = (tag) =>{
            return new Promise((resolve, reject)=>{

                TagInfo.find({mactag:tag}).select('_id mactag ')
                .exec((err, res)=>{
                    if(err){
                        return reject(err)
                    }
                    if(!res){
                        return reject('Empty')
                    }
                    return resolve(res)
                })
                
            })
            
        }

        let BuscarActivos = (idTags)=>{
            return new Promise((resolve, reject)=>{
                Activo.find({idTag:idTags})
                    .populate('idTag')

                // .sort({_id:-1}).limit(1)
                .exec((err, ActivoBuscado)=>{
                    if(err){
                        return reject(err)
                    }
                    if(Array.isArray(ActivoBuscado) && ActivoBuscado.length){

                        for(let i = 0; i< ActivoBuscado.length ; i++){
                            ActivoBuscado[i].idTag.batteryLevel = (((ActivoBuscado[i].idTag.batteryLevel /1000) /3) *100).toFixed(2)
                        }
                     
                        return resolve(ActivoBuscado[0])
                    }else{
                        return reject({error:'empty'})

                    }


                })
                

            })
        }


        let promise_pointXY = (resultPromiseActivo)=>{
            return new Promise((resolve, reject) => {

                // console.log(resultPromiseActivo);
                
                let idActivo = resultPromiseActivo.idTag.mactag
                // console.log(idActivo);

                Graficar.find({idTag:idActivo})
                    .populate([{
                        path:'region',
                        model:'zona',
                        populate:{
                            path:'floorId',
                            model:'zona',
                            select:'idLocation floorName floorNumber plane height width status type heightPixel widthPixel'
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
                        // console.log(JSON.stringify(puntoBuscado,null, 2));
                        for(let i = 0 ; i < puntoBuscado.length ; i++){

                            puntoBuscado[i].x = conversorM_P(puntoBuscado[i].x)
                            puntoBuscado[i].y = conversorM_P(puntoBuscado[i].y)

                            puntoBuscado[i].region.bottomLeft = conversorM_P(puntoBuscado[i].region.bottomLeft)
                            puntoBuscado[i].region.bottomRigth = conversorM_P(puntoBuscado[i].region.bottomRigth)
                            puntoBuscado[i].region.topLeft = conversorM_P(puntoBuscado[i].region.topLeft)
                            puntoBuscado[i].region.topRight = conversorM_P(puntoBuscado[i].region.topRight)
                            puntoBuscado[i].region.floorId.height = conversorM_P(puntoBuscado[i].region.floorId.height)
                            puntoBuscado[i].region.floorId.width = conversorM_P(puntoBuscado[i].region.floorId.width)
                            puntoBuscado[i].region.height = conversorM_P(puntoBuscado[i].region.height)
                            puntoBuscado[i].region.width = conversorM_P(puntoBuscado[i].region.width)
                            
                           
                        }
                        // Graficar.countDocuments({idActivo}, (err, conteo) => {
                            resolve(puntoBuscado);
                        // });

                        
                    });  
                


                
            });
        }
        await buscarAactivosenRegion(idRegion,fechaActual ).then( async obj=>{
            console.log(obj);
            
            
            for (let index = 0; index < obj.length; index++) {
                await buscarIdTag(obj[index]._id).then(async obj2 =>{
                    console.log(obj2);
                    arrayTags.push(obj2[0])

                    await BuscarActivos(obj2[0]._id).then(async obj3 =>{
                        console.log(obj3);

                        await promise_pointXY(obj3).then(obj4=>{
                            console.log(obj4);
                            Active.push({activo:obj3, puntoXY:obj4[0]})
                        })
                    })
                })
            }
            
            
        })
        res.status(200).jsonp({ok:true, Active})

    
        
    } catch (error) {
        console.log(`Catch Error:`);
        console.log(error);
        
 
    }
}

/* *****************************************
*	indicadores
*	
/* *****************************************/

let searchAssets = async (req, res) => {
    try {
        // console.log(req.sessionID);
        // let userid= req.user._id || req.headers.authorization || "5daf3de63a64441b7c1479ff"
        
        let sesionId = req.headers.authorization.split(' ')

        console.log(sesionId[1]);

        let indice_User = Users.findIndex(tarea =>tarea.sessionId === sesionId[1]);
        if(indice_User>=0){
            // console.log(`este usuario esta en la libreta de users`);
        }else{
            res.status(401).json({
                ok: false,
                err: {
                    message: 'The user must have Super-User premission'
                }
            });
        }


        let userid= Users[indice_User].user._id
        console.log(userid);
        // if(req.user === undefined){
        //     userid=   "5daf3de63a64441b7c1479ff"
            
        // }else{
        //     userid= req.user._id 


        // }

        let dataBusqueda = {
                type: '',
                name: '',
                date: 0
            }
        
        let promise_Activo = () => {
            return new Promise((resolve, reject) => {
                let term = (req.params.term).toLowerCase() ; 
                let item = (req.params.item).toLowerCase() 
                let regex = new RegExp(term, 'g')
                if(item==='name'){ 
                    var busqueda2 = {name:regex, status:true};
                }
                else if(item==='color'){
                    var busqueda2 = {color:regex, status:true};
                    dataBusqueda.type = item;
                }
                else if(item==='model'){
                    var busqueda2 = {model:regex, status:true};
                    dataBusqueda.type = item;
                }
                else if(item==='year'){ 
                    var busqueda2 = {year:regex, status:true}
                    dataBusqueda.type = item
                 }
                 
                 else{
                     return res.status(400).json({ok:false, error:{
                        message: "there isn't any asset with that Item"
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
                        // console.log(ActivoBuscado);
                        for(let i = 0; i< ActivoBuscado.length ; i++){
                            ActivoBuscado[i].idTag.batteryLevel = (((ActivoBuscado[i].idTag.batteryLevel /1000) /3) *100).toFixed(2)
                        }
                        dataBusqueda.date = new Date().getTime();
    
                        if (item === 'color') {
                            dataBusqueda.name = ActivoBuscado[0].color;
                        }else if (item === 'model'){
                            dataBusqueda.name = ActivoBuscado[0].model;
                        }
                        resolve(ActivoBuscado)
                    }else{
                        reject({error:'empty'})

                    }
                        

                    

                            crearReporte(dataBusqueda);

                            crearReporteAtendidosVendedor(userid)
                            // console.log(ActivoBuscado[0]);
                            
                           
                    });
            });

        }
        let promise_pointXY = (resultPromiseActivo)=>{
            return new Promise((resolve, reject) => {

                // console.log(resultPromiseActivo);
                
                let idActivo = resultPromiseActivo.idTag.mactag
                // console.log(idActivo);

                Graficar.find({idTag:idActivo})
                    .populate([{
                        path:'region',
                        model:'zona',
                        populate:{
                            path: 'floorId',
                            model:'zona',
                            select:'idLocation floorName floorNumber scale plane height width status type heightPixel widthPixel'
                                }
                        }])
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
                                    message: "there isn't any asset with that name"
                                }
                            });
                        };
                        // console.log(JSON.stringify(puntoBuscado,null, 2));
                        for(let i = 0 ; i < puntoBuscado.length ; i++){

                            puntoBuscado[i].x = conversorM_P(puntoBuscado[i].x)
                            puntoBuscado[i].y = conversorM_P(puntoBuscado[i].y)

                            puntoBuscado[i].region.bottomLeft = conversorM_P(puntoBuscado[i].region.bottomLeft)
                            puntoBuscado[i].region.bottomRight = conversorM_P(puntoBuscado[i].region.bottomRight)
                            puntoBuscado[i].region.topLeft = conversorM_P(puntoBuscado[i].region.topLeft)
                            puntoBuscado[i].region.topRight = conversorM_P(puntoBuscado[i].region.topRight)
                            puntoBuscado[i].region.floorId.height = conversorM_P(puntoBuscado[i].region.floorId.height)
                            puntoBuscado[i].region.floorId.width = conversorM_P(puntoBuscado[i].region.floorId.width)
                            puntoBuscado[i].region.height = conversorM_P(puntoBuscado[i].region.height)
                            puntoBuscado[i].region.width = conversorM_P(puntoBuscado[i].region.width)
                            
                           
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
        console.log(req.params);
        let tipo = req.params.tipo
        let order= req.params.order
        let desde = req.params.desde || ''
        let hasta =req.params.hasta || ''
        let counter
        let path = {type:tipo}
        if(order==="up"){
            counter=-1;
        }else if(order==="down"){ 
            counter=1;
        }

        // if(desde !='null' && hasta !='null'){
        //     hasta = parseInt(hasta)
        //     desde = parseInt(desde)

        //     path = {tipo: tipo, $and:[{date:{$gt:desde}}, {date:{$lt:hasta}}]}


        // }
        // else if(hasta!=''){
            // path = `{tipo: ${tipo}}`
            
            // }
            // else if(desde !='')
            
            
            console.log(path);
        let busquedaDeReporte = () =>{
            
            return new Promise((resolve, reject) => {
                Reportetopten.find(path).sort({count:counter})
                .limit(10)
                .exec((err, toptenBuscado) => {
                    
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
                                msg: 'No Searches recently'
                                    }
                                })
                        }
                        console.log(toptenBuscado);
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
        console.log(`===========`);
        console.log(body);
        for (let i = 0; i < body.length; i++) {
            arrayjs.push({
                n: i+1,
                model: body[i].name,
                searched:body[i].count
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
                .limit(10)
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
                                    msg: 'No searches recently'
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
                model: body[i].model,
                anio: body[i].year,
                color: body[i].color,
                count: body[i].count
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

let getSaleTime = async (req, res) =>{
    let resultado = await crearReporteTiempoVenta();
    // console.log(resultado);

    res.status(200).json({
        ok: true,
        resultado
    })
}

let getServiceTime = async (req, res) =>{
    let searchAsset = () => {
        try {

            return new Promise((resolve, reject) => {

                Activo.find({ status: false, })
                    .exec((err, activoDB) => {
                        err
                            ?
                            reject(err) :

                            resolve(activoDB)
                    })

            })

        } catch (error) {
            console.log(error);
        }
    }

    let resultSearchAsset = await searchAsset();

    let resultReport = await crearReporteTiempoServicio(resultSearchAsset);

    res.status(200).json({
        ok: true,
        resultReport
    })
}

let getDealerTime = async (req, res) =>{

    let result = await crearReporteMasTiempoDealer();
    console.log(result);
    res.status(200).json({
        ok:true,
        result
    })

} 

let getRegionTime = async (req, res) =>{
console.log(req.body);
    let period = req.body.period || 1;
    let desde = req.body.since ;
console.log(req.body);
        let result = await crearReporteTiempoSinMoverse(period, desde);
        console.log(result);
        res.status(200).json({
            ok: true,
            result
        })

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
        zone: function(callback) {
            Region.find({type:'region', status:true}).select('regionName regionNumber')
            .populate({
                path:'floorId',
                model:'zona',
                select:'floorName floorNumber'
            })
            .exec(callback)
        }

    }, function(err, results) {
        if (err) { return next(err); }
		// Successful, so render.
		
		// console.log({'idzonas':results.idzona, 'tags':results.tags});
		res.status(200).jsonp({ 'idzonas':results.idzona,'tags':results.tags, 'zone':results.zone});
		
    });

};


/* *****************************************************************************************************
*	GET RPI DE REGIONES
*	
/* *****************************************/



let regionId = (region) =>{
    return new Promise((resolve, reject ) =>{

        InfoUbicacion.find({ status: true, idZona:region })
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
                    return reject('Region is Empty (getDB)')

                }

                   
            });
    })

}


/* *****************************************
*	Region
*	
/* *****************************************/



let region = (req, res, next) =>{
        
    Region.find({ status: true, type:'region' })
        .populate('floorId' , 'floorName floorNumber ')

        .exec((err, region) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            for(let i = 0 ; i < region.length ; i++){


                region[i].bottomLeft = conversorM_P(region[i].bottomLeft)
                region[i].bottomRight = conversorM_P(region[i].bottomRight)
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
    
    // .populate('idTag')
    Activo.find({status:true})
        .populate([
            {
            path:'idTag',
            model:'tagInfo'
            },
            {
            path:'client',
            model:'Client'
            }
        ])
        .exec((err, activoBuscado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            
            res.status(200).json({
                ok: true,
                asset: activoBuscado
            });

        });

}

/* *****************************************
*	Pisos
*	
/* *****************************************/


let pisos = (req, res, next) =>{
        
    Region.find({ status: true, type:'floor' }).select('idLocation floorName floorNumber plane status type height width scale')
        .populate('idLocation') 

        .exec((err, floor) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            for (let index = 0; index < floor.length; index++) {
                floor[index].width = conversorM_P(floor[index].width)
                floor[index].height = conversorM_P(floor[index].height)
                
            }
            
            res.json({
                ok: true,
                floor
            });

        });

}


/* *****************************************
*	Ubicacion Rpi
*	
/* *****************************************/
let ubicacion = (req, res, next) =>{
        
    InfoUbicacion.find({ status: true })
        .populate('idZona')
        .populate('shared')

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
                location: infoUbicacion
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
                    
                    tagGuardado[index].batteryLevel = (((element.batteryLevel/1000) /3) *100).toFixed(2)
                    
                    console.log(element.batteryLevel);
                }
            });

            // console.log(tagGuardado);
            res.status(200).json({
                ok: true,
                tag: tagGuardado
            });

        });

}
/* *****************************************
*	TAGS inactivos
*	
/* *****************************************/
let getTagsfalse = (req, res, next) =>{
        
    TagInfo.find({status: false})

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
                tag: tagGuardado
            });

        });

}

let contador = (req, res, next)=>{

	async.parallel({
		tagTrue: function(callback) {
            TagInfo.find({status: true}).count()
              .exec(callback);
        },
		tagFalse: function(callback) {
            TagInfo.find({status: false}).count()
              .exec(callback);
        },
		tagBateryhigh: function(callback) {
            TagInfo.find({batteryLevel:{$gt:2275}}).count()
              .exec(callback);
        },
		tagBaterymedium: function(callback) {
            TagInfo.find({
                $and: 
                [ 
                  {batteryLevel:{$lt:2262}}, 
                  {batteryLevel:{$gt:1755}} 
                ] 
            }).count()
              .exec(callback);
        },
		tagBateryLow: function(callback) {
            TagInfo.find({batteryLevel:{$lt:1742}}).count()
              .exec(callback);
        },
		regionesTrue: function(callback) {
			Region.find({type:'region', status: true}).count()
              .exec(callback);
        },
		regionesFalse: function(callback) {
			Region.find({type:'region', status: false}).count()
              .exec(callback);
        },
		pisoTrue: function(callback) {
			Region.find({type:'floor', status: true}).count()
              .exec(callback);
        },
		pisoFalse: function(callback) {
			Region.find({type:'floor', status: false}).count()
              .exec(callback);
        },
		gatewayTrue: function(callback) {
			InfoUbicacion.find({status:true}).count()
              .exec(callback);
        },
		gatewayFalse: function(callback) {
			InfoUbicacion.find({status:false}).count()
              .exec(callback);
        }

    }, function(err, results) {
        if (err) { return next(err); }
		// Successful, so render.
		
		// console.log({'idzonas':results.idzona, 'tags':results.tags});
		res.status(200).jsonp({
            'tagTrue':results.tagTrue,
             'tagFalse':results.tagFalse,
             'tagBatteryhigh':results.tagBateryhigh,
             'tagBatterymedium':results.tagBaterymedium,
             'tagBatteryLow': results.tagBateryLow,

             'regionsTrue': results.regionesTrue,
             'regionsFalse': results.regionesFalse,
             'floorTrue': results.pisoTrue,
             'floorFalse': results.pisoFalse,
             'gatewayTrue': results.gatewayTrue,
             'gatewayFalse': results.gatewayFalse
            
            });
		
    });


}

let IniciarContador =async (req, res, next)=>{
try{

    
    let userid= req.user._id
    let client = req.user.client
    let activo = req.params.idactivo ;
    let regionPartida
    let regionActual
    let arrivalZone
    let dateStart = new Date().getTime();
    let dateEnd = new Date().getTime();



    /* *****************************************
    *	Necesito obtener la region de llegada a la que se supone que esta el usuario
    *	
    /* *****************************************/
    let path= {idLocation: client, tipo:'region', arrivalZone:true}
    await promesas.PromiseRegion(path).then( obj =>{
        console.log(obj);
        arrivalZone = obj._id

    }, er =>console.log(`Getdb:836- ${er}`) ) //Romper la accion y emitir una alerta


    await promesas.promise_active(req.params.idactivo).then( async obj=>{
       await promesas.promise_pointXY(obj.active[0].idTag.mactag).then(obj2=>{
        regionPartida= obj2[0].region._id;
        }, er=>{
            console.log(er);
        })

    }, er=>{
        console.log(er);
    })
    let intervalAactive = setInterval( async () => {
        console.log(`scan`);
        await promesas.promise_active(req.params.idactivo).then( async obj=>{
            await promesas.promise_pointXY(obj.active[0].idTag.mactag).then(obj2=>{
                regionActual= obj2[0].region._id;


                console.log(`${regionActual}=== ${arrivalZone}`);
                if(`${regionActual}` ===   `${arrivalZone}`){
                    console.log(`LLEGO A LA ZONA`);
                    dateEnd = new Date().getTime();
        
                    let resta = dateEnd- dateStart;
                    let contmin = resta/(1000*60);
        
        
        
                    let TimerToreciveActive = new timerToreciveActive({
                        user:userid ,
        
                        activo:activo,
                        regionPartida:regionPartida,
                        regionLlegada: regionActual,
                        duracionMin:contmin.toFixed(2),
                        duracion:[dateStart, dateEnd, (dateEnd-dateStart)]
                    })
                    TimerToreciveActive.save((er, save)=>{
                        if(er){
                           console.log({ok:false, er})
                        }else{
                            console.log(save);
                        }
                        
                    })
                    console.log(`Finaliza el interval`);
                    clearInterval(intervalAactive)
        
                }else{console.log(`next`);}

             }, er=>{
                 console.log(er);
             })
     
         }, er=>{
             console.log(er);
         })
         
         
        
    }, 10000);

    console.log(regionPartida);

    // timerToreciveActive
    return res.status(200).jsonp({ok:true})
}catch(e){
    console.log(e);
    }
}

let timeActiveRecive = (req, res, next)=>{

    timerToreciveActive.find().select('user asset startRegion arrivalregion timeMin')
    .populate([
        {
        path:'user',
        model:'User',
        select:'name surname'
    },
        {
        path: 'asset',
        model:'Activo',
        select:'name model color'
    },
        {
        path: 'startRegion',
        model:'zona',
        select:'regionName'

    },
        {
        path: 'arrivalregion',
        model:'zona',
        select:'regionName'

        }
        ])
    .exec((err, timetorecive)=>{

        if(err){
            return res.status(402).jsonp({ok:false, err})
        }
        else{
            console.log(timetorecive);
            return res.jsonp({ok:true, timetorecive})
        }
    })


}



let getAtendidosbySeller = (req, res, next)=>{

    ReporteAtendidos.find()
    .populate([{
            path:'userid',
            model:'User',
            select:'name surname'
        }])
    .exec((err,attendedbyseller) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        res.status(200).json({
            ok: true,
            attendedbyseller
        });

    });


}


let test = (req, res, next)=>{
    console.log(req.params);
    let regionid = `${req.params.region}`
    Graficar.aggregate([
        {$match:{
            region:mongoose.Types.ObjectId(regionid),
            date:{$gte:new Date('2020-03-01')}}},

        {$group:{_id:"$idTag", cantidad_Registros:{$sum:1}}}
    ])
    .exec((err, puntoBuscado) => {
        console.log(puntoBuscado);
        if (err) {
            return res.status(400).jsonp({
                ok: false,
                err
            })
        }
        if (!puntoBuscado) {
            return res.status(403).jsonp({
                ok: false,
                err: {
                    mensaje: "there isn't any asset with that name"
                }
            });
        }
        return res.status(200).jsonp({puntoBuscado});    
        });   
        
}


module.exports = {
    test,
    region,
    ubicacion,
    findZona,
    pisos,
    searchAssets,
    activoGet,
    getTags, 
    regionId, 
    contador,
    getTagsfalse,
    IniciarContador,
    searchAssetsRegion,
    
    /* *****************************************
    *	REPORTES
    *	
    /* *****************************************/
    getRegionTime,

    timeActiveRecive,
    getAtendidosbySeller,
    getTopTen,
    getTopTenSales,
    getSaleTime,
    getServiceTime,
    getDealerTime
}

