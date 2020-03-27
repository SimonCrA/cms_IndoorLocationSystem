const Reportetopten = require('../../models/reportetopten');
const Toptensales = require('../../models/reportetoptenventas');
const Activo = require('../../models/activo');
const TagInfo = require ('../../models/tagInfo')
const Graficar = require ('../../models/graficar')

const Reportetiempoventa = require('../../models/reportetiempoventa');
const Reportatendidos = require('../../models/reporteatendidosperuser')
const timerToreciveActive = require('../../models/timerToreciveActive');

const promesas = require('./promesas')

const {conversorM_P, Users} = require('../variables')



const async = require('async');


let crearReporte = async (dataBusqueda) =>{
    try {
        // console.log("ESTO ESTA FUNCIONANDO??");
        let actualizaReporte = (dataToRefresh) => {
            
            return new Promise((resolve, reject) => {
                // console.log("es hora de actualizar");
                let date = dataToRefresh[0].date
                date.push(dataBusqueda.date)
                let id = dataToRefresh[0]._id
                let body = {
                    count: dataToRefresh[0].count + 1,
                    date: date
                }
                // console.log(body);

                Reportetopten.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators: true
                }, (err, reporteActualizado) => {
                    // console.log(reporteActualizado);
                err
                    ?
                    reject(err):

                    resolve(reporteActualizado)
                })


            })

        }

        let buscarReporte = (dataToFind) => {
            nombre = dataToFind.nombre;
            tipo = dataToFind.tipo;
            return new Promise((resolve, reject) => {

                // console.log("BUSCAR EL REPORTE");
                
                Reportetopten.find({
                    nombre: nombre,
                    tipo: tipo
                }).exec((err, reporteBuscado) => {
                    if (err) {
                        return reject(err)
                    }
                    if (Array.isArray(reporteBuscado) && reporteBuscado.length) {
                        return resolve({
                            ok: true,
                            reporteBuscado
                        })
                    } else {
                        // console.log("ESTO ES FALSE");

                        return resolve({
                            ok: false
                        })
                    }

                })
            })


        }


        let buscaReporte = await buscarReporte(dataBusqueda);


        
        if (buscaReporte.ok === false) {
            // console.log('entre en false');
            // console.log(`reporte ${buscaReporte}`);
            
            let dataToSave = new Reportetopten ({
                nombre: dataBusqueda.nombre,
                tipo: dataBusqueda.tipo,
                date: dataBusqueda.date,
                count: 1
                
            })
            dataToSave.save((err, dataGuardada)=>{
                if (err) {
                    return err
                };
                if (dataGuardada) {
                // console.log(`guardó ${dataGuardada}`);

                    return true
                }
            })
        } else if (buscaReporte.ok === true) {
            let actualizareporte = await actualizaReporte(buscaReporte.reporteBuscado)
        }
        
    } catch (error) {
        console.log(error);
    }

}

let crearReporteVentas = async (dataSales) =>{
try {
    console.log(dataSales);
    let color = dataSales.color, modelo = dataSales.modelo, anio = dataSales.anio, name = dataSales.nombre;
    let date = new Date().getTime()
    console.log("ESTO ESTA FUNCIONANDO??");
    let actualizaReporte = (dataToRefresh) => {

        return new Promise((resolve, reject) => {
            console.log("es hora de actualizar");
            let dates = dataToRefresh[0].date

            dates.push(date)

            let id = dataToRefresh[0]._id
            let body = {
                count: dataToRefresh[0].count + 1,
                date: dates
            }
            // console.log(body);

            Toptensales.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true
            }, (err, reporteActualizado) => {
                console.log(reporteActualizado);
                err
                    ?
                    reject(err) :

                    resolve(reporteActualizado)
            })


        })

    }

    let buscarReporte = () => {
        return new Promise((resolve, reject) => {

            console.log("BUSCAR EL REPORTE");
            console.log(color, modelo, anio, name);

            Toptensales.find({
                model: modelo,
                color: color,
                year: anio,
                brand:name
            }).exec((err, reporteBuscado) => {
                console.log(reporteBuscado);
                if (err) {
                    return reject(err)
                }
                if (Array.isArray(reporteBuscado) && reporteBuscado.length) {
                    return resolve({
                        ok: true,
                        reporteBuscado
                    })
                } else {
                    console.log("ESTO ES FALSE");

                    return resolve({
                        ok: false
                    })
                }

            })
        })


    }

    let buscaReporte = await buscarReporte();

    if (buscaReporte.ok === false) {
        console.log('entre en false');
        console.log(`reporte ${buscaReporte}`);

            let dataToSave = new Toptensales({
                model: modelo,
                color: color,
                year:anio,
                brand:name,
                date:date ,
                count: 1

            })
            dataToSave.save((err, dataGuardada) => {
                if (err) {
                    return err
                };
                if (dataGuardada) {
                    console.log(`guardó ${dataGuardada}`);

                    return true
                }
        })
    } else if (buscaReporte.ok === true) {
        let actualizareporte = await actualizaReporte(buscaReporte.reporteBuscado)
    }

} catch (error) {
    console.log(error);
}
    
}

