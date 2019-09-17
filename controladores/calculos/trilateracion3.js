const matrix = require('matrix-js');


let trilateracionMatriz2 = (data) =>{


    // var A = (-2 * data.x1 + 2 * data.x2);
    var A = (Math.pow(data.r1, 2) - Math.pow(data.r2, 2) - Math.pow(data.x1, 2) + Math.pow(data.x2, 2) - Math.pow(data.y1, 2) + Math.pow(data.y2, 2));
    var B = (-2 * data.y1 + 2 * data.y2);
    var C = (Math.pow(data.r1, 2) - Math.pow(data.r3, 2) - Math.pow(data.x1, 2) + Math.pow(data.x3, 2) - Math.pow(data.y1, 2) + Math.pow(data.y3, 2));
    var D = (-2 * data.y1 + 2 * data.y3);

    var AA = (-2 * data.x1 + 2 * data.x2);
    var BB = (-2 * data.y1 + 2 * data.y2);
    var CC = (-2 * data.x1 + 2 * data.x3);
    var DD = (-2 * data.y1 + 2 * data.y3);

    
    
    var E = (-2 * data.y1 + 2 * data.y2);
    var F = (Math.pow(data.r1, 2) - Math.pow(data.r2, 2) - Math.pow(data.x1, 2) + Math.pow(data.x2, 2) - Math.pow(data.y1, 2) + Math.pow(data.y2, 2));
    var G = (-2 * data.y1 + 2 * data.y3);
    var H = (Math.pow(data.r1, 2) - Math.pow(data.r3, 2) - Math.pow(data.x1, 2) + Math.pow(data.x3, 2) - Math.pow(data.y1, 2) + Math.pow(data.y3, 2));
    
    var EE = (-2 * data.x1 + 2 * data.x2);
    var FF = (-2 * data.y1 + 2 * data.y2);
    var GG = (-2 * data.x1 + 2 * data.x3);
    var HH = (-2 * data.y1 + 2 * data.y3);
    
    var a = [
        [A, B],
        [C, D]
    ];
    var b = [
        [AA, BB],
        [CC, DD]
    ]
    var c = [
        [E, F],
        [G, H]
    ];
    var d = [
        [EE, FF],
        [GG, HH]
    ]
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    
    var I = matrix(a);
    var J = matrix(b);
    var M = matrix(c);
    var N = matrix(d);
    
    
    var K = I.inv();
    var O = M.inv();
    var L = matrix(K);
    var P = matrix(O);
    // console.log(J());
    // console.log(H());
    
    var z = L.prod(J);
    var zz = P.prod(N);

    var Z = matrix(z);
    var ZZ = matrix(zz);
    
    
    // // console.log(z);
    // var error= 0;
    // error = Math.sqrt((Math.pow( 2.10- parseFloat(z[0][0]), 2)) + ((Math.pow(2.10 - parseFloat(z[1][0]), 2))))

    return {
        punto_x:Z.det(),
        punto_y:ZZ.det(), 
    };


}    

module.exports = { 
    trilateracionMatriz2
}