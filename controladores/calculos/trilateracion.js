//==========================================================================
//==========================================================================
// var c1c2 = new Array();
// var c1c3 = new Array();
// var c2c3 = new Array();
// var ret = new Array()

let getCrosC1C2 =(r1, r2, x2) =>{

    let x = 0.0;
    let ya = 0.0;
    let yb = 0.0;

    //x=(Math.pow(x2,2) - Math.pow(r1,2) +Math.pow(r2,2) ) / (2*x2);

    x = (Math.pow(x2, 2) - Math.pow(r2, 2) + Math.pow(r1, 2)) / (2 * x2);

    ya = Math.sqrt(Math.pow(r1, 2) - Math.pow(x, 2));
    yb = -Math.sqrt(Math.pow(r1, 2) - Math.pow(x, 2));


    // let v=[x,ya,x,yb];
    let poitn_x_y = [x.toFixed(2), ya.toFixed(2)];

    return poitn_x_y;
}

let getCrosC1C3 = (r1, r3, y2) => {

    let y = 0.0;
    let xa = 0.0;
    let xb = 0.0;

    //y=(Math.pow(y2,2) - Math.pow(r1,2) +Math.pow(r3,2) ) / (2*y2);

    y = (Math.pow(y2, 2) + Math.pow(r1, 2) - Math.pow(r3, 2)) / (2 * y2);

    xa = Math.sqrt(Math.pow(r1, 2) - Math.pow(y, 2));
    xb = -Math.sqrt(Math.pow(r1, 2) - Math.pow(y, 2));



    // let v=[xa,y,xb,y];
    let poitn_x_y = [xa.toFixed(2), y.toFixed(2)];

    return poitn_x_y;
}



let getCrosC2C3 = (r2, r3, y2, x1) =>{

    let ya = 0.0;    let yb = 0.0;    let yc = 0.0;    let yd = 0.0;
    let xa = 0.0;    let xb = 0.0;    let a = 0;    let b = 0;
    let c = 0;    let z = 0;

    //z=(-Math.pow(x1, 2) + Math.pow(r2, 2) +Math.pow(y2, 2)-Math.pow(r3,2));

    z = (Math.pow(y2, 2) - Math.pow(x1, 2) + Math.pow(r2, 2) - Math.pow(r3, 2)) / (2 * y2);

    a = 1 + ((Math.pow(x1, 2)) / (Math.pow(y2, 2)));



    //b=-2*x1 + ((x1*z)/(Math.pow(y2, 2)));

    b = (-2 * x1) + (2 * x1 * z) / (y2);
    //c=(Math.pow(z,2)/(4*(Math.pow(y2,2))))-(Math.pow(r2,2));

    c = (Math.pow(z, 2)) - (Math.pow(r2, 2)) + (Math.pow(x1, 2));
    //////console.log('Z= '+z+' A= '+a+' B= '+b+' C= '+c);
    xa = (-b + (Math.sqrt(Math.pow(b, 2) - 4 * a * c))) / (2 * a);
    xb = (-b - (Math.sqrt(Math.pow(b, 2) - 4 * a * c))) / (2 * a);

    // ya=(2*xa * x1 + z)/(2*y2);
    // yb=(2*xb * x1 + z)/(2*y2);
    // yc=((2*xa * x1 + z)/(2*y2))*-1;
    // yd=((2*xb * x1 + z)/(2*y2))*-1;


    ya = Math.sqrt(Math.pow(r2, 2) - (Math.pow((xa - x1), 2)));
    yb = -Math.sqrt(Math.pow(r2, 2) - (Math.pow((xa - x1), 2)));
    yc = Math.sqrt(Math.pow(r2, 2) - (Math.pow((xb - x1), 2)));
    yd = -Math.sqrt(Math.pow(r2, 2) - (Math.pow((xb - x1), 2)));



    // let v=[xa,ya,    xa,yb   , xb,yc   ,xb, yd];
    let poitn_x_y = [xb, yc, xa, ya];

    return poitn_x_y;
}



