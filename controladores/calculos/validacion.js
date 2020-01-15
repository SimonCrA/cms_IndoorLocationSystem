const Distancia = require('../../models/distancias');

const constantes = require('../../models/constantesdistancia');

const colors = require('colors');
const Ubicacion = require ('../../models/ubicacion')


const {trilateracion} = require('../calculos/trilateracion')
const {trilateracionMatriz} = require('../calculos/trilateracion2')
const {jsoCanvas} = require('../variables')
// const {trilateracionMatriz2} = require('./trilateracion3')
const Graficar = require('../../models/graficar')
var r1=0, r2=0, r3=0, x1=0, x2=0, x3=0, y1=0, y2=0, y3=0;
// var fecha_actual =  new Date()

// var fecha_vieja = new Date () -10min
let validacion_Trilateracion = async ()=>{
    
    
    try{

        let fecha = new Date().getTime();

        let promesa_ubicacion = () =>{
            return new Promise((resolve, reject) => {
                 Ubicacion.find({estatus:true})
                     .exec((err, ubicacionRaspi) => {
                             err
                                 ?
                                 reject(err) :
                                 resolve(ubicacionRaspi);
                            });
            
            
                        });
        }
        let promise_share = (region) => {
            return new Promise((resolve, reject) => {
                Ubicacion.find({compartido:region, estatus:true})
                    .exec((err, ubicacionRaspi) => {
                            err
                                ?
                                reject(err) :
                                resolve(ubicacionRaspi);
                           });
           
           
                       });
        }
        let promesa_AggregateRegion = () =>{
            return new Promise((resolve, reject) => {
                Ubicacion.aggregate([{
                        "$group": {
                            _id:"$idZona",
                            count: {
                                $sum: 1
                            }
                        }

                    }])
                    .exec((err, aggregate_region) => {
                        err
                            ?
                            reject(err) :
                            resolve(aggregate_region);
                        });
            });
        }
        
        let promesa_macrpi = (region) =>{
            return new Promise((resolve, reject) => {

            Ubicacion.aggregate([{
                $match: {
                    idZona: region,
                    estatus:true
                }
            },
            {
                "$group": {
                    _id:"$macRpi",
                    count: {
                        $sum: 1
                    }
                }
            }])
            .exec( (err, agregate_macrpi) =>{
                err
                    ?
                    reject(err) :
                    resolve(agregate_macrpi);
                });
        
            });
        }
        let promesa_mactag = (region_) =>{
            return new Promise((resolve, reject) => {
                // console.log(region_);
            constantes.aggregate([
            {
                $match: {
                    idRegion: `${region_}`
                    // tipo:'established'

                }
            },
            {
                "$group": {
                    _id:"$macTag",
                    count: {
                        $sum: 1
                    }
                }
            }
        ])
            .exec( (err, agregate_mactag) =>{
                err
                    ?
                    reject(err) :
                    resolve(agregate_mactag);
                });
        
            });
        }


        let promise_findDistancia = (pMacRpi,pMacTag) => {
            return new Promise ((resolve, reject) =>{
                // var fecha_actual =  new Date()

                // var fecha_vieja = new Date () - 10min
                Distancia.find({macTag:pMacTag, macRpi:pMacRpi, status: true}).sort({_id:-1}).limit(1)
                .exec( (err, distancia) =>{
                    if(err){
                        reject(err)
                    }
                    // if(Array.isArray(distancia) && distancia.length){
                        
                        resolve(distancia)
                    // }else{
                    //     reject('err')

                    // }
                        // console.log(distancia);

                    // err
                    //     ?
                    //     reject(err) :
                    //     resolve(distancia);

                });
            });
        }
        
        let promesa_UpdateDistance =(id) =>{
            return new Promise((resolve, reject)=>{
                let body = {status:false}

                Distancia.findByIdAndUpdate(id, body, {new:true, runValidators:true },(e, updateDistance)=>{
                    e
                        ?
                        reject({
                            ok:false,
                            e
                        }) :
                        resolve({
                            ok:true,
                            updateDistance
                    })
                })
                    
            
            });

        }
        let promesa_puntoXY =(punto, mactag, region)=>{
            return new Promise((resolve, reject)=>{
                
                
                
                let graficar = new Graficar({
                    date: new Date().getTime(),
                    x: punto.x,        
                    y: punto.y,
                    region,
                    idTag: mactag
                    
                })
                graficar.save((e)=>{
                    e
                    ?
                    reject({
                        ok:false,
                        e
                    }) :
                    resolve({
                        ok:true,
                        graficar
                    })
                })
            });
        }
        
        
        ///////////////////////////////////////////////////////////////////////////////////


        console.log(`======================INICIA TRILATERACION=========================`.rainbow);


        let resultRegion = await promesa_AggregateRegion()
        // console.log(`Esto es el result Region length: ${JSON.stringify(resultRegion, null, 2)}`);

        let lista_Obj_trilaterar =[]
        for (let i = 0; i < resultRegion.length; i++) {
            let arrtag=[]
            let arrRpi=[]
            let arrShare=[]
            var share=null;
            let statusShare=true
            let resultrpi = await promesa_macrpi(resultRegion[i]._id);
            let resulttag = await promesa_mactag(resultRegion[i]._id);
            // console.log(resultRegion[i]._id);
            // console.log(resulttag);

            let resultShare = await promise_share(resultRegion[i]._id);
            resulttag.forEach(element => {
                arrtag.push(element._id)
            });
            resultrpi.forEach(element => {
                arrRpi.push(element._id)
            });
            if(resultShare[0] === undefined){
                // console.log(`esta region no comparte Rpi`);
            }else{
                share= `${resultShare[0].idZona}`
                // console.log(arrRpi);
                // console.log(resultShare);
                for (let i = 0; i < arrRpi.length; i++) {                   
                    for (let j = 0; j < arrRpi.length; j++) {
                        if(arrRpi[i] == resultShare[j].macRpi){
                            arrShare.push(resultShare[j].macRpi);
                        }
                    }
                    
                }
            }
            let obj={
                region:`${resultRegion[i]._id}`,
                rpi:arrRpi,
                tag:arrtag,
                share,
                statusShare,
                arrShare

                
            }
            lista_Obj_trilaterar.push(obj)
                       
        }
        


        // console.log(`============================`);
        // console.log(lista_Obj_trilaterar);
        // console.log(`============================`);

        let interval1_1=lista_Obj_trilaterar.length;
        
        for (let k = 0; k < interval1_1; k++) {// CICLO DE REGIONES




            let interval1_2 = lista_Obj_trilaterar[k].tag.length;

            for (let j = 0; j < interval1_2; j++) {//Ciclo de tags
                let interval1_3 = lista_Obj_trilaterar[k].rpi.length || 3;
            
                for (let u = 0; u < interval1_3; u++) {//Ciclo de Rpis
                    if(lista_Obj_trilaterar[k].tag[j] !== undefined){

                        let resultDistancia = await promise_findDistancia(lista_Obj_trilaterar[k].rpi[u], lista_Obj_trilaterar[k].tag[j]).then(data=>{
                            // console.log(data);
                            if(data[0] === undefined){
                                // console.log(`Vacio`);
                                // console.log(`rpi=${lista_Obj_trilaterar[k].rpi[u]} ===== tag=${lista_Obj_trilaterar[k].tag[j]}`);
                                
                                let findIt = lista_Obj_trilaterar[k].tag.indexOf(lista_Obj_trilaterar[k].tag[j]);
                                if(findIt>=0){
                                    lista_Obj_trilaterar[k].tag.splice(findIt,1,0)
                                    
                                }
    
                            }else{
                                // console.log(data);
                            }
                        }, er=>{
                            console.log(er);
                        });
                    }
                    
                    
                }
                
            }
            for (let u = 0; u < interval1_2; u++) {//Ciclo que elimina los elementos 0
                let findIt = lista_Obj_trilaterar[k].tag.indexOf(0);
                    if(findIt>=0){
                        lista_Obj_trilaterar[k].tag.splice(findIt,1)
                        
                    }
            }


            
        }


        // console.log(`-----------------------------`);
        
        // console.log(lista_Obj_trilaterar);
        
        // console.log(`-----------------------------`);

        let interval_1=lista_Obj_trilaterar.length;
        
        for (let k = 0; k < interval_1; k++) {//REGIONES
            let interval1_2 = lista_Obj_trilaterar[k].tag.length;
            
            for (let j = 0; j < interval1_2; j++) {//TAGS
                let interval1_3 = lista_Obj_trilaterar[k].rpi.length;
                // let id_distancia=[]
                for (let u = 0; u < interval1_3; u++) {//Ciclo de rpaspis
                    if(lista_Obj_trilaterar[k].tag[j] !== undefined){


                        // console.log(resultrpi[j]._id);
                        let resultDistancia = await promise_findDistancia(lista_Obj_trilaterar[k].rpi[u], lista_Obj_trilaterar[k].tag[j]);
                        // console.log(`resultdistanica ${JSON.stringify(resultDistancia, null, 2)}`);
                        if(resultDistancia[0] == undefined){
                            // console.log(`is undefined`);


                            x1=0; x2=0; x3=0; y1=0; y2=0; y3=0; r1=0; r2=0; r3=0;

                        }else{
                            // console.log(`si esta definido`);
                            let id_distancia= (resultDistancia[0]._id)
                            let ubicacion = await promesa_ubicacion();
                            // console.log(resultrpi[j]._id);
                            let resultadoUbicacion = ubicacion.find(data => data.macRpi === lista_Obj_trilaterar[k].rpi[u]);
                            // console.log(resultDistancia);
                            if (resultadoUbicacion.axis === 'o') {
                                r1 = resultDistancia[0].distanciaTag;
                                x1=resultadoUbicacion.xpos;
                                y1=resultadoUbicacion.ypos;

                            }
                            if (resultadoUbicacion.axis === 'x') {
                                
                                r2 = resultDistancia[0].distanciaTag;
                                x2 = resultadoUbicacion.xpos;
                                y2 = resultadoUbicacion.ypos;
                            }
                            if (resultadoUbicacion.axis === 'y') {
                                r3 = resultDistancia[0].distanciaTag;
                                x3 = resultadoUbicacion.xpos;
                                y3 = resultadoUbicacion.ypos;
                            }

                            // console.log(`-> ${lista_Obj_trilaterar[k].share}`);
                            // console.log(`-< ${lista_Obj_trilaterar[k].region}`);
                            let findIt = lista_Obj_trilaterar.findIndex(obj => (
                                obj.region ===  lista_Obj_trilaterar[k].share
                                ) );
                            // console.log(findIt);
                            
                            //ESTO SE DEBE HACER DESPUES DE DETERMINAR QUE
                            // AMBAS REGIONES COMPARTIDAS FUERON UTILIZADAS


                            let findIt2 = lista_Obj_trilaterar[k].arrShare.indexOf(resultadoUbicacion.macRpi);
                            if(lista_Obj_trilaterar[k].share != null){
                                if(findIt2>=0){
                                    // console.log(findIt);
                                    // console.log(lista_Obj_trilaterar[findIt].statusShare);
                                    if(lista_Obj_trilaterar[findIt].statusShare===false){
    
                                        // console.log(lista_Obj_trilaterar[findIt]);
                                        // console.log(`%%%%%%%%%%%%%%%%%%%%%%%%`);
                                        // console.log(lista_Obj_trilaterar[k]);
                                        let resultUpdateDistance = await promesa_UpdateDistance(id_distancia);
                                        
                                    }
                                    // console.log(lista_Obj_trilaterar[k].arrShare[findIt2]);
    
    
    
                                }else{
                                    // console.log(`No tiene MATCH: ${resultadoUbicacion.macRpi}`);
                                    let resultUpdateDistance = await promesa_UpdateDistance(id_distancia);
    
                                }
                            }else{
                                let resultUpdateDistance = await promesa_UpdateDistance(id_distancia);

                            }
                            
                            
                            
                            datosPuntoXY= {
                                x1, x2, x3, y1, y2, y3, r1, r2, r3
                            }

                            // console.log(resultUpdateDistance);
                        }
                    }

                    
                    
                }//fin CICLO RASPI


                    // console.log(id_distancia);
                    // console.log(lista_Obj_trilaterar[k].rpi);
                    // for (let o = 0; o < id_distancia.length; o++) {
                    //     if()
                    //     if(lista_Obj_trilaterar[k].counter == 0 ){

                    //         let resultUpdateDistance = await promesa_UpdateDistance(id_distancia);
                    //     }
                    //     else{
                    //         lista_Obj_trilaterar[k].counter = lista_Obj_trilaterar[k].counter -1;
                    //         if(lista_Obj_trilaterar[k].counter == 0 ){
                    //             let resultUpdateDistance = await promesa_UpdateDistance(id_distancia);

                    //         }


                    //     }
                        
                    // }
                
                    let punto =trilateracion(r1, r2, r3, x2, y3);
                    // let punto2 =trilateracionMatriz(datosPuntoXY);
                    // let punto3 = trilateracionMatriz2(datosPuntoXY);
                    // console.log(resulttag[k]._id);
                    
                    let js={
                        r1,
                        r2,
                        r3,
                        x:x2,
                        y:y3,
                        punt_x: punto.punt_x,
                        punt_y: punto.punt_y
                    }

                    
                    jsoCanvas.push(js)



                    // console.log(`T_1: d1=${r1}, d2=${r2}, d3=${r3},`+`Error=${punto.error}`.red);
                    // console.log(`T_2: d1=${r1}, d2=${r2}, d3=${r3}, `+`Error=${punto2.error}`.red);
                    // console.log(`\n`);
                    if(punto.status == true){
                        
                        console.log(`${lista_Obj_trilaterar[k].region}`.yellow );
                        console.log(`${lista_Obj_trilaterar[k].tag[j]}`.green);
                        console.log(`Trilateracion_1:`);
                        console.log(punto);
                        
                    }
                    // console.log(`\n`);
                    // console.log(`Trilateracion_2:`);
                    // // // console.log(`\n`);
                    // console.log(punto2);
                    // console.log(`\n`);



                    // console.log(`Trilateracion_3:`);
                    // console.log(punto3);
                    // console.log(`\n`);
                    // if(punto.status === true){
                    //     // let resultUpdateDistance = await promesa_UpdateDistance(id_distancia);

                    //     // if(resultUpdateDistance.ok === true){
                    //         let guardarpuntoXY = await promesa_puntoXY(punto, resulttag[k]._id, resultRegion[i]._id);
                    //         console.log(guardarpuntoXY.ok);

                    //     // }else{console.log(`No se actualizo el estatus de las distancias `);}

                    // }else{console.log(`P(X,Y) fuera de la region no se puede guardar`);}
                


            }//FIN CICLO TAG
            if(lista_Obj_trilaterar[k].statusShare===true){
                lista_Obj_trilaterar[k].statusShare=false;               
            }
        }//FIN CICLO REGION



        // lista_Obj_trilaterar.forEach( async function(regiones, indice, array) {
        //     console.log(indice );
        //     regiones.tag.forEach(async tags =>{
        //         regiones.rpi.forEach( async rpis =>{
        //             let resultDistancia = await promise_findDistancia(rpis, tags).then(data=>{
        //                 // console.log(data);
        //                 if(data[0] === undefined){
        //                     // console.log(`Vacio`);
        //                     // console.log(`rpi=${rpis} ===== tag=${tags}`);
                            
        //                     let findIt = regiones.tag.indexOf(tags);
        //                     if(findIt>=0){
        //                         lista_Obj_trilaterar[indice].tag= lista_Obj_trilaterar[indice].tag.splice(findIt,1)
                            
        //                     }

        //                 }else{
        //                     // console.log(data);
        //                 }
        //             }, er=>{
        //                 console.log(er);
        //             });
        //             console.log(lista_Obj_trilaterar);




        //         })
        //     })
            
        // })
        
        // console.log(`-----------------------------\n`);

        // console.log(lista_Obj_trilaterar);

    console.log(`======================FINALIZA TRILATERACION=========================`.rainbow);   
        return true;
    }catch(e){
        console.log("hola SOY UN HERRROR");
        console.log(e)
        return false;
    }



}
    
module.exports = {
    validacion_Trilateracion
}



