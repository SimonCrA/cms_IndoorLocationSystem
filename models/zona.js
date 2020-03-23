var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var zonaSchema = new Schema({
    
<<<<<<< HEAD

    idLocation:{ type: Schema.Types.ObjectId, ref: 'Client' },

    building: {type: String},
    floorName: {type: String  },      
    floorNumber: {type: Number },       
    
    //regiones
    floorId:{ type: Schema.Types.ObjectId, ref: 'zona'},
    regionName: {type: String},
    regionNumber:{type:Number},

    
    arrivalZone:{type:Boolean},//INDICA QUE LA REGION CREADA ES A DONDE SE DEBE DE LLEGAR EL ACTIVO [PARA LA PRESENTACION!]
                        //Solamente la debe de tener una region por LOCATION!
    
    
    
    
=======
    
    //regiones
    idPiso:{ type: Schema.Types.ObjectId, ref: 'zona'},
    nombreRegion: {type: String},
    numeroRegion:{type:Number},
    arrivalZone:{type:Boolean}, //INDICA QUE LA REGION CREADA ES A DONDE SE DEBE DE LLEGAR EL ACTIVO [PARA LA PRESENTACION!]
                                //Solamente la debe de tener una region por LOCATION!
>>>>>>> 5a1bb67d9048302f4fcdb98b2600e07e8b83ac64
    bottomLeft:{type:Array, required:false},//[0] = x || [1]
    bottomRigth:{type:Array, required:false},
    topLeft:{type:Array,  required:false},
    topRight:{type:Array, required:false},
    
    

    //piso
<<<<<<< HEAD
    plane:{type:String},
    type:{type:String},
    status: {type:Boolean},
    height: {type:Number},
    width: {type:Number},


=======
    idLocation:{ type: Schema.Types.ObjectId, ref: 'Client' },
    plano:{type:String},
    tipo:{type:String},
    estatus: {type:Boolean},
    alto: {type:Number},
    ancho: {type:Number},
    nombrePiso: {type: String  },      
    numeroPiso: {type: Number },  
>>>>>>> 5a1bb67d9048302f4fcdb98b2600e07e8b83ac64
    heightPixel: {type:Number},
    widthPixel: {type:Number},
    scale:{type:Number}


	}
);  

//Export model
module.exports = mongoose.model('zona', zonaSchema);



