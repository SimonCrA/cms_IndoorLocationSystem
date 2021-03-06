var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var zonaSchema = new Schema({
    


    building: {type: String},
    
    
    //regiones
    floorId:{ type: Schema.Types.ObjectId, ref: 'zona'},
    regionName: {type: String},
    regionNumber:{type:Number},
    arrivalZone:{type:Boolean},//INDICA QUE LA REGION CREADA ES A DONDE SE DEBE DE LLEGAR EL ACTIVO [PARA LA PRESENTACION!]
                        //Solamente la debe de tener una region por LOCATION!
    bottomLeft:{type:Array, required:false},//[0] = x || [1]
    bottomRight:{type:Array, required:false},
    topLeft:{type:Array,  required:false},
    topRight:{type:Array, required:false},
    
    

    //piso
    idLocation:{ type: Schema.Types.ObjectId, ref: 'Client' },
    plane:{type:String},
    type:{type:String},
    status: {type:Boolean},
    height: {type:Number},
    width: {type:Number},
    floorName: {type: String  },      
    floorNumber: {type: Number },   
    heightPixel: {type:Number},
    widthPixel: {type:Number},
    scale:{type:Number}


	}
);  

//Export model
module.exports = mongoose.model('zona', zonaSchema);



