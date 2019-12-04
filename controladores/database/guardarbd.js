
const  ConstsDistancia = require("../../models/constantesdistancia");
const  InfoUbicacionRpi = require("../../models/ubicacion");
const Region = require ('../../models/zona')
const RawMuestras = require ('../../models/rawdatamuestras')
const TagInfo = require ('../../models/tagInfo')
const Activo = require ('../../models/activo')


let dataTag =  (req, res, next) =>{  
              
    let tagInfo = new TagInfo({
        
        mactag: req.body.mactag,
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        estado:req.body.estado

    }); 

    tagInfo.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        };
    
        console.log("guarde Esto:\n" + tagInfo + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            tagInfo
        });

    });

};
    
/* *****************************************
*	Constantes
*	
/* *****************************************/

let constantes =  (req, res, next) =>{            
    let constantesDeBD = new ConstsDistancia({

        macRpi: req.body.macrpi,
        macTag: req.body.mactag,
        rssiProm: req.body.rssiprom,
        nPropagacion: req.body.n,
        desviacionEstandar: req.body.desvia,
        idRegion:req.body.idregion,
        test: req.body.tests
    });

    constantesDeBD.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        };
    
        console.log("guarde Esto:\n" + constantesDeBD + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            constantesDeBD
        });

    });

};

/* *****************************************
*	Ubicación
*	
/* *****************************************/


let ubicacion = (req, res, next)=>{
    

    let ubicacion = new InfoUbicacionRpi({

        macRpi: req.body.macrpi,
        axis: req.body.axis,
        xpos: req.body.xpos,
        ypos: req.body.ypos,
        idZona: req.body.idzona

    });

    ubicacion.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        };

        console.log("guarde Esto:\n" + ubicacion + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            ubicacion
        });

    });

}

/* *****************************************
*	Regiones
*	
/* *****************************************/


let regiones = (req, res, next) =>{

    let region = new Region({

        idPiso:req.body.idPiso  ,

        // nombrePiso:req.body.nombrePiso   ,
        // numeroPiso:parseInt(req.body.numeroPiso)   ,

        nombreRegion:req.body.nombreRegion   ,
        numeroRegion:parseInt(req.body.numeroRegion)   ,

        largo:parseFloat(req.body.largo)   ,
        ancho:parseFloat(req.body.ancho),
        estatus: true,
        tipo:'region'  

    });

    region.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        };

        console.log("guarde Esto:\n" + region + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            region
        });

    });


}

/* *****************************************
*	Pisos
*	
/* *****************************************/


let pisos = (req, res, next) =>{
    // console.log(req.body);

    let region = new Region({

        idLocation:req.body.idLocacion  ,

        nombrePiso:req.body.nombrePiso   ,
        numeroPiso:parseInt(req.body.numeroPiso)   ,

        plano:req.body.plano ,
        estatus: true,
        tipo:'piso'  

    });

    region.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        };

        console.log("guarde Esto:\n" + region + "\n");
        // Successful - redirect to new author record.	
        res.status(202).jsonp({
            ok: true,
            region
        });

    });


}

/* *****************************************
*	Activo
*	
/* *****************************************/


let activoPost = (req, res, next) =>{
    // console.log(req.body);

    let activo = new Activo({

        nombre: req.body.nombre,
        VIN: parseInt(req.body.VIN),
        anio: parseInt(req.body.anio),
        modelo: req.body.modelo,
        color: req.body.color,
        estado: req.body.estado,
        idTag: req.body.idTag,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion

    });

    activo.save((err, activoCreado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.status(200).json({
            ok: true,
            activoCreado
        });

    });

}

/* *****************************************
*	caracterización
*	
/* *****************************************/


let rawCaracterizacion = (data) => {

    // console.log(req.body);
    let rawMuestras ;
    for (let i = 0; i < data.length; i++) {
        
        rawMuestras = new RawMuestras({
    
            macRpi:data[i].macrpi,
            macTag:data[i].mactag,  
            rssi:parseInt(data[i].rssi),
            distancia:parseInt(data[i].distancia)
            
        });
    
        rawMuestras.save(function (err) {
            if (err) {
                console.log(err);
                // return next(err);
            };
            // console.log(`Saved: ${JSON.stringify(rawMuestras, null, 2)}`);
            // Successful - redirect to new author record.	
        });
        
    }
    console.log(`Se guardaron (${data.length})`);
    // res.status(202).jsonp({
    //     ok: true,
    //     rawMuestras
    // });
}
module.exports = {
    constantes,
    dataTag,
    ubicacion,
    regiones,
    rawCaracterizacion,
    pisos,
    activoPost
}





