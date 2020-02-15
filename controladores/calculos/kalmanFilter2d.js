const matrix = require('matrix-js');




let dataToKalman2D = async (arrayFromValidation)=>{
    var f = [
        [1, 1],
        [0, 1],
    
    
    ]
    
    var p = [
        [10, 0],
        [0, 10],
    
    ]
    var xx = [
        [1],
        [1]
    ]
    
    var pp = [
        [1, 1],
        [1, 1]
    ]
    
    var q = [
        [0.0001, 0.0001],
        [0.0001, 0.0001]
    ]
    
    var h = [
        [1, 0],
        [0, 1]
    ]
    
    var r = [
        [5, 0],
        [0, 5],
    
    ]
    
    var z = [
        [2],
        [1]
    ]
    
    var Xk_1 = 
    [
        [2],
        [1],
    
    ]
    
    
    // var X = matrix(x);
    var F = matrix(f);
    var P_Before = matrix(p);
    var X_mirror = matrix(xx);
    var P_mirror = matrix(pp);
    var Qk = matrix(q);
    var H = matrix(h);
    var ht = H.trans();
    var HT = matrix(ht);
    var ft = F.trans();
    var FT = matrix(ft);
    var R = matrix(r);
    var Z = matrix(z);
    var X_Before = matrix(Xk_1);
    
    
    var arr = []
    let res;
    
    for (let i = 0; i < arrayFromValidation.length; i++) {
        z = [
            [arrayFromValidation[i].x],
            [arrayFromValidation[i].y]
        ]
    
        Z = matrix(z);
    
        console.log(`this is i ${i}`);
        if (i === 0) {
            console.log("soy 0");
            res = await doKalmanfilter(X_Before, P_Before, Z);
            console.log(res.X_Before());
    
        } else {
            console.log(`soy ${i}`);
            res = doKalmanfilter(res.X_Before, res.P_Before, Z);
            console.log(res.X_Before());
    
    
        }
    
    
    }
    return {xpos:res.x_before[0][0], ypos: res.x_before[1][0]}

}

let doKalmanfilter = (x_before, p_before, X_Y) => {
    return new Promise((resolve, reject)=>{


        console.log(`X_Y`);
        console.log(X_Y());
        Xk_predictiva = F.prod(x_before);
        var Xk_Predictiva = matrix(Xk_predictiva);
        console.log(Xk_Predictiva());
    
        var PxFT = p_before.prod(FT);
        var PXFT = matrix(PxFT);
        var fxft = PXFT.prod(F);
        var FXFT = matrix(fxft);
        Pk_predictiva = Qk.add(FXFT);
        var Pk_Predictiva = matrix(Pk_predictiva);
        // console.log(Pk_Predictiva());
    
    
    
        var pxht = Pk_Predictiva.prod(HT);
        var PHT = matrix(pxht);
        var hxpxht = PHT.prod(H);
        var HPHT = matrix(hxpxht);
        var addR = HPHT.add(R)
        var HPHTADDR = matrix(addR);
        var inv = HPHTADDR.inv();
        var INV = matrix(inv);
        var pht = Pk_Predictiva.prod(HT);
        var PHT = matrix(pht);
        var k = INV.prod(PHT);
        var K = matrix(k);
        // console.log(K());
    
    
    
    
        var hp = H.prod(Xk_Predictiva);
        var HXP = matrix(hp);
        var pointsubhp = X_Y.sub(HXP);
        var XYSUBHP = matrix(pointsubhp);
        var kxysubhp = K.prod(XYSUBHP);
        var KXYSUBHP = matrix(kxysubhp);
        var xaddkzsubhp = Xk_Predictiva.add(KXYSUBHP);
        var X_actual = matrix(xaddkzsubhp);
        // console.log(X_actual());
    
    
    
    
        var hkpk = H.prod(Pk_Predictiva);
        var HKPK = matrix(hkpk);
        var khp = K.prod(HKPK);
        var KHP = matrix(khp);
        var psubkhp = Pk_Predictiva.sub(KHP);
        var P_actual = matrix(psubkhp);
        // console.log(P_actual());
    
    
    
        var X_Bef = X_actual.mul(X_mirror);
        var X_Before = matrix(X_Bef);
        // console.log(X_Before());
        var P_bef = P_actual.mul(P_mirror);
        var P_Before = matrix(P_bef)
        // console.log(P_Before());
    
    
    
    
        return resolve({
            X_Before,
            P_Before
        })
    })



}






module.exports = {
    dataToKalman2D
}