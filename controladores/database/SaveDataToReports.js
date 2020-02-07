const Reportetopten = require('../../models/reportetopten');
const Toptensales = require('../../models/reportetoptenventas');
const Activo = require('../../models/activo');
const TagInfo = require ('../../models/tagInfo')
const Graficar = require ('../../models/graficar')

const Reportetiempoventa = require('../../models/reportetiempoventa');

const {buscarReporteAatendidos, actualizaReporteAtendidos} =require('./promesas') 


let crearReporte = async (dataBusqueda) =>{
    try {
        console.log("ESTO ESTA FUNCIONANDO??");
        let actualizaReporte = (dataToRefresh) => {
            
            return new Promise((resolve, reject) => {
                console.log("es hora de actualizar");
                let date = dataToRefresh[0].date
                date.push(dataBusqueda.date)
                let id = dataToRefresh[0]._id
                let body = {
                    count: dataToRefresh[0].count + 1,
                    date: date
                }
                console.log(body);

                Reportetopten.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators: true
                }, (err, reporteActualizado) => {
                    console.log(reporteActualizado);
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

                console.log("BUSCAR EL REPORTE");
                
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
                        console.log("ESTO ES FALSE");

                        return resolve({
                            ok: false
                        })
                    }

                })
            })


        }


        let buscaReporte = await buscarReporte(dataBusqueda);


        
        if (buscaReporte.ok === false) {
            console.log('entre en false');
            console.log(`reporte ${buscaReporte}`);
            
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
            saletime: conthoras.toFixed(2)
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

let crearReporteTiempoSinMoverse = async () =>{

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
    let js={
        contador:0,
        region:``,
        tag:``
    }
    for (let i = 0; i < resultSearchTag.length; i++) {
        
        let searchPoint = () => {
            try {

                param = {
                    idTag: resultSearchTag[i].idTag
                }

                return new Promise((resolve, reject) => {

                    Graficar.find(param)
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

        for (let i = 0; i < resultSearchPoint.length; i++) {
            

            if (resultSearchPoint[i].region != resultSearchPoint[i + 1].region) {

                js.contador+=1;
                js.region = resultSearchPoint[i].region;
                js.tag = resultSearchPoint[i].idTag;

            }
            
        }

        if (js.contador <= 5) {
            arrPoint.push(js);
        }

    };

    for (let i = 0; i < arrPoint.length; i++) {
        
        let searchPointDate = (ruta) => {
            try {

                return new Promise((resolve, reject) => {

                    Graficar.find(ruta)
                        .exec((err, pointDB) => {
                            err
                                ?
                                reject(err) :

                                resolve(pointDB)
                        })

                })

            } catch (error) {
                console.log(error);
            }
        }

        let ruta = JSON.parse(`{region:${arrPoint[i].region}, idTag:${arrPoint[i].tag}}`)
        let resultSearchTag = await searchPointDate(ruta);
        
    }




}


let crearReporteAtendidosVendedor = async (userid)=>{

    try {
        console.log("ESTO ESTA FUNCIONANDO??");
        
        let path = JSON.parse(`{userid:${userid}}`)
        let buscaReporte = await buscarReporteAatendidos(path);


        
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
            await actualizaReporteAtendidos(buscaReporte.reporteBuscado)
        }
        
    } catch (error) {
        console.log(error);
    }
    
    

        let date = new Date().getTime();
    
    




}


module.exports = {
    crearReporte,
    crearReporteVentas,
    crearReporteTiempoVenta,
    crearReporteTiempoServicio,
    crearReporteMasTiempoDealer,
    crearReporteAtendidosVendedor,
    crearReporteTiempoSinMoverse
}