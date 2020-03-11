const matrix = require('matrix-js');


let trilateracionMatriz = (data) =>{


    var A = (-2 * data.x1 + 2 * data.x2);
    var B = (-2 * data.y1 + 2 * data.y2);
    var C = (Math.pow(data.r1, 2) - Math.pow(data.r2, 2) - Math.pow(data.x1, 2) + Math.pow(data.x2, 2) - Math.pow(data.y1, 2) + Math.pow(data.y2, 2));
    
    var D = (-2 * data.x2 + 2 * data.x3);
    var E = (-2 * data.y2 + 2 * data.y3);
    
    var F = (Math.pow(data.r2, 2) - Math.pow(data.r3, 2) - Math.pow(data.x2, 2) + Math.pow(data.x3, 2) - Math.pow(data.y2, 2) + Math.pow(data.y3, 2));
    
    
    var a = [
        [A, B],
        [D, E]
    ];
    var b = [
        [C], 
        [F]
    ]
    // console.log(a);
    // console.log(b);
    
    var G = matrix(a);
    var H = matrix(b);
    
    
    var I = G.inv();
    var J = matrix(I);
    // console.log(J());
    // console.log(H());
    
    var z = J.prod(H);
    
    
    // console.log(z);
    var error= 0;
    error = Math.sqrt((Math.pow( 2.10- parseFloat(z[0][0]), 2)) + ((Math.pow(2.10 - parseFloat(z[1][0]), 2))))

    return {
        punt_x:(z[0][0]).toFixed(2),
        punt_y:(z[1][0]).toFixed(2), 
        error:(error).toFixed(2),
        status:true
    };


}    



// console.log(trilateracion(data));

module.exports = {
    trilateracionMatriz
}


