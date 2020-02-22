
var sizeof = require('image-size')
const InfoUbicacion = require('../../models/ubicacion');
const Region = require('../../models/zona')
const Graficar = require('../../models/graficar')
const Activo = require('../../models/activo');
const Zona = require('../../models/zona');
const {conversorM_P} = require('../variables')

const Beacon = require ('../../models/tagInfo')

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

    let validarImagen = (imagen) =>{

        

        return new Promise((resolve, reject) => {
            console.log(imagen);

            sizeof(imagen, (err, dim)=>{

                if (err) {
                    return reject({err});
                }

                return resolve(dim);
                
            });

        })
        

    }




    let getZona = (path)=>{
        return new Promise((resolve, reject)=>{
            Zona.find(path)
            .populate('idPiso')
            .exec ((err, resposeZona)=>{

                if(err){
                    return reject({ok:false,err})
                }
                else{
                    return resolve({ok:true, resposeZona})
                }
            })
        })
    }


    let referencialplano = (dataPlano)=>{

        if(dataPlano )
        console.log(dataPlano);
        
    
        return new Promise((resolve, reject) => {
            let newX = 0;
            let newY = 0;
            let x = dataPlano.x
            let y = dataPlano.y

            let ubicacion = dataPlano.ubicacionOrigen.toLowerCase()
            
        if(ubicacion === 'bl'){
            newX = x;
            newY = y;

            return resolve({x: newX, y: newY}); 

        }
        else if(ubicacion === 'br'){
            newX = dataPlano.anchoR - x;
            newY = y;

            return resolve({x: newX, y: newY}); 
        }
        else if(ubicacion === 'tl'){
            newX = x;
            newY = dataPlano.altoR - y;

            return resolve({x: newX, y: newY}); 
        }
        else if(ubicacion === 'tr'){
            newX = dataPlano.anchoR - x;
            newY = dataPlano.altoR - y;

            return resolve({x: newX, y: newY}); 

        }
        else{
            reject({msg:'ubicacion erronea'})
        }

        })

    }


let PromiseRegion = (path)=>{
    return new Promise((resolve, reject)=>{
        Zona.find(path)
        .exec((er, response)=>{
            if(er){
                return reject(er)
            }
            
            return resolve(response[0])
        })


    })
}



let getTag = (path)=>{
    return new Promise ((resolve, reject)=>{
        Beacon.find(path)
        .exec((er, response)=>{

            if (er){
                return reject(er)
            }
            else if(Array.isArray(response) && response.length){
                return resolve(response)
            }
            else{
                return reject ({msg:'no results were found with your search'})
            }
        })

    })
}



let GetGraficar = (path)=>{
    return new Promise((resolve, reject) =>{
        Graficar.find(path)
        .sort({_id:-1})
        .exec((er, response)=>{
            if (er){
                return reject(er)
            }else if(Array.isArray(response) && response.length){
                return resolve(response)
            }else{
                return reject({msg:'no results were found with your search'})
            }
        })

    })

}
module.exports={
    GetGraficar,
    getTag,
    getZona,
    referencialplano,
    validarImagen,
    promise_active,
    promise_pointXY,
    buscarReporteAatendidos,
    actualizaReporteAtendidos,
    PromiseRegion
}
} catch (error) {
    console.log(error);
}

