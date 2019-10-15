var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var zonaSchema = new Schema({
    


    idLocation:{type:String, required: true},

    edificio: {type: String},

    nombrePiso: {type: String , required: true},      

    numeroPiso: {type: Number , required: true},        
    
    //regiones
    nombreRegion: {type: String},
    numeroRegion:{type:Number},
    largo:{type:Number},
    ancho:{type:Number},

    //piso
    plano:{type:String},
    tipo:{type:String},
    estatus: {type:Boolean}


	}
);  

//Export model
module.exports = mongoose.model('zona', zonaSchema);