let  equa = (x1, y1, x2, y2, r3, y0) => {

    let ecua = 0
    let x = Array()
    let y = Array()
    let reton = Array()
    x.push(x1)
    x.push(x2)
    y.push(y1)
    y.push(y2)
    let r = Math.pow(r3, 2).toFixed(2)


    ecua = Math.pow(x1, 2) + Math.pow((y1 - y0), 2)
    ecua2 = Math.pow(x2, 2) + Math.pow((y2 - y0), 2)

    //console.log(ecua.toFixed(2)+' ==  '+(r)+'\n')
    //console.log(ecua2.toFixed(2)+' ==  '+(r)+'\n')

    if ((ecua.toFixed(2)) == (r)) {
        //console.log('hey')
        reton.push(x1)
        reton.push(y1)

    }
    if ((ecua2.toFixed(2)) == (r)) {
        //console.log('hey')
        reton.push(x2)
        reton.push(y2)

    }

    return reton

}

var punto_X_Y = new Array()

let trilateracion = (r1, r2, r3, x, y) =>{
    // console.log('Hola soy trilateracion');
    let x1 = x;
    let y2 = y;
    let xx1 = 0;
    let yy1 = 0;
    let xx2 = 0;
    let yy2 = 0;
    let d1 = 0
    let d2 = 0
    let di = false
    let C1C2 = 0
    let C1C3 = 0
    let C2C3 = 0
    
    let c1c2 = getCrosC1C2(r1, r2, x1); //Esta funcion me da 3 valores
    let c1c3 = getCrosC1C3(r1, r3, y2); //Esta funcion me da 3 valores
    let c2c3 = getCrosC2C3(r2, r3, y2, x1); //Esta funcion me da 8 valores

    C1C2 = parseFloat(c1c2[0] * c1c2[1])
    C1C3 = parseFloat(c1c3[0] * c1c3[1])
    C2C3 = parseFloat(c2c3[0] * c2c3[1] * c2c3[2] * c2c3[3])
    //console.log('EVALUACIONES')
    //console.log(isNaN(C1C2), isNaN(C1C3), isNaN(C2C3))
    punto_X_Y[0] = (-10000)
    punto_X_Y[1] = (-10000)
    punto_X_Y[2] = (-10000)
    punto_X_Y[3] = (-10000)
    punto_X_Y[4] = (-10000)
    punto_X_Y[5] = (-10000)
    punto_X_Y[6] = (-10000)
    punto_X_Y[7] = (-10000)

    //=================================================================
    //=============TODAS LAS CIRCUNFERENCIAS SE INTERSECTAN============
    //=================================================================
    if (!isNaN(C1C2) && !isNaN(C1C3) && !isNaN(C2C3)) { //1
        // //console.log('******************************')
        // //console.log('return'+equa(c2c3[2],c2c3[3],c2c3[0],c2c3[1],r3, y2))
        // //console.log('******************************')
        ret = equa(c2c3[2], c2c3[3], c2c3[0], c2c3[1], r3, y2)

        // //console.log('d1: '+d1+'__d2: '+d2)
        di = d1 < d2
        //console.log(di)
        if (ret.length == 2) {
            xx1 = (parseFloat(c1c2[0]) + parseFloat(c1c3[0]) + parseFloat(ret[0])) / 3;
            yy1 = (parseFloat(c1c2[1]) + parseFloat(c1c3[1]) + parseFloat(ret[1])) / 3;
            punto_X_Y[0] = (xx1)
            punto_X_Y[1] = (yy1)
        }
        if (ret.length == 4) {
            xx1 = (parseFloat(c1c2[0]) + parseFloat(c1c3[0]) + parseFloat(ret[0])) / 3;
            yy1 = (parseFloat(c1c2[1]) + parseFloat(c1c3[1]) + parseFloat(ret[1])) / 3;
            xx2 = (parseFloat(c1c2[0]) + parseFloat(c1c3[0]) + parseFloat(ret[2])) / 3;
            yy2 = (parseFloat(c1c2[1]) + parseFloat(c1c3[1]) + parseFloat(ret[3])) / 3;


            d1 = Math.sqrt(Math.pow((parseFloat(xx1) - parseFloat(ret[0])), 2) + Math.pow((parseFloat(yy1) - parseFloat(ret[1])), 2))
            d2 = Math.sqrt(Math.pow((parseFloat(xx2) - parseFloat(ret[2])), 2) + Math.pow((parseFloat(yy2) - parseFloat(ret[3])), 2))
            if (d1 < d2) {
                punto_X_Y[0] = (xx1)
                punto_X_Y[1] = (yy1)

            } else {
                punto_X_Y[0] = (xx2)
                punto_X_Y[1] = (yy2)
            }


        }
        if (ret.length == 0) {
            punto_X_Y[0] = (0)
            punto_X_Y[1] = (0)
            punto_X_Y[2] = (0)
            punto_X_Y[3] = (0)
        }



    }

    //=================================================================
    //=============SOLO SE INTERSECTA C1C3 && C1C2=====================
    //=================================================================
    if (!isNaN(C1C2) && !isNaN(C1C3) && isNaN(C2C3)) { //2

        //console.log('(2).-SOLO SE INTERSECTA C1C3 && C1C2')
        xx1 = (parseFloat(c1c2[0]) + parseFloat(c1c3[0])) / 2
        yy1 = (parseFloat(c1c2[1]) + parseFloat(c1c3[1])) / 2

        //console.log(xx1, yy1)

        punto_X_Y[0] = (xx1)
        punto_X_Y[1] = (yy1)


    }

    //=================================================================
    //============SOLO SE INTERSECTA C1C2 && C2C3======================
    //=================================================================
    if (!isNaN(C1C2) && !isNaN(C2C3) && isNaN(C1C3)) { //3

        //console.log('(3).-SOLO SE INTERSECTA C1C2 && C2C3')

        xx1 = ((parseFloat(c2c3[0]) - parseFloat(c1c2[0])) / 2) + parseFloat(c1c2[0])
        yy1 = ((parseFloat(c2c3[1]) - parseFloat(c1c2[1])) / 2) + parseFloat(c1c2[1])
        // xx1= ((parseFloat(c2c3[0])+parseFloat(c1c2[0]) )/ 2)
        // yy1= ((parseFloat(c2c3[1])+parseFloat(c1c2[1]) )/ 2)

        //console.log(xx1, yy1)

        punto_X_Y[0] = (xx1)
        punto_X_Y[1] = (yy1)
    }

    //=================================================================
    //==================SOLO SE INTERSECTA C1C2========================
    //=================================================================
    if (!(isNaN(C1C2)) && isNaN(C1C3) && isNaN(C2C3)) { //4

        //console.log('(4).-SOLO SE INTERSECTA C1C2')

        xx2 = parseFloat(c1c2[0]);
        yy2 = parseFloat(c1c2[1]);

        punto_X_Y[0] = (xx2)
        punto_X_Y[1] = (yy2)
    }

    //=================================================================
    //==============SOLO SE INTERSECTA C2C3 && C1C3====================
    //=================================================================
    if (!isNaN(C2C3) && !isNaN(C1C3) && isNaN(C1C2)) { //5

        //console.log('(5).-SOLO SE INTERSECTA C2C3 && C1C3')

        xx1 = ((parseFloat(c2c3[0]) - parseFloat(c1c3[0])) / 2) + parseFloat(c1c3[0])
        yy1 = ((parseFloat(c2c3[1]) - parseFloat(c1c3[1])) / 2) + parseFloat(c1c3[1])
        // xx1= ((parseFloat(c2c3[0])+parseFloat(c1c2[0]) )/ 2)
        // yy1= ((parseFloat(c2c3[1])+parseFloat(c1c2[1]) )/ 2)

        //console.log(xx1, yy1)

        punto_X_Y[0] = (xx1)
        punto_X_Y[1] = (yy1)





    }
    //=================================================================
    //==================SOLO SE INTERSECTA C1C3========================
    //=================================================================
    if (!(isNaN(C1C3)) && isNaN(C1C2) && isNaN(C2C3)) { //6
        //console.log('(6).-SOLO SE INTERSECTA C1C3')

        xx2 = parseFloat(c1c3[0]);
        yy2 = parseFloat(c1c3[1]);

        punto_X_Y[0] = (xx2)
        punto_X_Y[1] = (yy2)

    }
    //=================================================================
    //==================SOLO SE INTERSECTA C2C3========================
    //=================================================================
    if (!(isNaN(C2C3)) && isNaN(C1C3) && isNaN(C1C2)) { //7
        //console.log('(7).-SOLO SE INTERSECTA C2C3')
        xx2 = parseFloat(c2c3[0]);
        yy2 = parseFloat(c2c3[1]);

        punto_X_Y[0] = (xx2)
        punto_X_Y[1] = (yy2)

    }




    //=================================================================
    //==================NO SE INTERSECTAN NINGUNA======================
    //=================================================================
    if ((isNaN(C1C2) && isNaN(C1C3) && isNaN(C2C3))) { //8


        //console.log('(8).-NO SE INTERSECTAN NINGUNA')

        let m = (parseFloat(0) - parseFloat(y2)) / (parseFloat(x1) - parseFloat(0))
        let a = (1 / Math.pow(m, 2)) + 1

        let b = (-2 * y2 / Math.pow(m, 2)) - (2 * y2)
        let c = (Math.pow(y2, 2) / Math.pow(m, 2)) + Math.pow(y2, 2) - Math.pow(r3, 2)
        //console.log(a,b,c)
        let U = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a) //Y

        let V = (U - y2) / (m) //X
        // let V=Math.sqrt( Math.pow(r3,2) -Math.pow((U-y2),2))//X
        //console.log('y-y2, 2')
        //console.log('ESTO ES U= '+U)
        //console.log(y2)
        //console.log( Math.pow(r3,2))
        //console.log(Math.pow((U-y2),2))




        let aa = 1 + Math.pow(m, 2)
        let bb = -2 * x1 + 2 * m * y2
        let cc = Math.pow(x1, 2) + Math.pow(y2, 2) - Math.pow(r2, 2)
        let UU = (-bb - Math.sqrt(Math.pow(bb, 2) - 4 * aa * cc)) / (2 * aa) //X

        let VV = Math.sqrt(Math.pow(r2, 2) - Math.pow((UU - x1), 2)) //Y

        let m2 = ((U + VV) / 2) / ((V + UU) / 2)
        let UUU = Math.sqrt((Math.pow(r1, 2)) / (1 + Math.pow(m2, 2))) //x
        let VVV = Math.sqrt(Math.pow(r1, 2) - ((Math.pow(r1, 2)) / (1 + Math.pow(m2, 2)))) //y

        xx1 = (V + UU + UUU) / 3
        yy1 = (U + VV + VVV) / 3




        // punto_X_Y[0]=(V)
        // punto_X_Y[1]=(U)


        // punto_X_Y[2]=(UU)
        // punto_X_Y[3]=(VV)
        // punto_X_Y[4]=(UUU)
        // punto_X_Y[5]=(VVV)
        punto_X_Y[0] = (xx1)
        punto_X_Y[1] = (yy1)

        // //console.log(punto_X_Y)


    }




    //QUIEN ES X , Y?????
    //console.log(x,y)
    var error = 0;
    if (punto_X_Y[0] > 0 && punto_X_Y[1] > 0) {
        // console.log(`Estoy dentro de la region`);
        error = Math.sqrt((Math.pow(2.0 - parseFloat(punto_X_Y[0]), 2)) + ((Math.pow(4.0 - parseFloat(punto_X_Y[1]), 2))))
        return {
            punt_x: (punto_X_Y[0]).toFixed(3),
            punt_y: (punto_X_Y[1]).toFixed(3),
            // error:(error).toFixed(3),
            status:true
        };


    }
    else if (punto_X_Y[0] > x1 || punto_X_Y[1] > y2) {
        // console.log(`Estoy fuera de la region positivo`);

        return {
            punt_x: (punto_X_Y[0]).toFixed(3),
            punt_y: (punto_X_Y[1]).toFixed(3),
            // error:(error).toFixed(3),
            status: false
        };

    }
    else if (punto_X_Y[0] < 0 || punto_X_Y[1] < 0) {
        // console.log(`Estoy fuera de la region negativo`);

        return {
            punt_x: (punto_X_Y[0]).toFixed(3),
            punt_y: (punto_X_Y[1]).toFixed(3),
            // error:(error).toFixed(3),
            status: false
        };
    }
    else{
        // console.log(`no soy ninguna condicion ${punto_X_Y[0]}`);
    return {
        punt_x: (punto_X_Y[0]).toFixed(3),
        punt_y: (punto_X_Y[1]).toFixed(3),
        // error:(error).toFixed(3),
        status: false
    };

    }
   
}


module.exports = {
    trilateracion,
    getCrosC1C2,
    getCrosC1C3

}