var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var zonaSchema = new Schema({
    

    idLocation:{ type: Schema.Types.ObjectId, ref: 'Client' },

    edificio: {type: String},
    nombrePiso: {type: String  },      
    numeroPiso: {type: Number },  
    plano:{type:String},      
    
    //regiones
    idPiso:{ type: Schema.Types.ObjectId, ref: 'zona'},
    nombreRegion: {type: String},
    numeroRegion:{type:Number},

    
    COSA:{type:Boolean},//INDICA QUE LA REGION CREADA ES A DONDE SE DEBE DE LLEGAR EL ACTIVO [PARA LA PRESENTACION!]
                        //Solamente la debe de tener una region por LOCATION!
    
    
    
    
    bottomLeft:{type:Array},//[0] = x || [1]
    bottomRigth:{type:Array},
    topLeft:{type:Array},
    topRight:{type:Array},

    //piso
    plano:{type:String},
    tipo:{type:String},
    estatus: {type:Boolean},
    alto: {type:Number},
    ancho: {type:Number},


	}
);  

//Export model
module.exports = mongoose.model('zona', zonaSchema);



