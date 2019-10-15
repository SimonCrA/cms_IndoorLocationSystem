
const  ConstsDistancia = require("../../models/constantesdistancia");
const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
const RawMuestras = require ('../../models/rawdatamuestras')
const TagInfo = require ('../../models/tagInfo')
const _ = require('underscore');



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



module.exports = {
    
    



    regiones,pisos,ubicacion
}