let crearReporteTiempoVenta = async () =>{

    let arrActivo = [];
    let searchAsset = () => {
        try {
    
            return new Promise((resolve, reject) => {
        
                Activo.find({estado: false})
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
    let resta = 0;
    let objectActivo = {};

    for (let i = 1; i < resultSearchAsset.length; i++) {
        
        resta = resultSearchAsset[i].endDate- resultSearchAsset[i].startDate;
        let contdias = resta/(1000*60*60*24);

        objectActivo ={
            brand: resultSearchAsset[i].nombre,
            model: resultSearchAsset[i].modelo,
            vin: resultSearchAsset[i].VIN,
            saletime: contdias.toFixed(2),
        }

        arrActivo.push(objectActivo);
    }

     return arrActivo
}

let crearReporteTiempoServicio = async (activo) =>{

    console.log(activo);

    let arrActivo = [];
    let objectActiv = {};

    let resta = 0;
            
    for (let i = 0; i < activo.length; i++) {

        resta = activo[i].endDate - activo[i].startDate;
        let conthoras = resta / (1000 * 60 * 60);

        objectActiv = {
            brand: activo[i].nombre,
            model: activo[i].modelo,
            vin: activo[i].VIN,
            servicetime: conthoras.toFixed(2)
        }
        arrActivo.push(objectActiv);
    }

     return arrActivo
}

let crearReporteMasTiempoDealer = async () =>{

    let arrActivo = [];
    let searchAsset = () => {
        try {

            return new Promise((resolve, reject) => {

                Activo.find({ estado: true })
                    .sort({startDate:-1})
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
    // console.log(resultSearchAsset);

    let dataObject = {};
    let resta = 0;
    let contdias = 0;
    console.log(resultSearchAsset);
    let lastTime = new Date().getTime();

    for (let i = 0; i < resultSearchAsset.length; i++) {

        resta = lastTime - resultSearchAsset[i].startDate;
        contdias = resta / (1000 * 60 * 60 * 24);
        
        dataObject = {
            VIN : resultSearchAsset[i].VIN,
            days: contdias.toFixed(2),
            name: resultSearchAsset[i].nombre,
            model: resultSearchAsset[i].modelo
        };

        arrActivo.push(dataObject);
        
    }
    // console.log(arrActivo);
    return arrActivo;

}


/* *****************************************
*	INDICADRO 4
*	
/* *****************************************/


let crearReporteTiempoSinMoverse = async ( period, desde ) =>{

    let actualTime = new Date().getTime();
    let oldTime = actualTime - period*86400000;



        let searchTag = () => {
            try {

                return new Promise((resolve, reject) => {

                    TagInfo.find({estado: true})
                        .exec((err, tagDB) => {
                            err
                                ?
                                reject(err) :

                                resolve(tagDB)
                        })

                })

            } catch (error) {
                console.log(error);
            }
        }

    let resultSearchTag = await searchTag();
    let arrPoint = [];
    // console.log(resultSearchTag);
    for (let i = 0; i < resultSearchTag.length; i++) {
        let js={
            contadorE:0,
            contadorD:0,
            region:``,
            tag:``,
            id:null
        }
        
        let searchPoint = () => {
            try {

                let param = {
                    idTag: resultSearchTag[i].mactag, date:{$gte:new Date(desde)}
                }

                return new Promise((resolve, reject) => {
                
                    Graficar.find(param)
                    .populate([{
                        path:'region',
                        model:'zona',
                        select:'nombreRegion numeroRegion idPiso',
                        populate:{
                            path:'idPiso',
                            model:'zona',
                            select:'nombrePiso numeroPiso'
                        }
                }
            ])
                    
                        .exec((err, pointDB) => {
                            err
                                ?
                                reject(err) :

                                resolve(pointDB)
                        })

                });


            } catch (error) {
                console.log(error);
            }
        }

        let resultSearchPoint = await searchPoint();
        // console.log(`_____________________`);
        // console.log(resultSearchPoint);
        // console.log(`_____________________`);

        if(Array.isArray(resultSearchPoint) && resultSearchPoint.length){
            if(resultSearchPoint.length > 1){

                let StartCountTime = new Date().getTime();
                // console.log(resultSearchPoint);
                for (let j = 0; j < (resultSearchPoint.length -1); j++) {
                    let fechaInicio = new Date(resultSearchPoint[j].date).getTime();
                    // console.log(`Procede a comparar ...  ${fechaInicio} ${oldTime}`);
        
                    // if (fechaInicio > oldTime && fechaInicio < actualTime) {
                        
                        // console.log(`${resultSearchPoint[j].region._id} === ${resultSearchPoint[j + 1].region._id}` );
                        
                        if (`${resultSearchPoint[j].region._id}` === `${resultSearchPoint[j + 1].region._id}`) {

                            // console.log(`ENTRE ${j}`);
                            // console.log(resultSearchPoint[j].idTag);
                            js.contadorE+=1;
                            js.region = resultSearchPoint[j].region;
                            js.tag = resultSearchTag[i]._id;
                            if(js.id == null){
                                js.id = resultSearchPoint[j]._id
                                js.time =(actualTime - fechaInicio)/(1000*60*60) ;
                                
                            }
    
            
                        }else{
                            js.contadorD+=1;
                            js.region = resultSearchPoint[j].region;
                            js.tag = resultSearchTag[i]._id;
                            js.time =(oldTime- fechaInicio) /(1000*60*60) ;
                            js.id = null

                        }
        
                    // }
                        

                    
                }


        
                // if (js.contador <= 5) {
                    arrPoint.push(js);
                // }

            }else{
                console.log(`Solo existe un registro de este tag o ninguno`);
                console.log(resultSearchPoint);
                
            }
            

        }
        
        
    };
    
    // console.log(arrPoint);
    let arrActivoRegion = [];

    for (let i = 0; i < arrPoint.length; i++) {
        
        let searchPointDate = (ruta) => {
            try {

                return new Promise((resolve, reject) => {
                    // console.log(ruta);
                    Activo.find(ruta)
                        .exec((err, pointDB) => {
                            err
                                ?
                                reject(err) :

                                resolve(pointDB[0])
                        })

                })

            } catch (error) {
                console.log(error);
            }
        }


        // console.log(arrPoint[i].tag);
        let ta= arrPoint[i].tag
        let path= `{"idTag":"${ta}", "estado": true}`
        let ruta = JSON.parse(path)
        if(arrPoint[i].id != null ){

            let resultSearchTag = await searchPointDate(ruta);
            let objectActivoRegion = {};
    
            objectActivoRegion = {
                brand: resultSearchTag.nombre,
                VIN: resultSearchTag.VIN,
                model: resultSearchTag.modelo,
                region: arrPoint[i].region,
                timeDays: parseFloat((arrPoint[i].time).toFixed(2))
            }
    
            arrActivoRegion.push(objectActivoRegion);

        }


        
    }
    
    
    return arrActivoRegion;


}


let crearReporteAtendidosVendedor = async (userid)=>{

    try {
        console.log("ESTO ESTA FUNCIONANDO??");
        
        let  path = {userid:userid}
        let buscaReporte = await promesas.buscarReporteAatendidos(path);


        
        if (buscaReporte.ok === false) {
            console.log('entre en false');
            console.log(`reporte ${buscaReporte}`);

            let date = new Date().getTime();
    
    
            let report = new Reportatendidos({
    
                userid:userid,
                count: 1,
                date: date
            
                });

            report.save((err, dataGuardada)=>{
            if (err) {
                return err
            };
            if (dataGuardada) {
            console.log(`guardó ${dataGuardada}`);

                return true
            }
        })
        } 
        else if (buscaReporte.ok === true) {
            await promesas.actualizaReporteAtendidos(buscaReporte.reporteBuscado)
        }
        
    } catch (error) {
        console.log(error);
    }
    
    

        let date = new Date().getTime();
    
    




}
let IniciarContador =async (req, res, next)=>{
    try{
        // console.log(req.headers.authorization);
        let session = req.headers.authorization.split(" ");

        
        let userid= ''
        let client = ''
        let find = Users.findIndex(obj=> obj.sessionId === session[1])
        if(find >= 0){
            // console.log(Users[find].user._id);
            userid= Users[find].user._id
            client = Users[find].user.client

        }
        else{
            console.log(`No encontrado...`);
            return res.status(410).jsonp({ok:false, msg:`the user's session does not coincide with the server's valid sessions`})
        }
        // return res.status(200).jsonp({ok:true})
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
            arrivalZone = obj._id
    
        }, er =>{
            console.log(`Getdb:836- ${er}`)
            return res.status(403).jsonp({
                ok:false,
                msg:'there isnt test driving region, please add one first'
                })
    
            } ) //Romper la accion y emitir una alerta
    
    
        await promesas.promise_active(req.params.idactivo).then( async obj=>{

           await promesas.promise_pointXY(obj.active[0].idTag.mactag).then(obj2=>{
            regionPartida= obj2[0].region._id;
            
        
            let intervalAactive = setInterval( async () => {
                console.log(`scan`);
                await promesas.promise_active(req.params.idactivo).then( async obj=>{
                    await promesas.promise_pointXY(obj.active[0].idTag.mactag).then(obj2=>{
                        regionActual= obj2[0].region._id;
        
                        console.log(`${regionActual} ===   ${arrivalZone}`);
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
        
        
        
        
        
        
        }, er=>{
                // console.log(er);
                return res.status(403).jsonp({
                    ok:false,
                    msg:'active hasnt a valid point '
                    })
            })
    
        }, er=>{
            // console.log(er);
            return res.status(403).jsonp({
                ok:false,
                msg:`doesn't exist this active`,
                er
                })
        })



    
        console.log(regionPartida);
    
        // timerToreciveActive
        return res.status(200).jsonp({ok:true})
    }catch(e){
        console.log(e);
        }
    }
    

module.exports = {
    crearReporte,
    crearReporteVentas,
    crearReporteTiempoVenta,
    crearReporteTiempoServicio,
    crearReporteMasTiempoDealer,
    crearReporteAtendidosVendedor,
    crearReporteTiempoSinMoverse,
    IniciarContador
}