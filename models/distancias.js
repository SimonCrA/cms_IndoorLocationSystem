var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var distanceTags = new Schema({

		macRpi: {type: String,  max: 100},
		macTag: {type: String,  max: 100},
		tagDistance: {type: Number },

		region: {type: String},
		
		date: {type: Date},
		status:{type: Boolean},
		setDist:{type:Number}
		

	},{
		timestamps: true
	}
);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

//Export model
module.exports = mongoose.model('Distancia', distanceTags);

























// /* *****************************************
// *	just a test
// *	    Happy Test
// /* *****************************************/




// distancia = [{
// 	macrpi: 'rasp1',
// 	mactag: 'tag1',
// 	distancia: 1.2,
// 	region:'salaBeto',
// 	date: '0001'

// },{
// 	macrpi: 'rasp2',
// 	mactag: 'tag1',
// 	distancia: 1.2,
// 	region:'salaBeto',
// 	date: '0001'

// },{
// 	macrpi: 'rasp3',
// 	mactag: 'tag1',
// 	distancia: 1.2,
// 	region:'salaBeto',
// 	date: '0001'

// },{
// 	macrpi: 'rasp1',
// 	mactag: 'tag1',
// 	distancia: 1.2,
// 	region:'salaBeto',
// 	date: '0001'

// },{
// 	macrpi: 'rasp2',
// 	mactag: 'tag1',
// 	distancia: 1.2,
// 	region:'salaBeto',
// 	date: '0001'

// },{
// 	macrpi: 'rasp3',
// 	mactag: 'tag1',
// 	distancia: 1.2,
// 	region:'salaBeto',
// 	date: '0001'
// },{
// 	macrpi: 'rasp4',
// 	mactag: 'tag2',
// 	distancia: 1.2,
// 	region:'oficinaSimon',
// 	date: '0001'

// },{
// 	macrpi: 'rasp5',
// 	mactag: 'tag2',
// 	distancia: 1.2,
// 	region:'oficinaSimon',
// 	date: '0001'

// },{
// 	macrpi: 'rasp6',
// 	mactag: 'tag2',
// 	distancia: 1.2,
// 	region:'oficinaSimon',
// 	date: '0001'

// }]
// //primera busqueda
// agregate_1 = [{
// 	_id:'salabeto',
// 	 count:6
// 	},
// {
// 	_id:'oficinaSimon', 
// 	count :3
// }]
// for (let i = 0; i < agregate_1.length; i++) {
// 	agregate_2 =[{
// 		_id:'rasp1',
// 		count: 2
// 	},{
// 		_id:'rasp2',
// 		count: 2
// 	},{
// 		_id:'rasp3',
// 		count: 2
// 	}]
// 	agregate_3 = [{
// 		_id:'tag1',
// 		count: 6
// 	}]

// 	for (let i = 0; i < agregate_3.length; i++) {// se ejecuta segun la cantidad de tag que existen
// 		for (let j = 0; j < agregate_2.length; j++) {// se ejecuta segun la cantidad 
			
// 			//busqueda poor tag y rasp
// 			resultado = agregate_1.find()
			
// 		}

// 		trilareracion(d1,d2,d3, x, y)
		
// 	}

	
// }

// //SEGUNDA BUSQUEDA DENTRO DEL PRIMER AGREGATE

// find_2 = [{
// 	macrpi: 'rasp4',
// 	mactag: 'tag1',
// 	distancia: 1.2,
// 	region:'oficinaSimon',
// 	date: '0001'

// },{
// 	macrpi: 'rasp5',
// 	mactag: 'tag1',
// 	distancia: 1.2,
// 	region:'oficinaSimon',
// 	date: '0001'

// },{
// 	macrpi: 'rasp6',
// 	mactag: 'tag1',
// 	distancia: 1.2,
// 	region:'oficinaSimon',
// 	date: '0001'

// }]


// // segundo agregate dentro de la primera busqueda que esta dentro del primer agregate
// //RASPBERRY PI

// agregate_2 =[{
// 	_id:'rasp1',
// 	count: 2
// },{
// 	_id:'rasp2',
// 	count: 2
// },{
// 	_id:'rasp3',
// 	count: 2
// },{
// 	_id:'rasp4',
// 	count: 1
// },{
// 	_id:'rasp5',
// 	count: 1
// },{
// 	_id:'rasp6',
// 	count: 1
// }]

// // tercert agregate dentro del segundo agregate que esta dentro del primer find que esta dentro del primer agregate
// //TAGS
// agregate_3 = [{
// 	_id:'tag1',
// 	count: 6
// },{
// 	_id:'tag2',
// 	count: 3
// }]


