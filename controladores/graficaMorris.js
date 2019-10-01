var {globalDataGraph} = require('./variables');

var llamadasALaFuncion = 0;


let recibirDataFiltrada = (data) => {

  llamadasALaFuncion = llamadasALaFuncion + 1;
  

  for (let i = 0; i < llamadasALaFuncion; i++) {

    globalDataGraph.push(data);

  }
  
  return globalDataGraph;
};

module.exports ={
    recibirDataFiltrada
}