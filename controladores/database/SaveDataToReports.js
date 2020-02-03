const Reportetopten = require('../../models/reportetopten');
const Toptensales = require('../../models/reportetoptenventas');
const Activo = require('../../models/activo');
const Reportetiempoventa = require('../../models/reportetiempoventa');
// const Reportatendidos = require('../../models/reporteatendidosperuser');

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

    for (let i = 1; i < resultSearchAsset.length; i++) {
        
        let resta = resultSearchAsset[i].endDate- resultSearchAsset[i].startDate;
        let contdias = Math.round(resta/(1000*60*60*24));
        let conthoras = Math.round(resta/(1000*60*60));
        let contmin = resta/(1000*60);
        let tiempoTotal = contdias+ ':' + conthoras + ':' + contmin.toFixed(1);
        arrActivo.push(tiempoTotal);
    }

     return arrActivo
}

let crearReporteTiempoServicio = async (activo) =>{

    console.log(activo);

    let arrActivo = [];

    let resta = 0;
            
    for (let i = 1; i < activo.length; i++) {

        let resta = activo[i].endDate - activo[i].startDate;
        let contdias = Math.round(resta / (1000 * 60 * 60 * 24));
        let conthoras = Math.round(resta / (1000 * 60 * 60));
        let contmin = resta / (1000 * 60);
        let tiempoTotal = contdias + ':' + conthoras + ':' + contmin.toFixed(1);
        arrActivo.push(tiempoTotal);
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

    for (let i = 0; i < resultSearchAsset.length; i++) {
        
        dataObject = {
            VIN : resultSearchAsset[i].VIN,
            date: resultSearchAsset[i].startDate,
            name: resultSearchAsset[i].nombre,
            model: resultSearchAsset[i].modelo
        };

        arrActivo.push(dataObject);
        
    }
    // console.log(arrActivo);
    return arrActivo;

}


// let crearReporteAtendidosVendedor = (userid)=>{

//     try {
//         console.log("ESTO ESTA FUNCIONANDO??");
        
//         let actualizaReporte = (dataToRefresh) => {
            
//             return new Promise((resolve, reject) => {
//                 console.log("es hora de actualizar");
//                 let date = dataToRefresh[0].date
//                 date.push(dataBusqueda.date)
//                 let id = dataToRefresh[0]._id
//                 let body = {
//                     count: dataToRefresh[0].count + 1,
//                     date: date
//                 }
//                 console.log(body);

//                 Reportetopten.findByIdAndUpdate(id, body, {
//                     new: true,
//                     runValidators: true
//                 }, (err, reporteActualizado) => {
//                     console.log(reporteActualizado);
//                 err
//                     ?
//                     reject(err):

//                     resolve(reporteActualizado)
//                 })


//             })

//         }

//         let buscarReporte = (userid) => {
//             nombre = dataToFind.nombre;
//             tipo = dataToFind.tipo;
//             return new Promise((resolve, reject) => {

//                 console.log("BUSCAR EL REPORTE");
                
//                 Reportatendidos.find({userid: userid}).exec((err, reporteBuscado) => {
//                     if (err) {
//                         return reject(err)
//                     }
//                     if (Array.isArray(reporteBuscado) && reporteBuscado.length) {
//                         return resolve({
//                             ok: true,
//                             reporteBuscado
//                         })
//                     } else {
//                         console.log("ESTO ES FALSE");

//                         return resolve({
//                             ok: false
//                         })
//                     }

//                 })
//             })


//         }


//         // let buscaReporte = await buscarReporte(dataBusqueda);


        
//         if (buscaReporte.ok === false) {
//             console.log('entre en false');
//             console.log(`reporte ${buscaReporte}`);

//             let date = new Date().getTime();
    
    
//             let report = new Reportatendidos({
    
//                 userid:userid,
//                 count: 'd',
//                 date: 2
            
//                 });

//             report.save((err, dataGuardada)=>{
//             if (err) {
//                 return err
//             };
//             if (dataGuardada) {
//             console.log(`guardó ${dataGuardada}`);

//                 return true
//             }
//         })
//         } else if (buscaReporte.ok === true) {
//             // let actualizareporte = await actualizaReporte(buscaReporte.reporteBuscado)
//         }
        
//     } catch (error) {
//         console.log(error);
//     }
    
    

//         let date = new Date().getTime();
    
    




// }


module.exports = {
    crearReporte,
    crearReporteVentas,
    crearReporteTiempoVenta,
    crearReporteTiempoServicio,
    crearReporteMasTiempoDealer,
    // crearReporteAtendidosVendedor
}