

const InfoUbicacion = require('../../models/ubicacion');
const Region = require('../../models/zona')
const Graficar = require('../../models/graficar')
const Activo = require('../../models/activo');
const {conversorM_P} = require('../variables')

const Reportatendidos = require('../../models/reporteatendidosperuser');

try {
    let promise_active = (idActivo)=>{
        return new Promise((resolve, reject)=>{

            Activo.find({_id:idActivo})
            .populate('idTag')
            .exec((err, active)=>{

                if(err){
                    return reject({ok:false, err})
                }
                else if(Array.isArray(active) && active.length){
                
                    return resolve({ok:true, active})
                
                }
                
                else{
                    reject({
                        ok: false,
                        err: {
                            mensaje: "there isn't any asset with that name"
                        }
                    });
                }

            })



        });

    }

    let promise_pointXY = (idTag)=>{
        return new Promise((resolve, reject) => {

            Graficar.find({idTag:idTag})
                .populate([{
                    path:'region',
                    model:'zona',
                    populate:{
                        path:'idPiso',
                        model:'zona'
                    }
                }])

                .sort({_id:-1}).limit(1)
                .exec((err, puntoBuscado) => {

                    if (err) {
                        reject({
                            ok: false,
                            err
                        })
                    }
                    else if(Array.isArray(puntoBuscado) && puntoBuscado.length){

                        for(let i = 0 ; i < puntoBuscado.length ; i++){
    
                            puntoBuscado[i].x = conversorM_P(puntoBuscado[i].x)
                            puntoBuscado[i].y = conversorM_P(puntoBuscado[i].y)
                        }
                            resolve(puntoBuscado);
                    }
                    else {
                        reject({
                            ok: false,
                            err: {
                                mensaje: "there isn't any asset with that name"
                            }
                        });
                    }
                  
                });             
        });
    }



    let buscarReporteAatendidos = (path) => {
        
        return new Promise((resolve, reject) => {

            console.log("BUSCAR EL REPORTE");   
            
            Reportatendidos.find(path)
            .exec((err, reporteBuscado) => {
                if (err) {
                    return reject(err)
                }
                if (Array.isArray(reporteBuscado) && reporteBuscado.length) {
                    return resolve({
                        ok: true,
                        reporteBuscado
                    })
                } else {

                    return resolve({
                        ok: false
                    })
                }

            })
        })


    }

    let actualizaReporteAtendidos = (dataToRefresh) => {
            
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

            Reportatendidos.findByIdAndUpdate(id, body, {
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




module.exports={
    promise_active,
    promise_pointXY,
    buscarReporteAatendidos,
    actualizaReporteAtendidos
}
} catch (error) {
    
}

