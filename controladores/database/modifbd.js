
// const  ConstsDistancia = require("../../models/constantesdistancia");
const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
const RawMuestras = require ('../../models/rawdatamuestras')
const TagInfo = require ('../../models/tagInfo')
const ConstsDistancia = require('../../models/constantesdistancia');



const _ = require('underscore');

let {paramsValidacionCaract, globalDataGraphDos} = require('../variables')


let regiones = (req, res, next) => {
    
    console.log(req.params);

    
    let id = req.params.id;

    let body = _.pick(req.body,['idLocation','nombrePiso','numeroPiso','nombreRegion','numeroRegion','largo','ancho']) ;

    
    Region.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, regiondb)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            Region: regiondb
        })

    })

}


let pisos = (req, res, next) => {
    


    let id = req.params.id;

    let body = _.pick(req.body,['idLocation','nombrePiso','numeroPiso','plano']) ;

    
    Region.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, regiondb)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            Region: regiondb
        })

    })

}




let ubicacion = (req, res, next) => {

    

    let id = req.params.id;

    let body = _.pick(req.body,['macRpi','axis','xpos','ypos']) ;

    
    InfoUbicacionRpi.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, ubicacion)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
             ubicacion
        })

    })


}

let ubicacionSelect = async(req, res, next) => {

try{

    globalDataGraphDos.length = 0


    console.log(req.body);

    let getConstantes = () =>{
        return new Promise((resolve, reject)=>{
            ConstsDistancia.find({macRpi:req.body.macrpi, macTag:req.body.mactag, tipo:'generado'}).sort({_id:-1})
            .exec(function (err, data){
                err 
                ? reject(err) 
                : resolve(data[0])
            });

        });
    }

    let promesa_id_Const = () =>{
        return new Promise((resolve, reject) => {

            ConstsDistancia.aggregate([{
            $match: {
                tipo: 'seleccionado'
            }
        },
        {
            "$group": {
                _id:"$_id",
                count: {
                    $sum: 1
                }
            }
        }])
        .exec( (err, agregate_id_Const) =>{
            err
                ?
                reject(err) :
                resolve(agregate_id_Const);
            });
    
        });
    }


    let result = await getConstantes();
    let result2 = await promesa_id_Const();
    console.log(result2);
    console.log(result);
    result.length
    // return res.status(200).json({ok:true,
    // result, result2})

    for (let i = 0; i < result2.length; i++) {
        
        let id = result2[i]._id;
    
        let body = _.pick(result,['rssiProm','nPropagacion','desviacionEstandar']) ;
        console.log(id);
        
        ConstsDistancia.findByIdAndUpdate(id, body, {new:true, runValidators:true },(err, ubicacionS)=>{
    
            if(err){
                
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            // console.log(ubicacionS);
    
        })
        
    }

	paramsValidacionCaract[0].mostrarGrafica = true

    return res.status(200).json({
        ok:true
    })

}catch(e){
    console.log(e);
}

}



module.exports = {
    
    



    regiones,pisos,ubicacion,ubicacionSelect
}





